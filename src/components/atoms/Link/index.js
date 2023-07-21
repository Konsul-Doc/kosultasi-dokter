import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {fonts} from '../../../utils';

export default function Link({title, size, align, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styled.text(size, align)}>{title}</Text>
    </TouchableOpacity>
  );
}

const styled = StyleSheet.create({
  text: (size, align) => ({
    fontSize: size,
    color: '#7D8797',
    fontFamily: fonts.primary.normal,
    textDecorationLine: 'underline',
    textAlign: align,
  }),
});
