import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableWithoutFeedback, Image, StyleSheet, StatusBar, Dimensions, Animated, Easing, ImageBackground, Platform, ActivityIndicator } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from 'galio-framework';

import FloatingButton from '../../components/FloatingButton';
import { CommunitySpotlightCarousel, CommunityCentre } from '../../components/Carousel';
import BottomButtonsCommunityCentre from '../../components/BottomButtonsCommunityCentre';
import { scaleValue, translateX } from '../../functions/toggleDrawer';
import Header from '../../components/Header';
import { resFont, resWidth, resHeight } from '../../utils/utils';

import firebase from "firebase";
import firestore from "firebase/firestore";

const { height, width } = Dimensions.get('screen')

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scale: scaleValue,
            opacity: new Animated.Value(1),
            translateY: new Animated.Value(1),
            translateX: translateX,
            incomingGuestsCount: '',
            loading: false
        }
    }

    async componentDidMount() {
        this.setState({
            loading: true
        });
        const pThis = this;
        var db = firebase.firestore();
        var incomingGuests = [];
        const user = await firebase.auth().onAuthStateChanged(async function(user) {
          if (user) {
            // User is signed in.
            const { uid } = user;
             await db.collection("gatepasses")
                .where("revoked", "==", false )
                .where("uid", "==", uid )
                .get()
                .then(function(querySnapshot) {
                   querySnapshot.forEach(function(doc) {
                        // doc.data() is never undefined for query doc snapshots
                        // console.log(doc.id, " => ", doc.data());
                        incomingGuests.push({
                            id: doc.id,
                            ...doc.data(),
                        });
                    });
                })
                .catch(function(error) {
                    console.log("Error getting documents: ", error);
                });

                const incomingGuestsCount =  incomingGuests.length;
                pThis.setState({ incomingGuestsCount });
          } else {
            // No user is signed in.
          }
        });
        this.setState({
            loading: false
        });
    }
    
    render() {
        const { navigation } = this.props;
        const { incomingGuestsCount, loading } = this.state;
        
        return (
            <Animated.View
                style={[
                    { transform: [{ scale: this.state.scale }, { translateX: this.state.translateX }], opacity: this.state.opacity },
                    styles.animatedContainer]}>
                <LinearGradient colors={['#fff', '#fff']} style={[StyleSheet.absoluteFill]}>
                    <SafeAreaView style={{ flex: 1 }}>

                        <View style={[styles.page]}>
                            <Header navigation={navigation} title='House D2' />
                                <View style={styles.container}>
                                 <View
                                    style={{
                                        flex:1,
                                    }}
                                >
                                    <TouchableWithoutFeedback 
                                        onPress={() => {
                                            this.props.navigation.navigate("Guests", {
                                                previous: 'Home',
                                                back: true,
                                            })
                                        }}
                                        >
                                            <Card
                                              flex
                                              borderless
                                              shadow={true}
                                              style={styles.imgOverlay}
                                            >
                                                <View 
                                                    style={{ 
                                                        flex: 1,
                                                        top: resHeight(-4),
                                                        justifyContent: 'space-between', 
                                                        alignItems: 'center',
                                                        flexDirection: 'row',
                                                        marginHorizontal: resWidth(4) 
                                                    }}
                                                >
                                                    <Text 
                                                        allowFontScaling={false} 
                                                        style={styles.house}
                                                    >
                                                        Guests
                                                    </Text>
                                                    <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Create Gatepass", { previous: 'Home' })}>
                                                         <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate("Create Gatepass", { previous: 'Home' })}>
                                                        <View style={[styles.addActionBtns, { backgroundColor: '#6271C6', }]}>
                                                        <Feather name='user-plus' color='#fff' size={resFont(21)} />
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                    </TouchableWithoutFeedback>
                                                </View>
                                                <View 
                                                    style={{ 
                                                        flex: 1, 
                                                        justifyContent: 'flex-end', 
                                                        margin: resHeight(3) 
                                                    }}
                                                >
                                                    <View 
                                                        style={{ 
                                                            flexDirection: 'row', 
                                                            alignItems: 'center' 
                                                        }}
                                                    >
                                                        <View style={styles.guestNum}>
                                                            <Text allowFontScaling={false} style={styles.guestNumText} 
                                                            >
                                                                {loading ? <ActivityIndicator /> : incomingGuestsCount}
                                                            </Text>
                                                        </View>
                                                        <View style={{ marginLeft: 5, alignSelf: 'center' }}>
                                                            <Text allowFontScaling={false} style={styles.guest}>Incoming</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </Card>
                                    </TouchableWithoutFeedback>
                                </View>

                               <View 
                               style={{flex: 3}}>
                               <View
                                >
                                    <View style={styles.spotlight}>
                                        <Text allowFontScaling={false} style={styles.spotlightText}
                                        >
                                            Community Spotlight
                                        </Text>
                                    </View>
                                    <View style={{width: resWidth(89), height: resHeight(20)}}>
                                    <CommunitySpotlightCarousel />
                                    </View>
                                    
                                </View>

                                <View
                                >
                                    <View style={styles.spotlight}>
                                        <Text allowFontScaling={false} style={styles.spotlightText}
                                        >
                                            Community Centre
                                        </Text>
                                    </View>
                                    <BottomButtonsCommunityCentre />
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

export default withNavigationFocus(HomeScreen);

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        width: resWidth(89),
        alignSelf: 'center',
        flex: 1,
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
        flex: 1,
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.16,
        shadowRadius: 2,
        elevation: 3,
        borderWidth: 0.25, 
        borderColor: '#BEBEBE',
        borderWidth: 0.25, 
        borderColor: '#BEBEBE',
    },
    house: {
        color: '#5766BA',
        fontSize: resFont(21),
        fontFamily: 'josefin-sans-bold'
    },
    guestNum: {
        color: 'white',
        borderWidth: 2,
        borderRadius: resHeight(8) / 2,
        borderColor: '#5766BA',
        justifyContent: 'center',
        alignItems: 'center',
        width: resHeight(8),
        height: resHeight(8),
        paddingBottom: Platform.OS === 'android' ? resHeight(1) : 0,
        paddingTop: Platform.OS === 'ios' ? resHeight(.5) : 0
    },
    guestNumText: {
        color: '#5766BA',
        fontSize: resFont(33),
        fontFamily: 'josefin-sans-bold'
    },
    guest: {
        fontSize: resFont(16),
        color: '#5766BA',
        fontFamily: 'josefin-sans-semi-bold'
    },
    addActionBtns: {
        width: resHeight(6),
        height: resHeight(6),
        borderRadius: resHeight(6) / 2,
        marginVertical: resHeight(1),
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.16,
        shadowRadius: 2,
        elevation: 3,
        borderWidth: 0.25, 
        borderColor: '#BEBEBE',
    },
    spotlight: {
        width: '100%',
        alignSelf: 'center',
        marginTop: resHeight(3),
    },
    spotlightText: {
        marginVertical: resHeight(1),
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