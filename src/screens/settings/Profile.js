import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, SafeAreaView, TouchableOpacity } from 'react-native';
import Accordion from '../../components/Accordion';
import FloatingButton from '../../components/FloatingButton';
import CheckedInGuest from '../../components/CheckedInGuest';
import IncomingGuest from '../../components/IncomingGuest';
import { LinearGradient } from 'expo-linear-gradient';
import { withNavigationFocus } from 'react-navigation';
import { scaleValue, translateX } from '../../functions/toggleDrawer'
import Header from '../../components/Header';
import { Feather } from '@expo/vector-icons';

import { resHeight, resFont, resWidth } from '../../utils/utils';
import Button from '../../components/Button';

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            scale: scaleValue,
            opacity: new Animated.Value(1),
            translateY: new Animated.Value(1),
            translateX: translateX,
        }
    }
 

    render() {
        const { navigation } = this.props
        return (
            <Animated.View
                style={[
                    { transform: [{ scale: this.state.scale }, { translateX: this.state.translateX }], opacity: this.state.opacity },
                    StyleSheet.absoluteFill]}>
                <LinearGradient colors={['#fff', '#fff']} style={[StyleSheet.absoluteFillObject]}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={styles.container}>
                            <Header navigation={navigation} title='Edit Profile' />

                            <View style={{ flex: 1 }}>
                                <View style={{ flex: 2.5 }}>
                                    <View style={[styles.tabsContainer, { justifyContent: 'center' }]}>
                                        <Text allowFontScaling={false} style={styles.sectionText}>Account</Text>
                                    </View>
                                    <View style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center' }}>
                                        <View style={{
                                            width: resWidth(89), alignSelf: 'center', borderColor: '#ECECEC',
                                            borderWidth: 1,
                                            backgroundColor: '#F9F9F9',
                                            borderRadius: 5,
                                            shadowColor: "#000000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 5,
                                            },
                                            shadowOpacity: 0.1,
                                            shadowRadius: 2,
                                            elevation: 1,
                                            borderRadius: 5,
                                        }}>
                                            <TouchableOpacity
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    height: resHeight(7),
                                                    backgroundColor: 'white',
                                                    alignItems: 'center',
                                                    paddingHorizontal: resWidth(3)
                                                }}
                                            >
                                                <Text allowFontScaling={false}
                                                    style={{
                                                        fontSize: resFont(15),
                                                        color: '#3E3F68',
                                                        fontFamily: 'josefin-sans-semi-bold'
                                                    }}
                                                >
                                                    Change Details
                                                </Text>
                                                <Feather name='chevron-right' color='#3E3F68' size={resFont(25)} />
                                            </TouchableOpacity>
                                            <View style={{ height: resHeight(0.1), backgroundColor: '#BAC0CB' }} />
                                            <TouchableOpacity
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    height: resHeight(6.5),
                                                    backgroundColor: 'white',
                                                    alignItems: 'center',
                                                    paddingHorizontal: resWidth(3)
                                                }}
                                            >
                                                <Text allowFontScaling={false}
                                                    style={{
                                                        fontSize: resFont(15),
                                                        color: '#3E3F68',
                                                        fontFamily: 'josefin-sans-semi-bold'
                                                    }}
                                                >
                                                    Change Password
                                                </Text>
                                                <Feather name='chevron-right' color='#3E3F68' size={resFont(25)} />
                                            </TouchableOpacity>
                                            <View style={{ height: resHeight(0.1), backgroundColor: '#BAC0CB' }} />
                                            <TouchableOpacity
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    height: resHeight(6.5),
                                                    backgroundColor: 'white',
                                                    alignItems: 'center',
                                                    paddingHorizontal: resWidth(3)
                                                }}
                                                onPress={()=> navigation.navigate('Emergency Contact')}
                                            >
                                                <Text allowFontScaling={false}
                                                    style={{
                                                        fontSize: resFont(15),
                                                        color: '#3E3F68',
                                                        fontFamily: 'josefin-sans-semi-bold'
                                                    }}
                                                >
                                                    Manage Emergency Contacts
                                                </Text>
                                                <Feather name='chevron-right' color='#3E3F68' size={resFont(25)} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flex: 3, marginBottom: resHeight(1) }}>
                                    <View style={[styles.tabsContainer, { justifyContent: 'center' }]}>
                                        <Text allowFontScaling={false} style={styles.sectionText}>Others</Text>
                                    </View>
                                    <View style={{ backgroundColor: 'white', marginTop: resHeight(3) }}>
                                        <View style={{
                                            width: resWidth(89), alignSelf: 'center', borderColor: '#ECECEC',
                                            borderWidth: 1,
                                            backgroundColor: '#F9F9F9',
                                            borderRadius: 5,
                                            shadowColor: "#000000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 5,
                                            },
                                            shadowOpacity: 0.1,
                                            shadowRadius: 2,
                                            elevation: 1,
                                            borderRadius: 5,
                                        }}>
                                            <TouchableOpacity
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    height: resHeight(6.5),
                                                    backgroundColor: 'white',
                                                    alignItems: 'center',
                                                    paddingHorizontal: resWidth(3)
                                                }}
                                            >
                                                <Text allowFontScaling={false}
                                                    style={{
                                                        fontSize: resFont(15),
                                                        color: '#3E3F68',
                                                        fontFamily: 'josefin-sans-semi-bold'
                                                    }}
                                                >
                                                    FAQs
                                                </Text>
                                                <Feather name='chevron-right' color='#3E3F68' size={resFont(25)} />
                                            </TouchableOpacity>
                                            <View style={{ height: resHeight(0.1), backgroundColor: '#BAC0CB' }} />
                                            <TouchableOpacity
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    height: resHeight(6.5),
                                                    backgroundColor: 'white',
                                                    alignItems: 'center',
                                                    paddingHorizontal: resWidth(3)
                                                }}
                                            >
                                                <Text allowFontScaling={false}
                                                    style={{
                                                        fontSize: resFont(15),
                                                        color: '#3E3F68',
                                                        fontFamily: 'josefin-sans-semi-bold'
                                                    }}
                                                >
                                                    Report Issues
                                                </Text>
                                                <Feather name='chevron-right' color='#3E3F68' size={resFont(25)} />
                                            </TouchableOpacity>
                                            <View style={{ height: resHeight(0.1), backgroundColor: '#BAC0CB' }} />
                                            <TouchableOpacity
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    height: resHeight(6.5),
                                                    backgroundColor: 'white',
                                                    alignItems: 'center',
                                                    paddingHorizontal: resWidth(3)
                                                }}
                                            >
                                                <Text allowFontScaling={false}
                                                    style={{
                                                        fontSize: resFont(15),
                                                        color: '#3E3F68',
                                                        fontFamily: 'josefin-sans-semi-bold'
                                                    }}
                                                >
                                                    Privacy Policy
                                                </Text>
                                                <Feather name='chevron-right' color='#3E3F68' size={resFont(25)} />
                                            </TouchableOpacity>
                                            <View style={{ height: resHeight(0.1), backgroundColor: '#BAC0CB' }} />
                                            <TouchableOpacity
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    height: resHeight(6.5),
                                                    backgroundColor: 'white',
                                                    alignItems: 'center',
                                                    paddingHorizontal: resWidth(3)
                                                }}
                                            >
                                                <Text allowFontScaling={false}
                                                    style={{
                                                        fontSize: resFont(15),
                                                        color: '#3E3F68',
                                                        fontFamily: 'josefin-sans-semi-bold'
                                                    }}
                                                >
                                                    Terms & Conditions
                                                </Text>
                                                <Feather name='chevron-right' color='#3E3F68' size={resFont(25)} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ width: resWidth(89), justifyContent: 'space-between', alignSelf: 'center', marginBottom: resHeight(1) }}>
                                <Button title='Logout' style={{ backgroundColor: '#5766BA', width: resWidth(50) }} />
                                <FloatingButton style={{ bottom: 0, alignSelf: 'center', right: 0 }} />
                            </View>
                        </View>
                    </SafeAreaView>
                </LinearGradient>
            </Animated.View>
        )
    }
}


export default withNavigationFocus(Profile)

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    tabsContainer: {
        backgroundColor: 'rgba(87,102,186, 0.1)',
        flexDirection: 'row',
        height: resHeight(6)
    },
    tabs: {
        backgroundColor: 'transparent',
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabText: {
        color: '#8A8AB5',
        fontSize: resFont(18),
        fontFamily: 'josefin-sans-semi-bold'
    },
    active: {
        backgroundColor: '#65658A',
        height: 4,
        width: '50%'
    },
    sectionTitle: {
        color: 'rgba(34,36,85, 0.5)',
        fontSize: resFont(14),
        fontFamily: 'josefin-sans-semi-bold'
    },
    sectionText: {
        color: 'rgba(34,36,85, 0.5)',
        fontFamily: 'josefin-sans-semi-bold',
        fontSize: resFont(14),
        width: resWidth(89),
        alignSelf: 'center'
    },
})