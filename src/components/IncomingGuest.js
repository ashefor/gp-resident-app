import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal } from 'react-native';
import CheckedInGuestDetail from './CheckedInGuestDetail';
import { resFont, resHeight, resWidth } from '../utils/utils';

import { revokeGatepass } from '../../api/Store';


export default class IncomingGuest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            guest: {},
        }
    }

    componentDidMount() {
        const { guest } = this.props;
        this.setState({
            guest
        })
    }

    toggleModal = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    }

    onGatepassReceived = (guest) => {
        this.setState( prevState => ({
            guest: prevState.guest = guest
        }));
    }

    revokeGuest = () => {
        const { guest } = this.state;
        revokeGatepass(guest,this.onGatepassReceived);
    }
    render() {
        const { guest } = this.state
        const { id, name, type, code, start_date, status } = guest;
        return (
            <Fragment>
                <Modal transparent={true} visible={this.state.modalVisible}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.24)', justifyContent: 'flex-end' }}>
                    <CheckedInGuestDetail guest={guest} closeModal={this.toggleModal} use='history'/>
                </View>
            </Modal>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: resHeight(1.5) }}>
                <View>
                    <Text allowFontScaling={false}    style={styles.guestName}>
                        {type || 'Guest'}: {name}
                    </Text>
                    <Text allowFontScaling={false}    style={styles.guestCode}>
                         {start_date ? `${new Date(Date(start_date)).toDateString()}` : `-`}
                    </Text>
                {/*
                    <Text allowFontScaling={false}    style={styles.guestCode}>
                         {code ? `Code: ${code}` : `-`}
                    </Text>
                */}
                </View>
                {type === 'Staff' ? (
                    <TouchableOpacity style={styles.revokeBtn} onPress={this.toggleModal}>
                        <Text allowFontScaling={false}    style={styles.revokeBtnText}>
                            Details
                        </Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.revokeBtn}
                        onPress={this.revokeGuest}
                    >
                        <Text allowFontScaling={false}    style={styles.revokeBtnText}>
                            Revoke
                        </Text>
                    </TouchableOpacity>
                    )}
            </View>
            </Fragment>
        )
    }
}

const styles = StyleSheet.create({
    guestName: {
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