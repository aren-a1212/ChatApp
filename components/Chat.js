import React from 'react';
import { GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text,Platform, KeyboardAvoidingView, ImageBackground, ScrollView } from 'react-native';
import { addDoc, collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Chat = ({route, db,  navigation , isConnected , storage}) => {
 const {name, bgColor, userId} = route.params;  
 const [messages, SetMessages]= useState([]); 



 let unsubMessages;

useEffect(() => {
 navigation.setOptions({ title: name });
if (isConnected === true) {
      if (unsubMessages) unsubMessages();
      unsubMessages = null;


 const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
  unsubMessages = onSnapshot(q, (docs) => {
   let newMessages = [];
   docs.forEach(doc => {
     newMessages.push({
       id: doc.id,
       ...doc.data(),
       createdAt: new Date(doc.data().createdAt.toMillis())
     })
   })
   cacheMessages(newMessages);
   SetMessages(newMessages);
 })
}else loadCachedMessages();

return () => {
   if (unsubMessages) unsubMessages();
 }
}, [isConnected]);

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("messages") || [];
    SetMessages(JSON.parse(cachedMessages));
  };

   const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  }
 // Handler for sending new messages
  const onSend = async (newMessages) => {
    console.log('onSend in Chat.js called with:', newMessages);
    try {
      await addDoc(collection(db, "messages"), newMessages[0]);
      console.log('Message sent to Firestore successfully!');
    } catch (error) {
      console.error('Error sending message to Firestore:', error);
      // Optionally, display an error message to the user
    }
  }
  const renderInputToolbar = (props) => {
  if (isConnected === true) return <InputToolbar {...props} containerStyle={styles.inputToolbarContainer} />;
  else return null;
}


  return (
    <View style={[styles.background, { backgroundColor: bgColor }]}>
      <KeyboardAvoidingView style={styles.flex}
       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
       keyboardVerticalOffset={Platform.select({ ios: 90, android: 0 })} >
      <GiftedChat
  messages={messages}
  onSend={messages => onSend(messages)}
  user={{ _id: userId, name }}
  wrapperStyle={styles.chatWrapper}
  messagesContainerStyle={styles.messagesContainer}
  renderInputToolbar={renderInputToolbar}
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