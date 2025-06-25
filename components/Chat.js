import React from 'react';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text,Platform, KeyboardAvoidingView, ImageBackground, ScrollView } from 'react-native';
import { addDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const Chat = ({route, db,  navigation}) => {
 const {name, bgColor, userId} = route.params;  
 const [messages, SetMessages]= useState([]); 

useEffect(() => {
 navigation.setOptions({ title: name });
 const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
 const unsubMessages = onSnapshot(q, (docs) => {
   let newMessages = [];
   docs.forEach(doc => {
     newMessages.push({
       id: doc.id,
       ...doc.data(),
       createdAt: new Date(doc.data().createdAt.toMillis())
     })
   })
   SetMessages(newMessages);
 })
 return () => {
   if (unsubMessages) unsubMessages();
 }
}, []);
 // Handler for sending new messages
const onSend = (newMessages = []) => {
    addDoc(collection(db, "messages"), {
      ...newMessages[0],
      createdAt: new Date(),
      user: {
        _id: userId,
        name: name
      }
    });
  };


  return (
    <View style={[styles.background, { backgroundColor: bgColor }]}>
      <KeyboardAvoidingView style={styles.flex}
       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
       keyboardVerticalOffset={Platform.select({ ios: 90, android: 0 })} >
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
       user={{ _id: route.params.userId, name }}
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