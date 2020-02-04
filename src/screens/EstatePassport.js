import React, { Component } from 'react';
import {Text, View, Animated, SafeAreaView, StyleSheet, Dimensions, TouchableWithoutFeedback} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {scaleValue, translateX} from '../functions/toggleDrawer';
import Header from '../components/Header';
import FloatingButton from '../components/FloatingButton'
import Button from '../components/Button';
import { resWidth, resFont, resHeight } from '../utils/utils';

export default class EstatePassport extends Component{
    constructor(props){
        super(props);
        this.state = {
            scale: scaleValue,
            opacity: new Animated.Value(1),
            translateY: new Animated.Value(1),
            translateX: translateX,
        }
    }
    render() {
        const {navigation} = this.props
        return (
            <Animated.View style={[
                { transform: [{ scale: this.state.scale }, { translateX: this.state.translateX }] },
                StyleSheet.absoluteFill]}>

                <LinearGradient colors={['#7B96CF', '#7E89C6', '#fff', '#fff']} style={[StyleSheet.absoluteFill]}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={styles.container}>
                        <View style={styles.top}>
                                <LinearGradient colors={['#7B96CF', '#7E89C6', '#866DB3']} style={{ flex: 1, }}>
                                    <Header navigation={navigation} Cancel='Home' textColor='#fff' backColor='#fff' />
                                </LinearGradient>
                            </View>
                            <View style={{flex: 2.5}}>
                            <View style={styles.uploadcontainer}>
                                    <TouchableWithoutFeedback>
                                        <View style={styles.uploadBtn}>
                                            <Text allowFontScaling={false}    style={styles.uploadBtnText}>Add Photo</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <View style={styles.personCard}>
                                        <View style={styles.personMeta}>
                                        <Text allowFontScaling={false}    style={styles.person}>
                                            Mr Bankole Isaboss sha
                                        </Text>
                                        <Text allowFontScaling={false}    style={styles.address}>
                                        30 Mobolaji Johnson Street
                                        </Text>
                                        <Text allowFontScaling={false}    style={styles.address}>
                                        Adekunle, Surulere
                                        </Text>
                                        </View>
                                        <View style={styles.hr}/>
                                        <View style={styles.code}>
                                            <Text allowFontScaling={false}    style={styles.userCode}>
                                                J9MS20
                                            </Text>
                                        </View>
                                    </View>
                                   <View style={{width: '60%', alignSelf: 'center', bottom: resHeight(-50)}}>
                                   <Button 
                                    title='Edit Profile'
                                    backgroundColor='#5766BA'
                                    textColor='#fff'
                                    />
                                   </View>
                                </View>
                            </View>
                            <FloatingButton style={{ bottom: resHeight(1), alignSelf: 'center', right: resWidth(5.5) }} />
                        </View>
                        </SafeAreaView>
                        </LinearGradient>
                    </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white'
    },
    top: {
        flex: 1,
        overflow: 'hidden', 
        borderBottomLeftRadius: 10, 
        borderBottomRightRadius: 10 
    },
    uploadcontainer: {
        position: 'absolute',
        width: '100%',
        top: resHeight(-16)
    },
    uploadBtn: {
        backgroundColor: '#D8D8D8',
        width: resWidth(20),
        height: resWidth(20),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#fff',
        borderWidth: 4,
        borderRadius: resWidth(20)/ 2,
        elevation: 3
    },
    uploadBtnText: {
        color: '#fff',
        fontSize: resFont(11),
        fontFamily: 'josefin-sans-semi-bold'
    },
    personCard: {
        // height: resHeight(30), 
        // paddingVertical: resHeight(7),
        position: 'absolute',
        top: resWidth(20)/ 2, 
        zIndex: -1, 
        backgroundColor: 'white', 
        width: resWidth(89), 
        borderColor: 'rgba(0,0,0,.05)',
        borderWidth: 1,
        alignSelf: 'center' ,
        borderRadius: 10,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    personMeta: {
        marginTop: resHeight(2.5), 
        flex: 1,
        paddingTop: resWidth(20)/ 2,
        paddingBottom: resWidth(20)/ 4,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    person: {
        fontSize: resFont(20),
        color: '#313450',
        fontFamily: 'josefin-sans-semi-bold'
    },
    address: {
        fontSize: resFont(12),
        color: '#898A8F',
        fontFamily: 'josefin-sans-reg'
    },
    hr: {
        height: 1.5,
        backgroundColor: '#BAC0CB',
        marginTop: resHeight(1.5)
    },
    code: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
        // alignSelf: 'center'
        paddingVertical: resWidth(20)/ 4
    },
    userCode: {
        color: '#65658A',
        fontSize: resFont(34),
        alignSelf: 'center',
        fontFamily: 'josefin-sans-reg'
    }
})