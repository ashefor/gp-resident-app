import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Input from '../../components/Input';
import { CheckBox } from 'react-native-elements'
import ButtonWithIcon from '../../components/ButtonWithIcon';
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-navigation';
import Header from '../../components/Header';
import Textarea from '../../components/Textarea';
import { resWidth, resFont, resHeight } from '../../utils/utils';

const { width } = Dimensions.get('window')
export default class CreateGatePass extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false
        }
    }

    handleAddUserToFav = () => {
        this.setState({
            checked: !this.state.checked
        })
    }
    render() {
        const { navigation } = this.props
        return (
            <LinearGradient colors={['#fff', '#fff']} style={[StyleSheet.absoluteFillObject]}>
                <SafeAreaView style={StyleSheet.absoluteFillObject}>
                    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                        <Header navigation={navigation} Cancel='Home' textColor='#8A98BA' />
                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                            <View style={styles.middleBlock}>
                                <Input placeholder='Full Name' style={{ marginTop: resHeight(1.5) }} />
                                <Input placeholder='Phone Number (Optional)' style={{ marginTop: resHeight(1.5) }} />
                                <Input placeholder='Arrival Date' style={{ marginTop: resHeight(1.5) }} />
                                <Textarea placeholder='Comments' style={{ marginTop: resHeight(1.5) }} />
                                <View style={{ width: '100%' }}>
                                    <CheckBox
                                        title='Add User as favorites'
                                        checked={this.state.checked}
                                        checkedColor='#222455'
                                        textStyle={styles.checkboxLabel}
                                        containerStyle={styles.checkbox}
                                        onIconPress={this.handleAddUserToFav}
                                        onPress={this.handleAddUserToFav}
                                    />
                                </View>
                            </View>
                            <View style={styles.bottomContainer}>
                                <ButtonWithIcon
                                    title='Create Gatepass'
                                    textColor='#fff'
                                    icon='user-plus'
                                    iconColor='#fff'
                                    backgroundColor='#5766BA' />
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    middleBlock: {
        paddingHorizontal: resWidth(1.5),
        paddingVertical: resHeight(1),
        width: resWidth(89),
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        borderRadius: 5,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },
    bottomContainer: {
        marginTop: resHeight(5),
        width: resWidth(55),
    },
    checkboxLabel: {
        fontSize: resFont(13),
        fontFamily: 'josefin-sans-light',
        marginLeft: 0,
        marginRight: 0,
    },
    checkbox: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        marginLeft: 0,
        marginRight: 0,
        paddingVertical: 0,
        paddingHorizontal: 0,
        alignItems: 'flex-start'
    },
})