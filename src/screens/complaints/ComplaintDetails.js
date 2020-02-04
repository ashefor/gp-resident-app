import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, Modal } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-navigation';
import Header from '../../components/Header';
import { resWidth, resHeight, resFont } from '../../utils/utils';

const { width } = Dimensions.get('window')
export default class ComplaintDetails extends Component {

    handleWriteReview = (complaint) => {
        // return (
        //     <Modal
        //     visible={true}
        //     >Modal</Modal>
        // )
        console.log(complaint)
    }
    render() {
        const { navigation } = this.props;
        const {state: {params : {complaint}}} = navigation;
        return (
            <LinearGradient colors={['#fff', '#fff']} style={[StyleSheet.absoluteFillObject]}>
                <SafeAreaView style={StyleSheet.absoluteFillObject}>
                    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                        <Header navigation={navigation} title='Complaints' />
                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                            <View style={{ width: resWidth(89), alignItems: 'center', flex: 1 }}>
                                <View style={styles.card}>
                                    <View style={styles.cardHeader}>
                                        <View style={{ marginRight: resWidth(5) }}>
                                            <Text allowFontScaling={false} style={styles.cardTitle}>
                                                {complaint.title}
                                        </Text>
                                            <Text allowFontScaling={false} style={styles.cardSubtitle}>
                                            Jan. 2, 2020
                                        </Text>
                                        </View>
                                        <View
                                            style={[styles.complaintColor,
                                            { backgroundColor: complaint.status === 'pending' ? '#FF0000' : complaint.status === 'resolved' ? '#34D881' : '#FFB100' }]}
                                        />
                                    </View>
                                    <View style={{ height: resHeight(0.05), backgroundColor: '#707070', marginVertical: resHeight(1.5) }} />
                                    <View>
                                        <View style={styles.subcontent}>
                                            <View style={[styles.cardContent]}>
                                                <Text allowFontScaling={false}
                                                    style={styles.cardContentText1}>
                                                    Category
                                            </Text>
                                                <Text allowFontScaling={false}
                                                    style={styles.cardContentText2}>
                                                    Noise
                                            </Text>
                                            </View>
                                            <View style={[styles.cardContent]}>
                                                <Text allowFontScaling={false}
                                                    style={styles.cardContentText1}>
                                                    Priority
                                            </Text>
                                                <Text allowFontScaling={false}
                                                    style={styles.cardContentText2}>
                                                    High
                                            </Text>
                                            </View>
                                        </View>
                                        <View style={styles.subcontent}>
                                            <View style={[styles.cardContent]}>
                                                <Text allowFontScaling={false}
                                                    style={styles.cardContentText1}>
                                                    Issue Time/Date:
                                            </Text>
                                                <Text allowFontScaling={false}
                                                    style={styles.cardContentText2}>
                                                    01-01-20
                                            </Text>
                                            </View>
                                            <View style={[styles.cardContent]}>
                                                <Text allowFontScaling={false}
                                                    style={styles.cardContentText1}>
                                                    Status
                                            </Text>
                                                <Text allowFontScaling={false}
                                                    style={styles.cardContentText2}>
                                                    Completed
                                            </Text>
                                            </View>
                                        </View>
                                        <View style={styles.subcontent}>
                                            <View style={[styles.cardContent]}>
                                                <Text allowFontScaling={false}
                                                    style={styles.cardContentText1}>
                                                    Additional Details:
                                            </Text>
                                                <Text allowFontScaling={false}
                                                    style={styles.cardContentText2}>
                                                    -
                                            </Text>
                                            </View>
                                            <View style={[styles.cardContent]}>
                                                <Text allowFontScaling={false}
                                                    style={styles.cardContentText1}>
                                                    Completion Date:
                                            </Text>
                                                <Text allowFontScaling={false}
                                                    style={styles.cardContentText2}>
                                                    -
                                            </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ height: resHeight(0.05), backgroundColor: '#707070', marginVertical: resHeight(1.5) }} />
                                    <View>
                                        <Text 
                                        allowFontScaling={false}
                                        style={styles.cardContentText1}>
                                            Comments(0)
                                            </Text>
                                        <View style={{ marginVertical: resHeight(2), alignItems: 'center' }}>
                                            <Button
                                                title='Write a Comment'
                                                textColor='#fff'
                                                backgroundColor='#8A8AB5'
                                                style={{ width: resWidth(55) }}
                                                onPress={() => navigation.navigate('Complaint Review', {complaint: complaint})} />
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.bottomContainer}>
                                    <Button
                                        title='Mark as Complete'
                                        textColor='#fff'
                                        backgroundColor='#5766BA' />
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