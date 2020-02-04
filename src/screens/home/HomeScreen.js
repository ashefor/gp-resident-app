import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, Image, StyleSheet, StatusBar, Dimensions, Animated, Easing, ImageBackground, Platform } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import FloatingButton from '../../components/FloatingButton';
import { CommunitySpotlightCarousel, CommunityCentre } from '../../components/Carousel';
import { scaleValue, translateX } from '../../functions/toggleDrawer';
import Header from '../../components/Header';
import { resFont, resWidth, resHeight } from '../../utils/utils'
const { height, width } = Dimensions.get('screen')

class HomeScreen extends Component {
    constructor(props) {
        super(props);
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
                    styles.animatedContainer]}>
                <LinearGradient colors={['#fff', '#fff']} style={[StyleSheet.absoluteFill]}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={[styles.page]}>
                            <Header navigation={navigation} title='Wasiu Alade Estate' />
                            <View style={styles.container}>
                                <ImageBackground source={require('../../assets/images/homeImg.png')}
                                    imageStyle={{ borderRadius: 5 }}
                                    style={styles.imgBckGd}>
                                    <LinearGradient style={styles.imgOverlay} colors={['rgba(45, 45, 45, 0.45)', 'rgba(17, 17, 17, 0.7)',]}>
                                        <View style={{ flex: 1, width: '50%', margin: resHeight(3) }}>
                                            <View style={{ flex: 0.5, justifyContent: 'flex-start' }}>
                                                <Text allowFontScaling={false} style={styles.house}>House D2</Text>
                                            </View>
                                            <View style={{ flex: 0.5, justifyContent: 'flex-end', }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={styles.guestNum}>
                                                        <Text allowFontScaling={false} style={styles.guestNumText} >3</Text>
                                                    </View>
                                                    <View style={{ marginLeft: 5, alignSelf: 'center' }}>
                                                        <Text allowFontScaling={false} style={styles.guest}>Incoming</Text>
                                                        <Text allowFontScaling={false} style={styles.guest}>Guests</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </LinearGradient>
                                    <View style={{ position: 'absolute', right: resWidth(-4), bottom: resHeight(3) }}>
                                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Create Gatepass", { previous: 'Home' })}>
                                            <View style={[styles.addActionBtns, { backgroundColor: '#34D881', }]}>
                                                <Feather name='user-plus' color='#fff' size={resFont(25)} />
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Estate Passport", { previous: 'Home' })}>
                                            <View style={[styles.addActionBtns, { backgroundColor: '#5766BA' }]}>
                                                <Image source={require('../../assets/images/passport.png')} style={{
                                                    width: resFont(25),
                                                    height: resFont(25),
                                                    resizeMode: 'contain'
                                                }} />
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                </ImageBackground>
                                <View style={styles.spotlight}>
                                    <Text allowFontScaling={false} style={styles.spotlightText}>Community Spotlight</Text>
                                </View>
                                <CommunitySpotlightCarousel />
                                <View style={styles.spotlight}>
                                    <Text allowFontScaling={false} style={styles.spotlightText}>Community Centre</Text>
                                </View>
                                <CommunityCentre navigation={navigation} />
                                <FloatingButton style={{ bottom: resHeight(1), alignSelf: 'center', right: 0 }} />
                            </View>
                        </View>
                    </SafeAreaView>
                </LinearGradient>
            </Animated.View>
        )
    }
}

export default withNavigationFocus(HomeScreen);

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        width: resWidth(89),
        alignSelf: 'center',
        flex: 1
    },
    animatedContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    MainContainer: {
        flex: 1,
        height: height,
    },
    imgBckGd: {
        width: '100%',
        alignSelf: 'center',
        height: resHeight(30),
        marginBottom: resHeight(1)
    },
    imgOverlay: {
        width: '100%',
        height: '100%',
        borderRadius: 5
    },
    house: {
        color: '#fff',
        fontSize: resFont(23),
        fontFamily: 'josefin-sans-bold'
    },
    guestNum: {
        color: 'white',
        borderWidth: 2,
        borderRadius: resHeight(8) / 2,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        width: resHeight(8),
        height: resHeight(8),
        paddingBottom: Platform.OS === 'android' ? resHeight(1) : 0,
        paddingTop: Platform.OS === 'ios' ? resHeight(.5) : 0
    },
    guestNumText: {
        color: '#fff',
        fontSize: resFont(33),
        fontFamily: 'josefin-sans-bold'
    },
    guest: {
        fontSize: resFont(16),
        color: '#fff',
        fontFamily: 'josefin-sans-semi-bold'
    },
    addActionBtns: {
        width: resHeight(8),
        height: resHeight(8),
        borderRadius: resHeight(8) / 2,
        marginVertical: resHeight(1),
        alignItems: 'center',
        justifyContent: 'center'
    },
    spotlight: {
        width: '100%',
        alignSelf: 'center',
        marginTop: resHeight(2),
        marginBottom: resHeight(1)
    },
    spotlightText: {
        fontSize: resFont(16),
        color: '#222455',
        fontFamily: 'josefin-sans-semi-bold'
    },
    item: {
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
    },
    imageContainer: {
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
    },
    image: {
        resizeMode: 'cover',
    },
    containerCustomStyle: {
        alignSelf: 'center',
    },
})