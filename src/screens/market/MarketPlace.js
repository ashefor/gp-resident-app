import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, SafeAreaView, TouchableOpacity, TextInput, Image, Modal } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { scaleValue, translateX } from '../../functions/toggleDrawer';
import Header from '../../components/Header';

import { LinearGradient } from 'expo-linear-gradient';
import { resHeight, resFont, resWidth } from '../../utils/utils';

class MarketPlace extends Component {
    constructor(props) {
        super(props)
        this.state = {
            scale: scaleValue,
            opacity: new Animated.Value(1),
            translateY: new Animated.Value(1),
            translateX: translateX,
        }
    }
    render(){
        const { navigation } = this.props;
        return (
            <Animated.View
                style={[
                    { transform: [{ scale: this.state.scale }, { translateX: this.state.translateX }], opacity: this.state.opacity },
                    StyleSheet.absoluteFill]}>
                {/* <LinearGradient colors={['#fff', '#fff']} style={[StyleSheet.absoluteFillObject]}>
                    <SafeAreaView style={{flex: 1}}>
                        <View style={styles.container}>
                            <Header navigation={navigation} goBack='Home' />
                            <View style={{
                                flexDirection: 'row',
                                backgroundColor: 'white',
                                borderColor: '#ECECEC',
                                borderWidth: 1, 
                                alignItems: 'center', 
                                height: resHeight(7), 
                                width: resWidth(89), 
                                alignSelf: 'center', 
                                borderRadius: 5, 
                                paddingHorizontal: resWidth(3),
                                marginBottom: resHeight(1),
                                shadowOffset: {
                                    width: 0,
                                    height: 5,
                                },
                                shadowOpacity: 0.1,
                                shadowRadius: 2,
                                elevation: 1,
                            }}>
                                <Image source={require('../../assets/images/filter.png')} style={{width: resFont(25),
                                                    height: resFont(25),
                                                    resizeMode: 'contain'}}/>
                                <TextInput placeholder='Filter'
                                    placeholderTextColor='#8A8AB5'
                                    style={{ flex: 1,
                                     paddingHorizontal: 
                                     resWidth(3), 
                                     fontSize: resFont(15),
                                     height: '100%', 
                                     fontFamily: 'josefin-sans-reg' }} />
                                <Feather name='chevron-down' color='#8A8AB5' size={resFont(25)} />
                            </View>
                            <ScrollView style={{ flex: 1, marginBottom: resHeight(0.65) }}>
                                <View style={{ flex: 1, marginBottom: resHeight(1) }}>
                                    <View style={[styles.tabsContainer, { justifyContent: 'center' }]}>
                                        <Text allowFontScaling={false} style={styles.sectionText}>Latest</Text>
                                    </View>
                                </View>
                                <View style={{marginBottom: resHeight(1) }}>
                                    <View style={[styles.tabsContainer, { justifyContent: 'center' }]}>
                                        <Text allowFontScaling={false} style={styles.sectionText}>Older</Text>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                        </SafeAreaView>
                </LinearGradient> */}
            </Animated.View>
        )
    }
}

export default MarketPlace;

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
        color: '#222455',
        fontFamily: 'josefin-sans-semi-bold',
        fontSize: resFont(18),
        width: resWidth(89),
        alignSelf: 'center'
    },
})