import React, { useState, Component } from 'react';
import { StyleSheet, Dimensions, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import SafeAreaView from 'react-native-safe-area-view';
import { resFont, resHeight, resWidth } from '../utils/utils';

const { width } = Dimensions.get('window')

export default class LoginScreen extends Component {
    constructor(props) {
        super(props)
    }

    goToForgotPassword = () => {
        this.props.navigation.navigate('Forgot Password')
    }
    render() {
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
                                <TextInput style={styles.customInput} placeholder='Email'
                                    placeholderTextColor='#000' />
                            </View>
                            <View style={[styles.inputBorders, styles.SectionStyle]}>
                                <Image source={require('../assets/images/lock.png')} style={{width: resFont(25),
                                                    height: resFont(25),
                                                    resizeMode: 'contain'}}/>
                                <TextInput style={styles.customInput} placeholder='Password' placeholderTextColor='#000' />
                            </View>
                            <TouchableOpacity onPress={this.goToForgotPassword}>
                                <Text allowFontScaling={false} style={styles.forgotPwd}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bottomContainer}>
                            <TouchableOpacity style={styles.customBtn} onPress={() => this.props.navigation.navigate('Start')}>
                                <Text allowFontScaling={false} style={styles.btnText}>Login</Text>
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
}

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