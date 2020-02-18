import React, { Component } from 'react';
import { View, Text, Switch, TouchableOpacity, Platform, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { resWidth, resHeight, resFont } from '../utils/utils';

const { width } = Dimensions.get('window')

export default class Accordion extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        data: this.props.data,
        expanded: false,
        switchMode: true,
    }

    toggleExpand = () => {
        const {scrollToPosition} = this.props
        this.setState({ expanded: !this.state.expanded })
        scrollToPosition? scrollToPosition(this.state.expanded ? 0 : this.props.itemIndex): null
    }

    toggleSwitch = () => {
        this.setState({
            switchMode: !this.state.switchMode
        })
    }
    render() {
        const {item, goToStaffHistory} = this.props
        return (
            <View style={{ width: resWidth(89)}}>
                 <View style={[styles.customCard, {backgroundColor: this.props.bgColor}]}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'column'}}>
                            <View>
                                <Text allowFontScaling={false}   style={styles.cardTitle}>{item.name}</Text>
                                <Text allowFontScaling={false}   style={styles.cardSubtitle}>{item.type}</Text>
                            </View>
                            <View style={{justifyContent: 'center'}}>
                                <Text allowFontScaling={false}    style={styles.cardContent}>{item.code}</Text>
                            </View>
                        </View>
                        <View style={{alignItems: 'flex-end', flexDirection: 'column', justifyContent: 'space-between'}}>
                           {this.state.expanded? <TouchableOpacity onPress={() => this.toggleExpand()}>
                            <Ionicons name='ios-close-circle' color='white' size={resFont(25)} />
                           </TouchableOpacity>: <>
                            <Switch onValueChange={() => this.toggleSwitch()} value={this.state.switchMode}
                            trackColor={{true: '#39DD8C', false: '#FF5453'}}
                            style={styles.switchAction} />
                            <View style={styles.cardBody}>
                                <TouchableOpacity style={styles.cardAction} onPress={() => this.toggleExpand()}>
                                    <Text allowFontScaling={false}    style={styles.cardBtnText}>Details</Text>
                                </TouchableOpacity>
                            </View></>}
                        </View>
                    </View>
                </View>
                {
                    this.state.expanded &&
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.child}>
                            <View>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <View style={[styles.chid_children, { paddingRight: 2 }]}>
                                        <View style={{ alignItems: 'flex-start', marginVertical: resHeight(1.25) }}>
                                            <Text allowFontScaling={false}    style={styles.chid_children_header}>Last Checked In:</Text>
                                            <Text allowFontScaling={false}    style={[styles.chid_children_subheader, { textAlign: 'left' }]}>{item.checkedIn}</Text>
                                        </View>
                                        <TouchableOpacity style={styles.historyBtn} onPress={goToStaffHistory}>
                                            <Text allowFontScaling={false}    style={styles.historyBtnText}>View History</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[styles.chid_children, { paddingLeft: 2 }]}>
                                        <View style={{ alignItems: 'flex-end', marginVertical: resHeight(1.25) }}>
                                            <Text allowFontScaling={false}    style={styles.chid_children_header}>Checkout</Text>
                                            <Text allowFontScaling={false}    style={[styles.chid_children_subheader, { textAlign: 'right' }]}>{item.checkedIn}</Text>
                                        </View>
                                        <TouchableOpacity style={styles.deleteBtn}>
                                            <Text allowFontScaling={false}    style={styles.deleteBtnText}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            {this.props.type === 'favorites' ? 
                            null : <TouchableOpacity style={styles.historyBtn}>
                            <Text allowFontScaling={false} style={styles.historyBtnText}>Edit</Text>
                        </TouchableOpacity>}
                        </View>
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    customCard: {
        width: '100%',
        borderRadius: 5,
        padding: resWidth(5),
        marginTop: resHeight(1.25)
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
    child: {
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingHorizontal: resWidth(2),
        // height: resHeight(22),
        paddingHorizontal: resWidth(3),
        paddingVertical: resHeight(1.5),
        width: resWidth(80),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ECECEC',
        borderWidth: 1,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
        borderRadius: 5,
        marginBottom: resHeight(1.25)
    },
    switchAction: {
        transform: [
            { scaleX: Platform.OS === 'ios' ? .8: 1 }, 
            { scaleY: Platform.OS === 'ios' ? .8: 1 }
        ], 
        backgroundColor: Platform.OS === 'ios' ?'red' : 'transparent', 
        borderRadius:  Platform.OS === 'ios' ? 17 : 0, 
    },
    historyBtn: {
        borderColor: '#222455',
        borderRadius: 5,
        width: '100%',
        borderWidth: 1,
        height: resHeight(4.5),
        justifyContent: 'center'
    },
    deleteBtn: {
        borderColor: '#FE0000',
        borderRadius: 5,
        width: '100%',
        borderWidth: 1,
        height: resHeight(4.5),
        justifyContent: 'center'
    },
    chid_children: {
        width: '50%',
        marginBottom: resHeight(1.25)
    },
    historyBtnText: {
        textAlign: 'center',
        color: '#222455',
        fontSize: resFont(13),
        fontFamily: 'josefin-sans-reg',
    },
    deleteBtnText: {
        color: '#FE0000',
        textAlign: 'center',
        fontSize: resFont(13),
        fontFamily: 'josefin-sans-reg',
    },
    chid_children_header: {
        fontSize: resFont(13),
        color: '#222455',
        fontFamily: 'josefin-sans-bold'
    },
    chid_children_subheader: {
        textAlign: 'center',
        color: '#222455',
        fontSize: resFont(12),
        fontFamily: 'josefin-sans-reg',
        marginTop: resHeight(0.65)
    }
})