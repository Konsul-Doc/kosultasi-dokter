import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Gap, Header} from '../../components';
import HookFormInput from '../../components/hookForm';
import {colors} from '../../utils';
import {useRegister} from './useRegister';

export default function Register({navigation}) {
  const {control, handleSubmit, onSubmit} = useRegister(navigation);
  return (
    <>
      <View style={styled.page}>
        <Header onPress={() => navigation.goBack()} />
        <View style={styled.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <HookFormInput
              control={control}
              label="Full Name"
              name="fullName"
            />
            <Gap height={24} />
            <HookFormInput
              control={control}
              label="Pekerjaan"
              name="profession"
            />
            <Gap height={24} />
            <HookFormInput
              control={control}
              label="Email Address"
              name="email"
            />
            <Gap height={24} />
            <HookFormInput
              control={control}
              label="Password"
              name="password"
              secureTextEntry
            />
            <Gap height={40} />
            <Button title="Continue" onPress={handleSubmit(onSubmit)} />
          </ScrollView>
        </View>
      </View>
    </>
  );
}

const styled = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
