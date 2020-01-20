import React from 'react';
import { View, Alert, ActivityIndicator } from 'react-native';
import { Container, Header, Content, Item, Input, Icon, Form, Label, Body, Text, Card, CardItem } from 'native-base';

import * as Facebook from 'expo-facebook';
import Button from '@ant-design/react-native/lib/button';

const config = {
  iosClientId: '631799171633-5lbq1cvhelvtu53uie7e58gl5c2esgrb.apps.facebookusercontent.com',
  androidClientId: '631799171633-mn8nnnop8rjvo8lhq4bl46nid06vk96m.apps.facebookusercontent.com',
}

function AuthFacebook(props) {
  const [loading, setLoading ] = React.useState(false);

  async function logInFacebook() {
    setLoading(true);
    try {
      await Facebook.initializeAsync('540180700044433');
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        const res = await response.json();
        Alert.alert(`Hi ${(await res).name}!`);
        console.log(res);
        props.navigation.navigate('Main');
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
    setLoading(false);
  }
  return (
    <View>
      <Button
        type="primary"
        style={{
    height: 50,

          width: 150,
          backgroundColor: '#3b5998',
          borderColor: '#3b5998',
        }}
        onPress={logInFacebook}
                  loading={loading}
        
      >
        <Text 
         style={{
            color: '#FFFFFF',
          }}
        >
          Facebook Login
        </Text>
      </Button>
    </View>
  );
}

export default AuthFacebook;