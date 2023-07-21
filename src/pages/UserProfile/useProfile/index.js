import {useState, useEffect} from 'react';
import {signOut, getAuth} from 'firebase/auth';
import {Fire} from '../../../config';
import {deleteDataItem, getDataItem, showMessageError} from '../../../utils';

export const useProfile = navigation => {
  const [profile, setProfile] = useState({
    fullName: '',
    profession: '',
    photo: '',
  });
  const auth = getAuth(Fire);

  useEffect(() => {
    getDataItem('userProfile').then(res => {
      const data = res;
      data.photo = res.photo;
      setProfile(res);
    });
  }, []);

  const LogOut = () => {
    signOut(auth)
      .then(() => {
        deleteDataItem('userProfile');
        navigation.replace('GetStarted');
      })
      .catch(error => {
        const errorMessage = error.message.split(' ');
        showMessageError(errorMessage[2]);
      });
  };

  return {profile, LogOut};
};
