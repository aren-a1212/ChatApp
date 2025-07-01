# ChatApp

Chat app is an easy to use and effective app that can be used to send and receive chat messages in real time. Chat messages can be simply text messages, or include photos or geolocations.


## Features

Chat is customizable: users enter their name and can select a chosen background colour.

Users don't need an account. they can use anonymous authentication from Firebase Auth.

Messages stored within Firebase database.

App determines if user is online or not (using Network status detection with @react-native-community/netinfo) and if necessary AsyncStorage renders past messages (but no new messages can be sent)

Chat messages can include images (both from the camera and camera roll) using Firebase Storage, as well as geolocations
with react-native-maps.


## 🚀 Getting Started

### Prerequisites
* React Native (Expo)
* Firebase (Auth, Firestore, Storage)
* React Navigation
* Gifted Chat
* AsyncStorage

### Installation
```bash
git clone git@github.com:aren-a1212/chat-app.git
cd chat-app
npm install
expo start
