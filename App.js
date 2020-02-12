import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Platform, View, ActivityIndicator, ImageBackground } from 'react-native';
import AppNavigation from './src/navigation/AppNavigator'
import * as Font from 'expo-font';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyC9zbuOoPvhV9YgK5rV5kFkaIc1xjltODs",
  authDomain: "gatepass-228e2.firebaseapp.com",
  databaseURL: "https://gatepass-228e2.firebaseio.com",
  projectId: "gatepass-228e2",
  storageBucket: "gatepass-228e2.appspot.com",
  messagingSenderId: "475186389568",
  appId: "1:475186389568:web:89683aebd868afdcc2f5a5",
  measurementId: "G-ZK3QZ877WR"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'josefin-sans-semi-bold': require('./src/assets/fonts/Josefin_Sans/JosefinSans-SemiBold.ttf'),
      'josefin-sans-reg': require('./src/assets/fonts/Josefin_Sans/JosefinSans-Regular.ttf'),
      'josefin-sans-light': require('./src/assets/fonts/Josefin_Sans/JosefinSans-Light.ttf'),
      'josefin-sans-bold': require('./src/assets/fonts/Josefin_Sans/JosefinSans-Bold.ttf'),
    });
    this.setState({ fontLoaded: true });
  }
  render() {
    const { fontLoaded } = this.state
    if (fontLoaded) {
      return (
        <View style={{flex: 1}}>
       <ImageBackground 
       style={styles.imgBckgd}
       source={require('./src/assets/images/housing.png')}>
          <AppNavigation />
       </ImageBackground>
        </View>
      )
    }
    return (
      <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
      <ActivityIndicator color='white' size='large' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imgBckgd: {
    width: '100%', 
    height: '100%',
  }
});
