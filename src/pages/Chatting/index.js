import React, {useRef} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ChatItems, Header, InputChat} from '../../components';
import {colors, fonts} from '../../utils';
import {useChatting} from './useChatting';

export default function Chatting({navigation, route}) {
  const {user, chatData, chatContent, chatSend, dataDoctor, setChatContent} =
    useChatting(route);
  const containerRef = useRef(null);
  return (
    <View style={styles.page}>
      <Header
        type="dark-profile"
        title={dataDoctor.fullName}
        desc={dataDoctor.category}
        photo={dataDoctor.photo}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={containerRef}
          onContentSizeChange={() =>
            containerRef.current.scrollToEnd({animated: true})
          }>
          {chatData?.map(chat => {
            return (
              <View key={chat.id}>
                <Text style={styles.chatDate}>{chat.id}</Text>
                {chat?.data?.map(itemChat => {
                  const isMe = itemChat?.data?.sendBy === user.uid;
                  return (
                    <ChatItems
                      key={itemChat?.id}
                      text={itemChat?.data?.chatContent}
                      date={itemChat?.data?.chatTime}
                      isMe={isMe}
                      photo={isMe ? '' : dataDoctor?.photo}
                    />
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <InputChat
        value={chatContent}
        onChangeText={val => setChatContent(val)}
        onButtonPress={chatSend}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  chatDate: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginVertical: 20,
    textAlign: 'center',
  },
});
