import {child, get, getDatabase, onValue, ref} from 'firebase/database';
import {useState, useEffect} from 'react';
import {Fire} from '../../../config';
import {getDataItem} from '../../../utils';

export const useMessage = () => {
  const [user, setUser] = useState({});
  const [historyChat, setHistoryChat] = useState([]);
  const [skeleton, setSkeleton] = useState(false);
  const db = getDatabase(Fire);
  const urlHistory = ref(db, `messages/${user.uid}/`);

  useEffect(() => {
    getDataUserFromLocal();
    onValue(urlHistory, async snap => {
      if (snap.val()) {
        const oldData = snap.val();
        const data = [];
        const promises = await Object.keys(oldData).map(async key => {
          setSkeleton(true);
          const urlUidDoctor = `doctors/${oldData[key].uidPartner}`;
          await get(child(ref(db), urlUidDoctor))
            .then(snapshot => {
              const detailDoctors = snapshot.val();
              if (snapshot.exists()) {
                data.push({
                  id: key,
                  ...oldData[key],
                  detailDoctor: detailDoctors,
                });
              }
            })
            .catch(err => err);
        });
        await new Promise.all(promises);
        setHistoryChat(data);
        setSkeleton(false);
      }
    });
  }, [user.uid]);

  const getDataUserFromLocal = () => {
    getDataItem('userProfile').then(res => {
      setUser(res);
    });
  };

  return {skeleton, historyChat};
};
