import {useState, useEffect, useCallback} from 'react';
import {
  child,
  equalTo,
  get,
  getDatabase,
  orderByChild,
  query,
  ref,
} from 'firebase/database';
import {Fire} from '../../../config';
import {ILNullPhoto} from '../../../assets';
import {getDataItem} from '../../../utils';

export const useDoctor = navigation => {
  const dbRef = ref(getDatabase(Fire));
  const [newsItem, setNewsItem] = useState([]);
  const [docterCategory, setDocterCategory] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [skeleton, setSkeleton] = useState(false);
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    photo: ILNullPhoto,
  });

  useEffect(() => {
    getCategoryDoctor();
    getNewsDoctor();
    getTopRatedDoctors();
    navigation.addListener('focus', () => {
      getUserData();
    });
  }, [navigation]);

  const getUserData = () => {
    getDataItem('userProfile').then(res => {
      const data = res;
      data.photo = res?.photo?.length > 1 ? {uri: res.photo} : ILNullPhoto;
      setProfile(res);
    });
  };

  const getCategoryDoctor = useCallback(async () => {
    setSkeleton(true);
    await get(child(dbRef, 'category_doctor/')).then(res => {
      if (res.exists) {
        const data = res.val();
        setDocterCategory(data);
        setSkeleton(false);
      }
    });
  }, []);

  const getNewsDoctor = useCallback(async () => {
    setSkeleton(true);
    await get(child(dbRef, 'news/')).then(res => {
      if (res.exists) {
        const data = res.val();
        setNewsItem(data);
        setSkeleton(false);
      }
    });
  }, []);

  const getTopRatedDoctors = useCallback(async () => {
    setSkeleton(true);
    const db = getDatabase(Fire);
    const que = query(
      ref(db, 'doctors/'),
      orderByChild('rate'),
      // limitToLas(3),
      equalTo(5),
    );
    await get(que).then(res => {
      if (res.exists()) {
        const oldData = res.val();
        const data = [];
        Object.keys(oldData).map(key => {
          data.push({
            id: key,
            data: oldData[key],
          });
        });
        setDoctors(data);
        setSkeleton(false);
      }
    });
  }, []);

  return {profile, newsItem, docterCategory, doctors, skeleton};
};
