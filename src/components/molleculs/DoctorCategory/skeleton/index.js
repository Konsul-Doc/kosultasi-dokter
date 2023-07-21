import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {colors} from '../../../../utils';

export default function DoctorCategorySkeleton() {
  return (
    <SkeletonPlaceholder backgroundColor={colors.skeleton}>
      <View style={styles.container}>
        <View style={styles.illustrasion} />
        <Text style={styles.label}></Text>
        <Text style={styles.category}></Text>
      </View>
    </SkeletonPlaceholder>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    alignSelf: 'flex-start',
    marginRight: 10,
    width: 100,
    height: 130,
  },
  illustrasion: {
    marginBottom: 28,
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
  },
  label: {
    width: 60,
    height: 8,
    borderRadius: 10,
  },
  category: {
    width: 40,
    height: 8,
    marginTop: 8,
    borderRadius: 10,
  },
});
