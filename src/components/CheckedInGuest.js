import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal } from 'react-native';
import CheckedInGuestDetail from './CheckedInGuestDetail';
import { resWidth, resHeight, resFont } from '../utils/utils';
const { width } = Dimensions.get('window')

export default class CheckedInGuest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        }
    }
    toggleModal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    }
    render() {
        const {guest} = this.props;
        const { name, type, code } = guest;
        return (
            <Fragment>
                   <Modal transparent={true} visible={this.state.modalVisible}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.24)', justifyContent: 'flex-end' }}>
                    <CheckedInGuestDetail guest={guest} closeModal={this.toggleModal}/>
                </View>
            </Modal>
                <View style={{ width: resWidth(89), alignSelf: 'center' }}>
                    <View style={[styles.customCard, { backgroundColor: '#5766BA' }]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'column' }}>
                                <View>
                                    <Text 
                                        allowFontScaling={false}
                                        style={styles.cardTitle}
                                    >
                                        {name}
                                    </Text>
                                    <Text 
                                        allowFontScaling={false}
                                        style={styles.cardSubtitle}
                                    >
                                        {type}
                                    </Text>
                                </View>
                                <View style={{ justifyContent: 'center' }}>
                                    <Text 
                                        allowFontScaling={false}
                                        style={styles.cardContent}
                                    >
                                        {code}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ alignItems: 'flex-end', flexDirection: 'column', justifyContent: 'flex-end' }}>
                                <View style={styles.cardBody}>
                                    <TouchableOpacity style={styles.cardAction} onPress={this.toggleModal}>
                                        <Text allowFontScaling={false}    style={styles.cardBtnText}>Details</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Fragment>
        )
    }
}

const styles = StyleSheet.create({
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