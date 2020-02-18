import React, { useState, Component } from 'react';
import { StyleSheet, Dimensions, View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import SafeAreaView from 'react-native-safe-area-view';
import { resFont, resHeight, resWidth } from '../utils/utils';
import { useForm } from 'react-hook-form';
import { Flex, Button, Toast, Modal } from '@ant-design/react-native/lib';

import firebase from 'firebase/app';
import 'firebase/auth';

const { width } = Dimensions.get('window')

async function resetPassword(emailToReset) {
  await firebase.auth().sendPasswordResetEmail(emailToReset)
    .then(function() {
      // Password reset email sent.
      Toast.success(`An email has been sent to ${emailToReset} with instructions.`);
    })
    .catch(function(error) {
      // Error occurred. Inspect error.code.
      var errorCode = error.code;
      var errorMessage = error.message;
      Toast.fail(errorMessage);
    });
}

function LoginScreen(props){
    const { register, setValue, handleSubmit, errors } = useForm();
    const [ loading, setLoading ] = React.useState(false);

    const goToForgotPassword = () => {
        props.navigation.navigate('Forgot Password')
    }

    const forgotPassword = () => {
        Modal.prompt(
          'Reset Password', //title
          'Enter your email address', //message
          [
            { text: 'Cancel', onPress: () => console.log('Reset Password Cancelled')},
            { text: 'Reset', onPress: (emailReset) => resetPassword(emailReset.replace(/\s/g,'').toLowerCase()) },
          ],
          'default', //type
          null, //defaultValue
          [null] //value handlers
          // onBackHandler
        );
    };

    const onSubmit = async data => {
        setLoading(true);

        // DEV REMOVE FOR PRODUCTION
        // const { email, password } = data;
        const email = 'andrew@3wp.io';
        const password = '212121';
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(function() {
                return firebase.auth().signInWithEmailAndPassword(email, password)
                  .then(function(res) {
                    console.log('Logged In');
                    props.navigation.navigate('Home');
                  })
                  .catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(errorMessage);
                    setLoading(false);
                  })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);
                setLoading(false);
            });
        })
        
      };
        return (
            <LinearGradient colors={['#7c93cd', '#8473b7']} style={[StyleSheet.absoluteFillObject]}>
                <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
                    <View style={styles.wrapper}>
                        <View style={styles.topBlock}>
                            <Image source={require('../assets/images/gatepass.png')} style={styles.logo} />
                            <Text allowFontScaling={false} style={styles.pageDetail}>Log-in</Text>
                        </View>
                        <View style={styles.middleBlock}>
                            <View style={[styles.inputBorders, styles.SectionStyle]}>
                                <Image source={require('../assets/images/userIcon.png')} style={{width: resFont(25),
                                                    height: resFont(25),
                                                    resizeMode: 'contain'}}/>
                                    <TextInput 
                                        style={styles.customInput} 
                                        placeholder='Email'
                                        placeholderTextColor='#000' 
                                        name="email"
                                        ref={register({ name: 'email'}, { required: false })}
                                        onChangeText={text => setValue('email', text.replace(/\s/g,''), true)}
                                    />
                                    {errors.email && <Text style={{color: 'red', marginHorizontal: 8}}>Required</Text>}
                            </View>
                            <View style={[styles.inputBorders, styles.SectionStyle]}>
                                <Image source={require('../assets/images/lock.png')} style={{width: resFont(25),
                                                    height: resFont(25),
                                                    resizeMode: 'contain'}}/>
                                    <TextInput 
                                        secureTextEntry={true}
                                        style={styles.customInput} 
                                        placeholder='Password' placeholderTextColor='#000'
                                        name="password"
                                        ref={register({ name: 'password'}, { required: false })}
                                        onChangeText={text => setValue('password', text, true)}
                                    />
                                    {errors.password && <Text style={{color: 'red', marginHorizontal: 8}}>Required</Text>}
                            </View>
                            <TouchableOpacity onPress={forgotPassword}>
                                <Text allowFontScaling={false} style={styles.forgotPwd}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bottomContainer}>
                            <TouchableOpacity style={styles.customBtn} onPress={handleSubmit(onSubmit)}>
                                <Text allowFontScaling={false} style={styles.btnText}>
                                {loading ? (<ActivityIndicator color="#fff" />) : 'Login' }
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.termsBlock}>
                                <Text allowFontScaling={false} style={styles.termsText}>By logging in, you agree to our Terms and Conditions</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        )
}

export default LoginScreen; 

const styles = StyleSheet.create({
    wrapper: {
        width: resWidth(89),
        flex: 1
    },
    topBlock: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: resHeight(10),
        marginBottom: resHeight(2.5)
    },
    middleBlock: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: resHeight(2.5)
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: resHeight(2.5)
    },
    textCenter: {
        textAlign: 'center'
    },
    inputBorders: {
        borderColor: '#ccc',
        backgroundColor: '#fff',
        borderWidth: 1,
        height: resHeight(8),
        paddingLeft: resWidth(3),
        borderRadius: 5,
        width: '100%',
        marginBottom: resHeight(2.5)
    },
    floatTextRight: {
        textAlign: 'right'
    },
    whiteText: {
        color: '#fff'
    },
    forgotPwd: {
        fontFamily: 'josefin-sans-semi-bold',
        fontSize: resFont(15),
        color: '#fff',
        textAlign: 'right'
    },
    termsText: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'josefin-sans-reg',
        fontSize: resFont(11),
    },
    termsBlock: {
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        paddingBottom: 3,
        alignSelf: 'center'
    },
    customInput: {
        flex: 1,
        paddingLeft: resWidth(5),
        fontSize: resFont(15),
        fontFamily: 'josefin-sans-reg'
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    customBtn: {
        width: '100%',
        backgroundColor: '#5666ba',
        height: resHeight(8),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: resHeight(2.5)
    },
    btnText: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'josefin-sans-reg',
        fontSize: resFont(15)
    },
    logo: {
        width: resWidth(65),
        height: resHeight(9),
        resizeMode: 'contain'
    },
    pageDetail: {
        fontFamily: 'josefin-sans-semi-bold',
        fontSize: resFont(28),
        color: '#fff',
        marginTop: resHeight(1)
    },
})