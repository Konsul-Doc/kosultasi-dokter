import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ListDoctor} from '../../components';
import ListDoctorSkeleton from '../../components/molleculs/ListDoctor/skeleton';
import {colors, fonts} from '../../utils';
import {useMessage} from './useMessage';

export default function Messages({navigation}) {
  const {historyChat, skeleton} = useMessage();
  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Text style={styles.title}>Messages</Text>
        {skeleton
          ? Array(4)
              .fill()
              .map((_, i) => <ListDoctorSkeleton key={i} />)
          : historyChat.map(chat => {
              const dataDoctor = {
                uid: chat.detailDoctor.uid,
                ...chat.detailDoctor,
              };
              return (
                <ListDoctor
                  key={chat?.id}
                  type="next"
                  profile={chat?.detailDoctor?.photo}
                  name={chat?.detailDoctor?.fullName}
                  desc={chat?.lastContentChat}
                  onPress={() => navigation.navigate('Chatting', dataDoctor)}
                />
              );
            })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 16,
  },
});
