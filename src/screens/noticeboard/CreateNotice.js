import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, Animated, Easing } from 'react-native';
import Input from '../../components/Input';
import { CheckBox } from 'react-native-elements'
import Button from '../../components/Button';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-navigation';
import Header from '../../components/Header';
import Textarea from '../../components/Textarea';
import { resWidth, resFont, resHeight } from '../../utils/utils';
import CustomText from '../../components/CustomText';

const AnimatedIcon = Animated.createAnimatedComponent(Feather);
export default class CreateNotice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false,
            gatepassCreated: false,
            newPostTitle: {
                name: ''
            },
            checkMarkSize: new Animated.Value(0),
            backgroundColor: new Animated.Value(0),
        }
    }

    handleAddUserToFav = () => {
        this.setState({
            checked: !this.state.checked
        })
    }
    updateTitle = name => {
        this.setState({
            newPostTitle: { name }
        });
    };
    startAnimation = () => {
        Animated.parallel([
            Animated.timing(this.state.backgroundColor, {
                toValue: 300,
                duration: 1000,
                easing: Easing.linear()
            }),
            Animated.spring(this.state.checkMarkSize, {
                toValue: resFont(30),
                friction: 1
            })
        ]).start()
    };
    createGatepass = (boolean) => {
        const { newPostTitle: { name } } = this.state;
        if (name == '') {
            return;
        } else {
            this.setState({
                newPostTitle: { name },
                gatepassCreated: boolean
            });
        }
        this.startAnimation()
    }
    render() {
        const color = this.state.backgroundColor.interpolate({
            inputRange: [0, 300],
            outputRange: ['#fff', '#33D27B']
        });


        const { navigation } = this.props;
        const { gatepassCreated, checkMarkSize, newPostTitle } = this.state
        return (
            <LinearGradient colors={['#F7F7F7', '#F7F7F7']} style={[StyleSheet.absoluteFillObject]}>
                <SafeAreaView style={StyleSheet.absoluteFillObject}>
                    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                        <Header navigation={navigation} Cancel='Home' textColor='#8A98BA' />
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.middleBlock}>
                                    <Input placeholder='Title'
                                        style={{ marginTop: resHeight(1.5) }}
                                        onChangeText={this.updateTitle}
                                        value={newPostTitle.name}
                                    />
                                    <Textarea placeholder='Details' style={{ marginTop: resHeight(1.5) }} />
                                    <Input placeholder='Category' style={{ marginTop: resHeight(1.5) }} />
                                    <View style={{ width: '100%' }}>
                                        <CustomText content='Personal Information' style={{ fontSize: resFont(16), fontFamily: 'josefin-sans-semi-bold', color: '#3E3F68' , marginVertical: resHeight(2)}} />
                                        <CheckBox
                                            title='Show personal details'
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
                                    <Button
                                        title='Make Post'
                                        textColor='#fff'
                                        onPress={() => this.createGatepass(true)}
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
    middleBlock: {
        paddingVertical: resHeight(1),
        width: resWidth(89),
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