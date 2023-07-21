import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {Fire} from '../../../config';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, onValue, ref} from 'firebase/database';
import {setDataItem, showMessageError} from '../../../utils';

export const useLogin = navigation => {
  const {control, handleSubmit} = useForm();
  const dispatch = useDispatch();
  const auth = getAuth(Fire);
  const db = getDatabase(Fire);
  const onSubmit = e => {
    dispatch({type: 'SET_LOADING', value: true});
    signInWithEmailAndPassword(auth, e.email, e.password)
      .then(userCredential => {
        const user = userCredential.user;
        onValue(
          ref(db, `users/${user.uid}/`),
          resDB => {
            if (resDB.val()) {
              setDataItem('userProfile', resDB.val().data);
              navigation.replace('MainApp');
              dispatch({type: 'SET_LOADING', value: false});
            }
          },
          {onlyOnce: true},
        );
        // setForm('reset');
      })
      .catch(error => {
        dispatch({type: 'SET_LOADING', value: false});
        const errorMessage = error.message.split(' ');
        showMessageError(errorMessage[2]);
      });
  };
  return {control, handleSubmit, onSubmit};
};
