import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { withNavigationFocus } from 'react-navigation';
import { scaleValue, translateX } from '../../functions/toggleDrawer'
import Header from '../../components/Header';
import { Feather } from '@expo/vector-icons';

import { resHeight, resFont, resWidth } from '../../utils/utils';

const History = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: resWidth(75), borderBottomColor: '#BAC0CB', borderBottomWidth: resHeight(0.05), height: resHeight(7), alignSelf: 'center', alignItems: 'center' }}>
        <View style={{ justifyContent: 'center' }}>
            <Text allowFontScaling={false}
                style={{
                    color: '#65658A',
                    fontFamily: 'josefin-sans-semi-bold',
                    fontSize: resFont(11)
                }}
            >
                Jan. 20, 2020
            </Text>
        </View>
        <View>
            <Text allowFontScaling={false}
                style={{
                    color: '#65658A',
                    fontFamily: 'josefin-sans-bold',
                    fontSize: resFont(9)
                }}
            >
                Checked In:
            </Text>
            <Text allowFontScaling={false}
                style={{
                    color: '#222455',
                    fontFamily: 'josefin-sans-reg',
                    fontSize: resFont(9)
                }}
            >
                10:30am
            </Text>
        </View>
        <View>
            <Text allowFontScaling={false}
                style={{
                    color: '#65658A',
                    fontFamily: 'josefin-sans-bold',
                    fontSize: resFont(9)
                }}
            >
                Checked Out:
            </Text>
            <Text allowFontScaling={false}
                style={{
                    color: '#222455',
                    fontFamily: 'josefin-sans-reg',
                    fontSize: resFont(9)
                }}
            >
                6:00pm
            </Text>
        </View>
    </View>
)
class StaffHistory extends Component {
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
        const { navigation } = this.props;
        const { state: { params: { item } } } = navigation;
        console.log(item);
        return (
            <Animated.View
                style={[
                    { transform: [{ scale: this.state.scale }, { translateX: this.state.translateX }], opacity: this.state.opacity },
                    StyleSheet.absoluteFill]}>
                <LinearGradient colors={['#fff', '#fff']} style={[StyleSheet.absoluteFillObject]}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={styles.container}>
                            <Header navigation={navigation} />
                            <View style={{ flex: 1 }}>
                                <View style={{ width: resWidth(89), alignSelf: 'center' }}>
                                    <View style={[styles.customCard, { backgroundColor: '#5766BA' }]}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                                                <View>
                                                    <Text allowFontScaling={false} style={styles.cardTitle}>{item.name}</Text>

                                                </View>
                                                <View style={{ justifyContent: 'center' }}>
                                                    <Text allowFontScaling={false} style={styles.cardSubtitle}>{item.type}</Text>
                                                </View>
                                            </View>
                                            <View style={{ alignItems: 'flex-end', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                                <View style={styles.cardBody}>
                                                    <Text allowFontScaling={false} style={styles.cardContent}>{item.code}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{marginTop: resHeight(2)}}>
                                    <View style={[styles.tabsContainer, { justifyContent: 'center' }]}>
                                        <Text allowFontScaling={false} style={styles.sectionText}>History</Text>
                                    </View>
                                    <ScrollView >
                                        <History />
                                        <History />
                                        <History />
                                        <History />
                                        <History />
                                        <History />
                                        <History />
                                        <History />
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


export default withNavigationFocus(StaffHistory)

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

    customCard: {
        width: '100%',
        borderRadius: 5,
        padding: resHeight(2),
        justifyContent: 'center',
        height: resHeight(15),
        marginTop: resHeight(1.25),
    },
    cardTitle: {
        fontSize: resFont(15),
        fontFamily: 'josefin-sans-semi-bold',
        color: '#fff',
    },
    cardSubtitle: {
        fontSize: resFont(14),
        textTransform: 'capitalize',
        fontFamily: 'josefin-sans-reg',
        color: '#fff',
        opacity: 0.8
    },
    cardBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: resHeight(1.25)
    },
    cardContent: {
        fontSize: resFont(21),
        fontFamily: 'josefin-sans-semi-bold',
        color: '#fff',
        marginTop: resHeight(1.5)
    },
    cardAction: {
        backgroundColor: '#fff',
        borderRadius: 5,
        height: resHeight(4.5),
        width: resWidth(16.5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardBtnText: {
        color: '#65658A',
        fontFamily: 'josefin-sans-reg',
        fontSize: resFont(12),
    },
})