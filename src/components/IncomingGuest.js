import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal } from 'react-native';
import CheckedInGuestDetail from './CheckedInGuestDetail';
import { resFont, resHeight, resWidth } from '../utils/utils';

export default class IncomingGuest extends Component {
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
        const { guest } = this.props
        const { fullName, name, type, code, status } = guest;
        return (
            <Fragment>
                <Modal transparent={true} visible={this.state.modalVisible}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.24)', justifyContent: 'flex-end' }}>
                    <CheckedInGuestDetail guest={guest} closeModal={this.toggleModal} use='history'/>
                </View>
            </Modal>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: resHeight(1.5) }}>
                <View>
                    <Text allowFontScaling={false}    style={styles.guestFullName}>
                        {type || 'Guest'}: {fullName || name}
                    </Text>
                    <Text allowFontScaling={false}    style={styles.guestCode}>
                         {code ? `Code: ${code}` : `-`}
                    </Text>
                </View>
                {type === 'Staff' ? <TouchableOpacity style={styles.revokeBtn} onPress={this.toggleModal}>
                    <Text allowFontScaling={false}    style={styles.revokeBtnText}>Details</Text>
                </TouchableOpacity> : <TouchableOpacity style={styles.revokeBtn}>
                        <Text allowFontScaling={false}    style={styles.revokeBtnText}>Revoke</Text>
                    </TouchableOpacity>}
            </View>
            </Fragment>
        )
    }
}

const styles = StyleSheet.create({
    guestFullName: {
        color: '#3E3F68',
        fontSize: resFont(15),
        fontFamily: 'josefin-sans-semi-bold',
        marginBottom: resHeight(0.65)
    },
    guestType: {
        color: '#6E7FAA',
        fontSize: resFont(14),
        fontFamily: 'josefin-sans-semi-bold'
    },
    guestCode: {
        color: '#6E7FAA',
        fontSize: resFont(16),
        fontFamily: 'josefin-sans-semi-bold'
    },
    revokeBtn: {
        backgroundColor: '#5766BA',
        height: resHeight(4.5),
        width: resWidth(16.5),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    revokeBtnText: {
        fontSize: resFont(12),
        color: '#FFFFFF',
        fontFamily: 'josefin-sans-reg'
    },

})