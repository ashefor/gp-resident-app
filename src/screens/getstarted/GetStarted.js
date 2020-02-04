import React, { Component, Fragment } from 'react';
import { View, Text, StatusBar, Image, ImageBackground, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
const { height, width } = Dimensions.get('window')
import { NavBar } from 'galio-framework';
import { SafeAreaView } from 'react-navigation';
import Header from '../../components/Header';
import { resHeight, resWidth, resFont } from '../../utils/utils';
export default class GetStarted extends Component {
    componentDidMount() {
        StatusBar.setBarStyle('light-content', true)
    }
    render() {
        const {navigation} = this.props
        return (
          <Fragment>
            <LinearGradient style={{flex: 1, position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, right: 0, zIndex: 1}} colors={['rgba(45,45,45,0.5)',  'rgba(114,109,156,0.8)',  'rgba(128,122,178,0.9)','rgba(141,133,198,1)', '#8F7DC1']}>
            <SafeAreaView style={{flex: 1}}>
                <Header navigation={navigation}/>
            <View style={{flex: 4}}>
            <View style={styles.introMsg}>
                        <Text allowFontScaling={false}    style={styles.info1}>Welcome to</Text>
                        <Text allowFontScaling={false}    style={styles.info2}>GatePass</Text>
                        <Text allowFontScaling={false}    style={styles.info3}>Keys to your community</Text>
                        <Text allowFontScaling={false}    style={styles.info3}>
                            GatePass improves communication & management of multi-tenant communities.
                        </Text>
                    </View>
            </View>
            <View style={styles.bottomContainer}>
                    <TouchableOpacity style={styles.customBtn} onPress={() => this.props.navigation.navigate('Get Started')}>
                        <Text allowFontScaling={false}    style={styles.btnText}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            </LinearGradient>
            <ImageBackground source={require('../../assets/images/housing.png')} style={{ width: width, height: resHeight(100), position: 'absolute'}}/>
          </Fragment>
        )
    }
}

const styles = StyleSheet.create({
    introMsg: {
        flex: 1,
        justifyContent: 'flex-end',
        alignSelf: 'center',
        width: resWidth(89),
    },
    info1: {
        fontSize: resFont(28),
        fontFamily: 'josefin-sans-semi-bold',
        color: 'white'
    },
    info2: {
        fontSize: resFont(48),
        fontFamily: 'josefin-sans-semi-bold',
        color: 'white',
        marginBottom: resHeight(2.5)
    },
    info3: {
        fontSize: resFont(15),
        fontFamily: 'josefin-sans-light',
        color: 'white',
        marginBottom: resHeight(2.5),
        width: resWidth(80)
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    customBtn: {
        width: '100%',
        backgroundColor: '#5666ba',
        height: resHeight(8),
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: resHeight(2.5),
        width: resWidth(89)
    },
    btnText: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'josefin-sans-reg',
        fontSize: resFont(15)
    }
})