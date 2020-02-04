import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Platform, View, ActivityIndicator, ImageBackground } from 'react-native';
import AppNavigation from './src/navigation/AppNavigator'
import * as Font from 'expo-font';

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
