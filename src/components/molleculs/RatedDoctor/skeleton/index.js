import {View, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {colors} from '../../../../utils';

export default function RatedDoctorSkeleton() {
  return (
    <SkeletonPlaceholder backgroundColor={colors.skeleton}>
      <View style={styles.container}>
        <View style={styles.avatar} />
        <View style={styles.profile}>
          <View style={styles.name} />
          <View style={styles.category} />
        </View>
        <View style={styles.rate} />
      </View>
    </SkeletonPlaceholder>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginRight: 12,
  },
  rate: {
    flexDirection: 'row',
    width: 90,
    height: 8,
    borderRadius: 10,
  },
  profile: {
    flex: 1,
  },
  name: {
    width: 90,
    height: 8,
    borderRadius: 10,
  },
  category: {
    marginTop: 10,
    width: 60,
    height: 8,
    borderRadius: 10,
  },
});
