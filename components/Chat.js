import { useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import background from '../assets/background.png';


const Chat = ({route, navigation}) => {
 const {name, bgColor} = route.params;  


 useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);


 return (
<View style={[styles.background, { backgroundColor: bgColor }]}>
   <View style={styles.container}>
     <Text>Hello {name}!</Text>
   </View>
   </View>
 
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 },
 background:{
  flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
 }
});

export default Chat;