import {getDatabase, onValue, push, ref, set} from 'firebase/database';
import moment from 'moment';
import idLocal from 'moment/locale/id';
import {useEffect, useState} from 'react';
import {Fire} from '../../../config';
import {getChatTime, getDataItem} from '../../../utils';

export const useChatting = route => {
  const dataDoctor = route.params;
  const [chatContent, setChatContent] = useState('');
  const [user, setUser] = useState([]);
  const [chatData, setChatData] = useState([]);

  const db = getDatabase(Fire);
  const chatID = `${user.uid}_${dataDoctor.uid}`;

  useEffect(() => {
    getDataUserFromLocal();
    const urlFire = ref(db, `chatting/${chatID}/allChat/`);
    onValue(urlFire, snap => {
      if (snap.val()) {
        const dataSnap = snap.val();
        const allDataChat = [];
        Object.keys(dataSnap).map(keyDate => {
          const dataChat = dataSnap[keyDate];
          const newDataChat = [];
          Object.keys(dataChat).map(keyChat => {
            newDataChat.push({
              id: keyChat,
              data: dataChat[keyChat],
            });
          });
          allDataChat.push({
            id: keyDate,
            data: newDataChat,
          });
        });
        setChatData(allDataChat);
      }
    });
  }, [dataDoctor.uid, user.uid]);

  const getDataUserFromLocal = () => {
    getDataItem('userProfile').then(res => {
      setUser(res);
    });
  };

  const chatSend = () => {
    const today = new Date();
    const formatToday = moment(today).locale('id', idLocal).format('LL');

    const urlFire = `chatting/${chatID}/allChat/${formatToday}`;
    const urlMessageUser = `messages/${user.uid}/${chatID}`;
    const urlMessageDoctor = `messages/${dataDoctor.uid}/${chatID}`;
    const postListRef = ref(db, urlFire);

    const dataHistoryChatForUser = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: dataDoctor.uid,
    };
    const dataHistoryChatForDoctor = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: user.uid,
    };

    //DataChat
    const data = {
      sendBy: user.uid,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent: chatContent,
    };

    push(postListRef, data)
      .then(() => {
        setChatContent('');
        set(ref(db, urlMessageUser), dataHistoryChatForUser);
        set(ref(db, urlMessageDoctor), dataHistoryChatForDoctor);
      })
      .catch(err => {
        showMessageError(err.message);
      });
  };

  return {
    user,
    dataDoctor,
    chatData,
    chatContent,
    setChatContent,
    chatSend,
  };
};
