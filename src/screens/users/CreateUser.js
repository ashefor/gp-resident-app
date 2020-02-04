import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Input from '../../components/Input';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-navigation';
import Header from '../../components/Header';
import { resWidth, resHeight } from '../../utils/utils';

const { width } = Dimensions.get('window')
export default class CreateUser extends Component {
    render() {
        const { navigation } = this.props
        return (
            <LinearGradient colors={['#fff', '#fff']} style={[StyleSheet.absoluteFillObject]}>
                <SafeAreaView style={StyleSheet.absoluteFillObject}>
                    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                        <Header navigation={navigation} />
                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                            <View style={styles.middleBlock}>
                                <Input placeholder='Full Name' />
                                <Input placeholder='Email Address' style={{ marginTop: resHeight(2.5) }} />
                            </View>
                            <View style={styles.bottomContainer}>
                                <ButtonWithIcon
                                    title='Create user'
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
        marginTop: resHeight(6),
        width: resWidth(55),
    },
})