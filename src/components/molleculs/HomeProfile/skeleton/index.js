import {View, StyleSheet, Text} from 'react-native';
import {colors} from '../../../../utils';

export default function HomeProfileSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.avatar} />
      <View style={styles.content}>
        <Text style={styles.name}></Text>
        <Text style={styles.profession}></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 30,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    marginRight: 12,
    backgroundColor: colors.button.disable.text,
  },
  content: {
    justifyContent: 'center',
  },
  name: {
    width: 140,
    height: 10,
    backgroundColor: colors.button.disable.text,
    borderRadius: 10,
  },
  profession: {
    width: 100,
    height: 10,
    backgroundColor: colors.button.disable.text,
    marginTop: 8,
    borderRadius: 10,
  },
});
