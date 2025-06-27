import 'react-native-reanimated';
import React, {useEffect} from 'react';
import { NativeModules, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat';
import { initializeApp } from "firebase/app";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFirestore, enableNetwork, disableNetwork } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { useNetInfo } from '@react-native-community/netinfo';

const App = () => {

  const connectionStatus= useNetInfo();
const firebaseConfig = {
  apiKey: "AIzaSyAzHV2aSu4tQuWy8g6YjZ5xJtXnSLn9Eu0",
  authDomain: "chatapp-8f914.firebaseapp.com",
  projectId: "chatapp-8f914",
  storageBucket: "chatapp-8f914.firebasestorage.app",
  messagingSenderId: "634128028899",
  appId: "1:634128028899:web:d10ce9ff0a69bf2ff0e1d6"
};

const app = initializeApp(firebaseConfig); 
 
const db   = getFirestore(app);
const storage= getStorage(app);

const Stack = createNativeStackNavigator();

useEffect(()=>{
  if(connectionStatus.isConnected === false){
    Alert.alert("Connection lost")
    disableNetwork(db);
  }else if (connectionStatus.isConnected === true){
    enableNetwork(db);
  }
},[connectionStatus.isConnected]);








  return (
    <NavigationContainer>
       <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start">
         {props => <Start {...props}  component={Start} />}
       </Stack.Screen>
        <Stack.Screen
          name="Chat" >
         {props => <Chat {...props} db={db} isConnected={connectionStatus.isConnected} storage={storage} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default App;