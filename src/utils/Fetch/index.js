import {child, get, getDatabase, ref} from 'firebase/database';
import {Fire} from '../../config';

const dbRef = ref(getDatabase(Fire));

export function GetData(url) {
  get(child(dbRef, url)).then(res => {
    if (res.exists) {
      const data = res.val();
      const filterData = data.filter(el => el !== null);
      return filterData;
    }
  });
}
