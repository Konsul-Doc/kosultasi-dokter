import {useState, useEffect} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {getDatabase, ref, update} from 'firebase/database';
import {Fire} from '../../../config';
import {ILNullPhoto} from '../../../assets';
import {getDataItem, setDataItem, showMessageError} from '../../../utils';

export const useUploadPhoto = navigation => {
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoForDB, setPhotoForDB] = useState('');
  const [dataPhoto, setDataPhoto] = useState({});

  const db = getDatabase(Fire);
  useEffect(() => {
    getDataItem('userPhoto').then(res => {
      setDataPhoto(res);
    });
  }, []);

  const getImageFromGallery = () => {
    launchImageLibrary(
      {includeBase64: true, quality: 0.5, maxWidth: 200, maxHeight: 200},
      res => {
        if (res.didCancel || res.errorCode) {
          if (res.didCancel) {
            showMessageError('oops, sepertinya anda tidak memilih foto nya?');
          } else {
            showMessageError(res.errorMessage);
          }
        } else {
          const Assets = res.assets[0];
          const source = {uri: Assets.uri};
          setPhotoForDB(`data:${Assets.type};base64, ${Assets.base64}`);
          setPhoto(source);
          setHasPhoto(true);
        }
      },
    );
  };

  const uploadAndContinue = () => {
    update(ref(db, `users/${dataPhoto.uid}/data`), {
      photo: photoForDB,
    });
    const data = dataPhoto;
    data.photo = photoForDB;
    setDataItem('userProfile', data);
    navigation.replace('MainApp');
  };

  return {hasPhoto, photo, dataPhoto, getImageFromGallery, uploadAndContinue};
};
