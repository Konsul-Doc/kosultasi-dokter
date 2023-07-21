import {getDatabase, ref, set} from 'firebase/database';
import {useForm} from 'react-hook-form';
import {Fire} from '../../../config';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import {useDispatch} from 'react-redux';
import {setDataItem, showMessageError} from '../../../utils';

export const useRegister = navigation => {
  const dispatch = useDispatch();
  const {control, handleSubmit} = useForm();
  const db = getDatabase(Fire);
  const auth = getAuth(Fire);
  const onSubmit = e => {
    dispatch({type: 'SET_LOADING', value: true});
    createUserWithEmailAndPassword(auth, e.email, e.password)
      .then(userCredential => {
        const user = userCredential.user;
        // setForm('reset');
        const data = {
          fullName: e.fullName,
          profession: e.profession,
          email: e.email,
          uid: user.uid,
        };
        set(ref(db, 'users/' + user.uid), {
          data,
        });
        const itemPhoto = data;
        itemPhoto.photo = '';
        setDataItem('userProfile', data);
        navigation.navigate('UploadPhoto', data);
        dispatch({type: 'SET_LOADING', value: false});
      })
      .catch(error => {
        dispatch({type: 'SET_LOADING', value: false});
        const errorMessage = error.message.split(' ');
        showMessageError(errorMessage[2]);
      });
  };

  return {onSubmit, control, handleSubmit};
};
