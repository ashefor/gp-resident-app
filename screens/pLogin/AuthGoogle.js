import React from 'react';
import { View, Alert, ActivityIndicator } from 'react-native';

import { Container, Header, Content, Item, Input, Icon, Form, Label, Body, Text, Card, CardItem } from 'native-base';
import Button from '@ant-design/react-native/lib/button';

import * as Google from 'expo-google-app-auth';

const config = {
  iosClientId: '631799171633-5lbq1cvhelvtu53uie7e58gl5c2esgrb.apps.googleusercontent.com',
  androidClientId: '631799171633-mn8nnnop8rjvo8lhq4bl46nid06vk96m.apps.googleusercontent.com',
}

function AuthGoogle(props) {
  const [loading, setLoading ] = React.useState(false);

  async function logInGoogle() {
    setLoading(true);
    try {
      const result = await Google.logInAsync(config);
      console.log(result);
      const { type, accessToken, user } = result;
      if (type === 'success') {
        console.log(user);
        props.navigation.navigate('Main');
        setLoading(false);
        return result.accessToken;
      } else {
        setLoading(false);
        return { cancelled: true };
      }
    } catch (e) {
      setLoading(false);
      return { error: true };
    }
    setLoading(false);
  }
  return (
    <View>
      <Button
        type="warning"
        style={{
    height: 50,

          width: 150,
        }}
        onPress={logInGoogle}
        loading={loading}
      >
        <Text 
         style={{
            color: '#FFFFFF',
          }}
        >
          Google Login
        </Text>
      </Button>
    </View>
  );
}

export default AuthGoogle;