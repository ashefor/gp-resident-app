import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import { Icon } from 'native-base';

import Constants from 'expo-constants';
import * as LocalAuthentication from 'expo-local-authentication';
import { Flex, Button,Toast } from '@ant-design/react-native/lib';
import { withNavigation } from 'react-navigation';
const { width, height } = Dimensions.get('window');

class AuthFingerprint extends React.Component {
  state = {
    loading: false,
    authenticated: false,
    failedCount: 0,
  };

  clearState = () => {
    this.setState({ 
      loading: true, 
      authenticated: false, 
      failedCount: 0 
    });
  };

  scanFingerPrint = async () => {
    const { navigation } = this.props;
    Toast.loading('Place your finger on the scanner of your device');
    // sleep(1000);
    try {
      let results = await LocalAuthentication.authenticateAsync();
      if (results.success) {

        this.setState({
          loading: false,
          authenticated: true,
          failedCount: 0,
        });
        Toast.success('Welcome Back');

        setTimeout(function() {
          navigation.navigate('Main');
        },2100);

      } else {
          let newFailedCount = this.state.failedCount + 1;
          let failedCountMsg = `${newFailedCount} failed attempts`;
          this.setState({
            failedCount: newFailedCount,
          });
          Toast.info(failedCountMsg);
        } 
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { loading, authenticated, failedCount } = this.state;
    return (
      <View
      style={styles.container}
        >
        <Button
          type="ghost"
          style={{
            borderWidth: 0,
          }}
          onPress={() => {
            this.clearState();
            this.scanFingerPrint();
          }}
          >
            <Icon
              active
              name='md-finger-print'
              style={{
                fontSize: loading ? 27 : 36, 
                color: loading ? 'red' 
                : authenticated ? 'green'
                : '#000'
              }}
            />
          </Button>
      </View>
    );
  }
}

export default withNavigation(AuthFingerprint);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  innerContainer: {
    flex: 1,
  },
  authButton: {
    borderRadius: 30,
    width: width/3
  },
  greyButton: {
    backgroundColor: '#b3b3b3',
  },
  text: {
    alignSelf: 'center',
    fontSize: 12,
  },
});
