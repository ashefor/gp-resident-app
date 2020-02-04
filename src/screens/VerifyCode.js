import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import SafeAreaView from 'react-native-safe-area-view';
import { resWidth, resHeight, resFont } from '../utils/utils';
import Header from '../components/Header';



export default class VerifyCode extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {navigation} = this.props
        return (
            <LinearGradient colors={['#7c93cd', '#8473b7']} style={[StyleSheet.absoluteFillObject]}>
                <SafeAreaView style={{ flex: 1, alignItems: 'center' }}>
                    <Header navigation={navigation} />
                    <View style={styles.wrapper}>
                        <View style={styles.topBlock}>
                            <Image source={require('../assets/images/gatepass.png')} style={styles.logo} />
                            <Text allowFontScaling={false} style={styles.pageDetail}>Enter verification code</Text>
                        </View>
                        <View style={styles.middleBlock}>
                            <View style={[styles.inputBorders, styles.SectionStyle]}>
                                <TextInput style={styles.customInput}
                                    placeholder='Verification Code'
                                    placeholderTextColor='#000' />
                            </View>
                            <View>
                                <Text allowFontScaling={false} style={styles.verifIns}>We have sent you an SMS and an Email with the code</Text>
                            </View>
                        </View>
                        <View style={styles.bottomContainer}>
                            <TouchableOpacity style={styles.customBtn} >
                                <Text allowFontScaling={false} style={styles.btnText}>Submit</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.termsBlock}>
                                <Text allowFontScaling={false} style={styles.termsText}>By clicking this button, you agree to the GatePass Privacy Policy and Terms and Conditions</Text>
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
        // padding: 20,
        height: resHeight(9),
        borderRadius: 5,
        width: '100%',
        marginBottom: resHeight(2.5)
    },
    verifIns: {
        fontFamily: 'josefin-sans-light',
        fontSize: resFont(15),
        color: '#fff',
        textAlign: 'center',
        alignSelf: 'center',
        width: resWidth(55)
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
        fontSize: resFont(15),
        textAlign: 'center',
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
        fontFamily: 'josefin-sans-light',
        fontSize: resFont(19),
        color: '#fff',
        marginTop: resHeight(1)
    },
    horizontalLine: {
        borderColor: '#fff',
        marginTop: 5,
        backgroundColor: '#fff',
        borderWidth: 0.3
    }
})