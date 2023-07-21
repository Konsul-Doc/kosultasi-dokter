import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ILLogin} from '../../assets';
import {Button, Gap, Link} from '../../components';
import HookFormInput from '../../components/hookForm';
import {colors, fonts} from '../../utils';
import {useLogin} from './useLogin';

export default function Login({navigation}) {
  const {control, handleSubmit, onSubmit} = useLogin(navigation);
  return (
    <View style={styled.page}>
      <ImageBackground source={ILLogin} style={styled.background}>
        <View style={styled.contentHeader}>
          <Button
            type="icon-only"
            icon="back-light"
            onPress={() => navigation.goBack()}
          />
        </View>
      </ImageBackground>
      <View style={styled.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={40} />
          <Text style={styled.text}>Log in</Text>
          <HookFormInput label="Email Address" name="email" control={control} />
          <Gap height={25} />
          <HookFormInput
            label="Password"
            name="password"
            secureTextEntry
            control={control}
          />
          <Gap height={10} />
          <Link title="Forgot My Password" size={12} />
          <Gap height={40} />
          <Button title="Sign In" onPress={handleSubmit(onSubmit)} />
          <Gap height={30} />
          <Link
            title="Create New Account"
            size={16}
            align="center"
            onPress={() => navigation.navigate('Register')}
          />
          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
}

const styled = StyleSheet.create({
  page: {
    flex: 1,
  },
  background: {
    height: 259,
    paddingTop: 30,
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.primary[700],
    color: colors.text.primary,
    marginBottom: 20,
    margin: 0,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -40,
    paddingHorizontal: 20,
  },
});
