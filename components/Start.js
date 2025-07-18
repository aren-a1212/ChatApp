import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ImageBackground, ScrollView, Platform, Alert, KeyboardAvoidingView } from 'react-native';
import background from '../assets/background.png';
import { getAuth, signInAnonymously } from 'firebase/auth';


const Start = ({ navigation }) => {
  const auth = getAuth();
  const COLOR_OPTIONS = [
    '#090C08',
    '#474056',
    '#8A95A5',
    '#B9C6AE'
  ];
  const [name, setName] = useState('');
  const [bgColor, setBgColor] = useState(COLOR_OPTIONS[0]);

  const signInUser = () => {

    if (!name.trim()) {
      Alert.alert('Please enter your name');
      return;
    }
    signInAnonymously(auth).then(res => {
      navigation.navigate("Chat", {
        userID: res.user.uid,  
        name: name,
        bgColor: bgColor
      });
    }).catch(err => {
      Alert.alert("Unable to sign in, try again later");
      console.log(err);
    });
  }

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);


  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoiding}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >


      <ImageBackground
        source={background}
        style={styles.background}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
        >


          <View style={styles.viewing}>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder='Type your name'
              placeholderTextColor="rgba(117,112,131,0.5)"
            />

            <Text style={styles.chooseText}>Choose background color:</Text>
            <View style={styles.colorContainer}>
              {COLOR_OPTIONS.map(color => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorCircle,
                    { backgroundColor: color },
                    bgColor === color && styles.colorCircleSelected
                  ]}
                  onPress={() => setBgColor(color)}
                />
              ))}
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={signInUser}
            >
              <Text style={styles.buttonText}>
                Start Chatting
              </Text>
            </TouchableOpacity>
          </View>


        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  viewing: {
    width: '88%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#757083',
    borderRadius: 5,
    marginVertical: 15,
    fontSize: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#757083',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  chooseText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  colorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  colorCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  colorCircleSelected: {
    borderWidth: 3,
    borderColor: '#5f5f5f',
  }
});

export default Start;