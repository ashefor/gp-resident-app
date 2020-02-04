import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, Modal } from 'react-native';
import Textarea from '../../components/Textarea';
import Button from '../../components/Button';
import { Rating, AirbnbRating } from 'react-native-elements';

import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-navigation';
import Header from '../../components/Header';
import { resWidth, resHeight, resFont } from '../../utils/utils';

const { width } = Dimensions.get('window')
export default class ComplaintReview extends Component {

    handleWriteReview = (complaint) => {
        // return (
        //     <Modal
        //     visible={true}
        //     >Modal</Modal>
        // )
        console.log(complaint)
    }
    ratingCompleted = (rating) => {
        console.log("Rating is: " + rating)
    }


    render() {
        const { navigation } = this.props;
        const { state: { params: { complaint } } } = navigation;
        return (
            <LinearGradient colors={['#fff', '#fff']} style={[StyleSheet.absoluteFillObject]}>
                <SafeAreaView style={StyleSheet.absoluteFillObject}>
                    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                        <Header navigation={navigation} title='Complaints' />
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <View style={{ width: resWidth(89), alignItems: 'center', flex: 1 }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text allowFontScaling={false}
                                        style={{ marginVertical: resHeight(3), fontFamily: 'josefin-sans-semi-bold', fontSize: resFont(17), color: '#222455' }}>
                                        Rating
                        </Text>
                                    <View>
                                        <AirbnbRating
                                            showRating={false}
                                            onFinishRating={this.ratingCompleted}
                                            defaultRating={0} />
                                    </View>
                                    <Text allowFontScaling={false}
                                        style={{
                                            marginVertical: resHeight(5),
                                            width: resWidth(75),
                                            fontSize: resFont(15),
                                            textAlign: 'center',
                                            fontFamily: 'josefin-sans-reg',
                                            color: '#8A98BA'
                                        }}>
                                        We are always improving our services and appreciate your feedback greatly
                        </Text>
                                    <Textarea placeholder='Leave a comment' style={{ borderColor: '#8A98BA' }} />
                                    <View style={{ marginVertical: resHeight(5), alignItems: 'center' }}>
                                        <Button
                                            title='Submit your review'
                                            textColor='#fff'
                                            backgroundColor='#5766BA'
                                            style={{ width: resWidth(55) }}
                                            onPress={() => navigation.navigate('Complaint Review', { complaint: complaint })} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        paddingVertical: resWidth(4),
        paddingHorizontal: resWidth(5),
        borderColor: '#ECECEC',
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
        width: '100%',
        marginVertical: resHeight(2),
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cardTitle: {
        fontSize: resFont(16),
        fontFamily: 'josefin-sans-reg',
        color: '#313450',
        marginBottom: resHeight(0.65)
    },
    cardSubtitle: {
        fontSize: resFont(10),
        fontFamily: 'josefin-sans-bold',
        color: '#898A8F',
    },
    complaintColor: {
        width: resWidth(3),
        height: resWidth(3),
        borderRadius: resWidth(3) / 2,
    },
    subcontent: {
        flexDirection: 'row',
        marginTop: resHeight(1.5),
        marginBottom: resHeight(2.5),
    },
    cardContent: {
        width: '50%',
    },
    cardContentText1: {
        fontSize: resFont(11),
        fontFamily: 'josefin-sans-reg',
        color: '#222455'
    },
    cardContentText2: {
        fontSize: resFont(11),
        fontFamily: 'josefin-sans-light',
        color: '#222455',
        marginTop: resHeight(0.75)
    },
    bottomContainer: {
        marginTop: resHeight(6),
        width: resWidth(55),
    },
})