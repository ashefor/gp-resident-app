import React, { Component } from 'react';
import { View, Text, SafeAreaView, Dimensions, StyleSheet, ScrollView, Animated } from 'react-native';
import IncomingGuest from '../../components/IncomingGuest';
import { scaleValue, translateX } from '../../functions/toggleDrawer';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../../components/Header';
import { resHeight, resWidth, resFont } from '../../utils/utils';

const { width, height } = Dimensions.get('window')
export default class GuestHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allGuests: [
                {
                    name: 'Martin Kenneth',
                    type: 'Staff'
                },
                {
                    name: 'Brandon Keeper',
                    type: 'Staff'
                },
                {
                    name: 'Will Parry',
                    type: 'Staff'
                },
                {
                    name: 'John Kelly',
                    type: 'Staff'
                },
                {
                    name: 'Ikay Gundogan',
                    type: 'Staff'
                },
                {
                    name: 'Paul Pogba',
                    type: 'Staff'
                },
                {
                    name: 'Lionel Messi',
                    type: 'Staff'
                },
                {
                    name: 'Mark Noble',
                    type: 'Staff'
                },
                {
                    name: 'Gabriel Jesus',
                    type: 'Staff'
                }
            ],
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
                        <View style={styles.page}>
                            <Header navigation={navigation} />
                            <View style={styles.container}>
                                <View style={[styles.tabsContainer, { justifyContent: 'center' }]}>
                                    <Text style={styles.sectionText}>Gatepass History</Text>
                                </View>
                                <View style={styles.guestContainer}>
                                    <ScrollView 
                                    showsVerticalScrollIndicator={false}>
                                        {this.state.allGuests.map((guest, index) => <IncomingGuest key={index} guest={guest} />)}
                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                    </SafeAreaView>
                </LinearGradient>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#fff'
    },
    tabsContainer: {
        backgroundColor: 'rgba(87,102,186, 0.1)',
        flexDirection: 'row',
        justifyContent: 'center',
        height: resHeight(6)
    },
    sectionText: {
        color: '#262862',
        fontFamily: 'josefin-sans-semi-bold',
        fontSize: resFont(18),
        width: resWidth(89),
        alignSelf: 'center'
    },
    guestContainer: {
        width: resWidth(89),
        alignSelf: 'center',
        height: resHeight(80)
    }
})