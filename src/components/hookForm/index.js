import {Controller} from 'react-hook-form';
import React, {useState} from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import {colors, fonts} from '../../utils';

export default function HookFormInput({
  label,
  secureTextEntry,
  disable,
  control,
  name,
}) {
  const [border, setBorder] = useState(colors.border);
  const onFocusForm = () => {
    setBorder(colors.tertiary);
  };
  const onBlurForm = () => {
    setBorder(colors.border);
  };
  return (
    <View>
      <Text style={styled.label}>{label}</Text>
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <TextInput
            onBlur={onBlurForm}
            onFocus={onFocusForm}
            style={styled.input(border)}
            value={value}
            onChangeText={onChange}
            secureTextEntry={secureTextEntry}
            editable={!disable}
            selectTextOnFocus={!disable}
          />
        )}
        name={name}
      />
    </View>
  );
}

const styled = StyleSheet.create({
  input: border => ({
    borderWidth: 1,
    borderColor: border,
    borderRadius: 10,
    padding: 12,
  }),
  label: {
    fontSize: 16,
    color: '#7D8797',
    marginBottom: 6,
    fontFamily: fonts.primary.normal,
  },
  picker: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 4,
  },
});
