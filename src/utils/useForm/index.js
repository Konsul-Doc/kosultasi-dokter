import {useState} from 'react';

// custom hooks input form
export const useForm = initialState => {
  const [values, setValues] = useState(initialState);
  return [
    values,
    (formType, formValue) => {
      if (formType === 'reset') {
        return setValues(initialState);
      }
      return setValues({...values, [formType]: formValue});
    },
  ];
};
