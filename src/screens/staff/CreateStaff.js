import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, ScrollView, TouchableWithoutFeedback, Picker, SafeAreaView } from 'react-native';
import { Feather, } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements'

import { LinearGradient } from 'expo-linear-gradient';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { scaleValue, translateX } from '../../functions/toggleDrawer'
import Header from '../../components/Header';
import { resWidth, resFont, resHeight } from '../../utils/utils';

const { width, height } = Dimensions.get('window');

export default class CreateStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weekdays: [
                {
                    label: 'M',
                    day: 'monday',
                    key: 'monday',
                    checked: false
                },
                {
                    label: 'T',
                    day: 'tuesday',
                    key: 'tuesday',
                    checked: false
                },
                {
                    label: 'W',
                    day: 'wednesday',
                    key: 'wednesday',
                    checked: false
                },
                {
                    label: 'TH',
                    day: 'thursday',
                    key: 'thursday',
                    checked: false
                },
                {
                    label: 'F',
                    day: 'friday',
                    key: 'friday',
                    checked: false
                },
                {
                    label: 'S',
                    day: 'saturday',
                    key: 'saturday',
                    checked: false
                },
                {
                    label: 'S',
                    day: 'sunday',
                    key: 'sunday',
                    checked: false
                }
            ],
            staffType: 'Staff Type',
            gender: 'Gender',
            accessType: 'Access Type',
            showGender: false,
            showStaffType: false,
            showAccessType: false,
            scale: scaleValue,
            opacity: new Animated.Value(1),
            translateY: new Animated.Value(1),
            translateX: translateX,
        }
    }

    toggleChecked = (key) => {
        const weekdaysClone = [...this.state.weekdays]
        const found = weekdaysClone[key];
        found.checked = !found.checked;
        this.setState({
            weekdays: weekdaysClone
        })
    }
    toggleStaffPicker = () => {
        this.setState({
            showStaffType: !this.state.showStaffType
        })
    }
    selectStaffType = (itemValue) => {
        this.setState({
            staffType: itemValue,
        })
        setTimeout(() => {
            this.setState({
                showStaffType: false
            })
        }, 200);
    }
    toggleGenderPicker = () => {
        this.setState({
            showGender: !this.state.showGender
        })
    }
    selectGender = (itemValue) => {
        this.setState({
            gender: itemValue,
        })
        setTimeout(() => {
            this.setState({
                showGender: false
            })
        }, 200);
    }
    toggleAccessType = () => {
        this.setState({
            showAccessType: !this.state.showAccessType
        })
    }
    selectAccessType = (itemValue) => {
        this.setState({
            accessType: itemValue,
        })
        setTimeout(() => {
            this.setState({
                showAccessType: false
            })
        }, 200);
    }
    render() {
        const { navigation } = this.props
        return (
            <Animated.View style={[
                { transform: [{ scale: this.state.scale }, { translateX: this.state.translateX }] },
                StyleSheet.absoluteFill]}>
                <LinearGradient colors={['#7B96CF', '#7E89C6', '#fff', '#fff']} style={[StyleSheet.absoluteFill]}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={styles.container}>
                            <View style={{ flex: 1, overflow: 'hidden', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
                                <LinearGradient colors={['#7B96CF', '#7E89C6', '#866DB3']} style={{ flex: 1, }}>
                                    <Header navigation={navigation} Cancel='Staff' textColor='#fff' backColor='#fff' />
                                </LinearGradient>
                            </View>
                            <View style={{ flex: 4}}>
                                <View style={styles.uploadcontainer}>
                                    <TouchableWithoutFeedback>
                                        <View style={styles.uploadBtn}>
                                            <Text allowFontScaling={false}    style={styles.uploadBtnText}>Add Photo</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View>
                                    <ScrollView style={{ marginTop: resWidth(21)/2 }} showsVerticalScrollIndicator={false}>
                                        <View style={{ alignSelf: 'center', width: resWidth(89) }}>
                                            <Input placeholder='First Name' />
                                            <Input placeholder='Last Name' />
                                            <TouchableWithoutFeedback onPress={() => { this.toggleStaffPicker() }} style={{ backgroundColor: 'red', width: '100%' }}>
                                                <View>
                                                    <View style={styles.pickerContainer}>
                                                        <Text allowFontScaling={false}    style={styles.pickerContainerText}>{this.state.staffType}</Text>
                                                        <Feather name={this.state.showStaffType ? 'chevron-up' : 'chevron-down'} size={25} />
                                                    </View>
                                                    {this.state.showStaffType && <Picker
                                                        style={{ height: resHeight(25), justifyContent: 'center' }}
                                                        selectedValue={this.state.staffType}
                                                        onValueChange={(itemValue, itemIndex) =>
                                                            this.selectStaffType(itemValue)
                                                        }>
                                                        <Picker.Item label="Full Time" value="Full Time" />
                                                        <Picker.Item label="Part-Time" value="Part-Time" />
                                                    </Picker>}
                                                </View>
                                            </TouchableWithoutFeedback>
                                            <TouchableWithoutFeedback onPress={() => { this.toggleGenderPicker() }} style={{ backgroundColor: 'red', width: '100%' }}>
                                                <View>
                                                    <View style={styles.pickerContainer}>
                                                        <Text allowFontScaling={false}    style={styles.pickerContainerText}>{this.state.gender}</Text>
                                                        <Feather name={this.state.showGender ? 'chevron-up' : 'chevron-down'} size={25} />
                                                    </View>
                                                    {this.state.showGender && <Picker
                                                        style={{ height: resHeight(25), justifyContent: 'center' }}
                                                        selectedValue={this.state.gender}
                                                        onValueChange={(itemValue, itemIndex) =>
                                                            this.selectGender(itemValue)
                                                        }>
                                                        <Picker.Item label="Male" value="Male" />
                                                        <Picker.Item label="Female" value="Female" />
                                                        <Picker.Item label="Other" value="Other" />
                                                    </Picker>}
                                                </View>
                                            </TouchableWithoutFeedback>
                                            <Input placeholder='Permanent Address' />
                                            <TouchableWithoutFeedback onPress={() => { this.toggleAccessType() }} style={{ backgroundColor: 'red', width: '100%' }}>
                                                <View>
                                                    <View style={styles.pickerContainer}>
                                                        <Text allowFontScaling={false}    style={styles.pickerContainerText}>{this.state.accessType}</Text>
                                                        <Feather name={this.state.showAccessType ? 'chevron-up' : 'chevron-down'} size={25} />
                                                    </View>

                                                    {this.state.showAccessType && <Picker
                                                        style={{ height: resHeight(25), justifyContent: 'center' }}
                                                        selectedValue={this.state.gender}
                                                        onValueChange={(itemValue, itemIndex) =>
                                                            this.selectAccessType(itemValue)
                                                        }>
                                                        <Picker.Item label="Permanent" value="Permanent" />
                                                        <Picker.Item label="Temporary" value="Temporary" />
                                                    </Picker>}
                                                </View>
                                            </TouchableWithoutFeedback>
                                            <View style={styles.checkboxContainer}>
                                                {this.state.weekdays.map((day, index) => <CheckBox
                                                    title={day.label}
                                                    key={index}
                                                    checked={day.checked}
                                                    checkedColor='#222455'
                                                    textStyle={styles.checkboxLabel}
                                                    right
                                                    containerStyle={styles.checkbox}
                                                    onIconPress={() => this.toggleChecked(index)}
                                                    onPress={() => { this.toggleChecked(index) }}
                                                />)}
                                            </View>
                                            <View style={styles.bottomContainer}>
                                                <Button
                                                    title='Create Staff'
                                                    backgroundColor='#5666ba'
                                                    navigation={this.props.navigation} />
                                            </View>
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                    </SafeAreaView>
                </LinearGradient>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    uploadcontainer: {
        position: 'absolute',
        width: '100%',
        top: resWidth(-20)/2,
    },
    uploadBtn: {
        backgroundColor: '#D8D8D8',
        width: resWidth(20),
        height: resWidth(20),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#fff',
        borderWidth: 4,
        borderRadius: resWidth(20)/2
    },
    uploadBtnText: {
        color: '#fff',
        fontSize: resFont(11),
        fontFamily: 'josefin-sans-semi-bold'
    },
    bottomContainer: {
        width: resWidth(55),
        alignSelf: 'center'
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: resWidth(1)
    },
    checkboxLabel: {
        fontSize: resFont(13),
        fontFamily: 'josefin-sans-light',
        marginLeft: 0,
        marginRight: 0,
    },
    checkbox: {
        backgroundColor: 'white',
        borderWidth: 0,
        marginLeft: 0,
        marginRight: 0,
        paddingVertical: 0,
        paddingHorizontal: 0,
        alignItems: 'flex-start'
    },
    pickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'rgba(0,0,0,.05)',
        borderWidth: 1,
        backgroundColor: '#fff',
        height: resHeight(7),
        paddingHorizontal: resHeight(2.5),
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
        borderRadius: 5,
        marginBottom: resHeight(1.25)
    },
    pickerContainerText: {
        flex: 1,
        fontSize: resFont(15),
        fontFamily: 'josefin-sans-reg'
    },
})