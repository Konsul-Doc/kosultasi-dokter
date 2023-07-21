import {StyleSheet, View} from 'react-native';
import {Header, ListDoctor} from '../../components';
import {colors} from '../../utils';
import {useChooseD} from './useChooseD';

export default function ChooseDoctor({navigation, route}) {
  const {doctors, itemCategory} = useChooseD(route);
  return (
    <View style={styles.page}>
      <Header
        type="dark"
        title={itemCategory?.category}
        onPress={() => navigation.goBack()}
      />
      {doctors?.map(item => (
        <ListDoctor
          key={item?.id}
          type="next"
          profile={item?.data?.photo}
          name={item?.data?.fullName}
          desc={item?.data?.category}
          onPress={() => navigation.navigate('DoctorProfile', item)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
});
