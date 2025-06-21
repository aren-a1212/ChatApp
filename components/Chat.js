import React from 'react';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text,Platform, KeyboardAvoidingView, ImageBackground, ScrollView } from 'react-native';


const Chat = ({route, navigation}) => {
 const {name, bgColor} = route.params;  
 const [messages, SetMessages]= useState([]); 


 useEffect(() => {
  navigation.setOptions({ title: name });
// Seed chat with a system message and a test user message
  SetMessages([
    {
      _id: 1,
      text: `Hello ${name}!you have entered the chat`,
      createdAt: new Date(),
      system: true
    },
    {
    _id: 2,
    text: 'Hey everyone, this is a test message.',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'ChatUser'
    }
  }
]);
}, []);
 // Handler for sending new messages
const onSend= (newMessages)=>{
  SetMessages(previousMessages=>
    GiftedChat.append(previousMessages, newMessages)
  );
};


  return (
    <View style={[styles.background, { backgroundColor: bgColor }]}>
      <KeyboardAvoidingView style={styles.flex}
       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
       keyboardVerticalOffset={Platform.select({ ios: 90, android: 0 })} >
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
          name:name
        }}
        wrapperStyle={styles.chatWrapper}
          messagesContainerStyle={styles.messagesContainer}

          renderInputToolbar={props => (
            <InputToolbar
              {...props}
              containerStyle={styles.inputToolbarContainer}
            />
          )}

          bottomOffset={0}
        />
      
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
 background: {
   flex: 1
 },
 flex:{
  flex: 1
 },
 scrollContainer:{
flexGrow:1
 },
  // 1) Outer wrapper that replaces the big white background
  chatWrapper: {
    backgroundColor: 'transparent',  
    marginTop: 0,
  },
  // 2) Messages list container
  messagesContainer: {
    backgroundColor: 'transparent',
    paddingTop: 0,
  },
  inputToolbarContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    paddingVertical: 6,
  },
});

export default Chat;