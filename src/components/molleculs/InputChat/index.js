import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {colors, fonts} from '../../../utils';
import {Button} from '../../atoms';

export default function InputChat({value, onChangeText, onButtonPress}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tulis Pesan Untuk"
        value={value}
        onChangeText={onChangeText}
      />
      <Button
        disable={value?.length < 1}
        type="btn-icon-send"
        onPress={onButtonPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  input: {
    flex: 1,
    backgroundColor: colors.disable,
    padding: 14,
    borderRadius: 10,
    marginRight: 10,
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    maxHeight: 45,
  },
});
