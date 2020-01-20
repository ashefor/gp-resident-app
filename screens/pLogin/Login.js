import React, { useEffect } from 'react';
import { View, Image, ImageBackground, ActivityIndicator, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import firebase from 'firebase';
// import * as firebase from 'firebase/app';
import { useForm } from "react-hook-form";

import { Container, Header, Content, Item, Input, Icon, Form, Label, Body,  Text, Card, CardItem } from 'native-base';
import { Flex, Button, Toast } from '@ant-design/react-native/lib';

import AuthFingerprint from './AuthFingerprint';
import AuthGoogle from './AuthGoogle';
import AuthFacebook from './AuthFacebook';

import pColours from '../../constants/Colors' ;

async function resetPassword(props) {
  const config = {
    iosClientId: '631799171633-5lbq1cvhelvtu53uie7e58gl5c2esgrb.apps.googleusercontent.com',
    androidClientId: '631799171633-mn8nnnop8rjvo8lhq4bl46nid06vk96m.apps.googleusercontent.com',
  }
  var actionCodeSettings = {
    url: 'https://stow-62251.firebaseapp.com/?email=andrew@3wp.io',
    iOS: {
      bundleId: 'com.threewp.stow'
    },
    android: {
      packageName: 'com.threewp.stow',
      installApp: false,
      minimumVersion: '12'
    },
    handleCodeInApp: false
  };
  await firebase.auth().sendPasswordResetEmail(
    'andrew@3wp.io')
    .then(function() {
      // Password reset email sent.
      Toast.success('Please check your email to complete the reset.');
    })
    .catch(function(error) {
      // Error occurred. Inspect error.code.
      var errorCode = error.code;
      var errorMessage = error.message;
      Toast.fail(errorMessage);
    });
}

function Login(props) {
  const { register, setValue, handleSubmit, errors } = useForm();
	const [loading, setLoading ] = React.useState(false);
  const [password, setPassword] = React.useState('');


  const onSubmit = async data => {
    setLoading(true);
    const { email, password } = data;
        props.navigation.navigate('Main');
    // await firebase.auth().signInWithEmailAndPassword(email, password)
    //   .then(function(res) {
    //     console.log(res);
    //     Toast.success('Logged In');
    //     props.navigation.navigate('Main');
    //   })
    //   .catch(function(error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     Toast.fail(errorMessage);
          
    //   });
    setLoading(false);
  };

  // useEffect( () => {
  //   signOut();
  //   console.log('Signed Out');
  // },[])

  firebase.auth().getRedirectResult().then(function(result) {
      console.log(result);
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
    }
  })
    .then(function(res) {
      console.log('GOOGLEAUTOO');
      console.log(res);
      // The firebase.auth.AuthCredential type that was used.
      // const { email, credential } = res;
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // alert(errorMessage);
    });


    return (
      <View
        style={{
          flex:1,
          flexDirection: "column",
          justifyContent: 'center',
          backgroundColor: pColours.pBlue,
          paddingHorizontal: 8,
        }}
      >
 
        <Card
          transparent
          full
          style={{
            flex:1,
            flexDirection: "column",
            justifyContent: 'space-evenly',
          }}
        >
          <Image 
            source={ require('../../assets/images/logo.png')} 
            style = {{
              height:80,
              alignSelf: 'center'
            }}
              resizeMode="contain"
              
              />
            <Text style={styles.title}>
              Login
            </Text>
            <Form
              style={{ 
                paddingHorizontal: 20,
              }}
            >
              <Item regular style={styles.input}>

                 <Icon name='person' />
                 <Input 
                  placeholder='Email'
                  placeholderTextColor={pColours.pTextDark}
                  name="email"
                  ref={register({ name: 'email'}, { required: true })}
                  onChangeText={text => setValue('email', text, true)}
                />
                {errors.email && <Text style={{color: 'red'}}>Required</Text>}
              
              </Item>

              <Item regular style={styles.input}>

                 <Icon name='lock' />
                 <Input 
                  placeholder='Password'
                  placeholderTextColor={pColours.pTextDark}
                  secureTextEntry={true}
                  name="password"
                  ref={register({ name: 'password'}, { required: true })}
                  onChangeText={text => setValue('password', text, true)}
                />
                {errors.password && <Text style={{color: 'red'}}>Required</Text>}
              
              </Item>


              <Button
                  type="ghost"
                  style={{
                    borderWidth: 0,
                    alignItems: 'flex-end'
                  }}
                  onPress={resetPassword}
                >
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 15,
                    color: '#fff',
                  }}
                >
                  Forgot Password?
                </Text>
              </Button>

              <Button
                style={[styles.authButton,styles.blueButton]}
                onPress={handleSubmit(onSubmit)}
                loading={loading}
              >
                <Text
                  style={{ fontFamily: 'Poppins-Regular',color: '#fff' }}
                >
                  Login
                </Text>
              </Button>

                <AuthFingerprint />
                
            </Form>
          </Card>

       
      </View>
    );
  }

Login.navigationOptions = {
  header: null,
};
export default withNavigation(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
    // backgroundColor: '#EEEEEE',
  },
  card: {
    marginHorizontal: 33,
  },
  input: {
    borderRadius: 5,
    marginTop: 12,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    color: pColours.pBlueDark,
  },
  authButton: {
    marginVertical: 12,
    borderRadius: 3,
    width: '100%',
  },
  greyButton: {
    backgroundColor: '#b3b3b3',
  },
  blueButton: {
    backgroundColor: pColours.pBlueDark,
    borderColor: pColours.pBlueDark,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    margin: 10,
    height: 75
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 4,
  }
});

