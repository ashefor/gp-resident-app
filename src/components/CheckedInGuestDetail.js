import React, { Component } from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { resHeight, resWidth, resFont } from '../utils/utils';

const { width } = Dimensions.get('window')
export default class CheckedInGuestDetail extends Component {
    render() {
        const { closeModal, guest, use } = this.props
        return (
            <View style={{ width: resWidth(89), alignSelf: 'center', marginBottom: resHeight(20) }}>
                <View style={[styles.customCard, { backgroundColor: '#5766BA' }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <View>
                                <Text allowFontScaling={false} style={styles.cardTitle}>{guest.name}</Text>
                            </View>
                            <View style={{ justifyContent: 'center' }}>
                                <Text allowFontScaling={false} style={[styles.cardContent, { marginTop: resHeight(0.65) }]}>N8QS80</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
                            <View style={styles.cardBody}>
                                <TouchableOpacity onPress={closeModal}>
                                    <Ionicons name='ios-close-circle' color='white' size={resFont(25)} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', width: '80%' }}>
                        <View style={[styles.chid_children, { paddingRight: 2 }]}>
                            <View style={{ alignItems: 'flex-start', marginVertical: resHeight(1.5) }}>
                                <Text allowFontScaling={false} style={styles.chid_children_header}>Last Checked In:</Text>
                                <Text allowFontScaling={false} style={[styles.chid_children_subheader, { textAlign: 'left' }]}>January 20, 2020 10:30am</Text>
                            </View>
                        </View>
                        <View style={[styles.chid_children, { paddingLeft: 2 }]}>
                            <View style={{ alignItems: 'flex-end', marginVertical: resHeight(1.25) }}>
                                <Text allowFontScaling={false} style={styles.chid_children_header}>Checked Out</Text>
                                <Text allowFontScaling={false} style={[styles.chid_children_subheader, { textAlign: 'right' }]}>{this.props.checkedIn}</Text>
                            </View>
                        </View>
                    </View>
                    {use === 'history' ? null : <TouchableOpacity style={[styles.cardAction, { justifyContent: 'center', alignItems: 'center' }]} onPress={this.toggleModal}>
                        <Text allowFontScaling={false} style={styles.cardBtnText}>Check Out</Text>
                    </TouchableOpacity>}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    customCard: {
        // backgroundColor: '#222455',
        // width: width * 0.8,
        width: '100%',
        borderRadius: 5,
        padding: 20,
        // marginTop: 10,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: resHeight(9),
        alignItems: 'center'
    },
    cardTitle: {
        fontSize: resFont(15),
        fontFamily: 'josefin-sans-semi-bold',
        color: '#fff',
    },
    cardSubtitle: {
        fontSize: resFont(14),
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
        width: resWidth(25),
    },
    cardBtnText: {
        color: '#65658A',
        fontFamily: 'josefin-sans-reg',
        fontSize: resFont(12),
    },
    chid_children: {
        width: '50%',
        marginBottom: resHeight(1.25)
    },
    chid_children_header: {
        fontSize: resFont(13),
        color: '#fff',
        fontFamily: 'josefin-sans-bold'
    },
    chid_children_subheader: {
        textAlign: 'center',
        color: '#fff',
        fontSize: resFont(11),
        fontFamily: 'josefin-sans-reg',
        marginTop: resHeight(0.65)
    }
})