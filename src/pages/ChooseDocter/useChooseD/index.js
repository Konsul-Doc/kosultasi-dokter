import {
  equalTo,
  get,
  getDatabase,
  orderByChild,
  query,
  ref,
} from 'firebase/database';
import {useState, useEffect, useCallback} from 'react';
import {Fire} from '../../../config';

export const useChooseD = route => {
  const [doctors, setDoctor] = useState([]);
  const itemCategory = route.params;
  useEffect(() => {
    callDoctorByCategory(itemCategory.category);
  }, []);
  const callDoctorByCategory = useCallback(async category => {
    const db = getDatabase(Fire);
    const que = query(
      ref(db, 'doctors/'),
      orderByChild('category'),
      equalTo(category),
    );
    await get(que).then(res => {
      if (res.exists) {
        const oldData = res.val();
        const data = [];
        Object.keys(oldData).map(key => {
          data.push({
            id: key,
            data: oldData[key],
          });
        });
        setDoctor(data);
      }
    });
  }, []);

  return {doctors, itemCategory};
};
