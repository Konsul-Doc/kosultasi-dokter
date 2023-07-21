import {View, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {colors} from '../../../../utils';

export default function NewsItemSkeleton() {
  return (
    <SkeletonPlaceholder backgroundColor={colors.skeleton}>
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <View style={styles.title} />
          <View style={styles.date} />
        </View>
        <View style={styles.image} />
      </View>
    </SkeletonPlaceholder>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 12,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  titleWrapper: {flex: 1},
  title: {
    width: 180,
    height: 8,
    borderRadius: 10,
    maxWidth: '90%',
  },
  date: {
    width: 90,
    height: 8,
    borderRadius: 10,
    marginTop: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 11,
  },
});
