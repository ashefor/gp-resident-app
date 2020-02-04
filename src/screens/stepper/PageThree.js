import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { resHeight, resWidth, resFont } from '../../utils/utils';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default class PageThree extends Component {
    render() {
        return (
            <View style={{backgroundColor: 'transparent',
             width: '100%', 
             flex: 1, 
             justifyContent: 'center',
             alignItems: 'center',
             marginBottom: resHeight(10)}}
             >
                 <Text allowFontScaling={false}
                style={styles.pageHeader}>
                    Add Emergency Number
                </Text>
                <Text allowFontScaling={false}
                style={styles.pageSubHeader}>
                   In case of an emergency, add a contact That we could contact on your behalf
                </Text>
                <View style={{ marginBottom: resHeight(1.5) }}>
                    <Input placeholder='New Password' style={{ marginVertical: resHeight(1.5) }} />
                    <Input placeholder='Confirm Password' style={{ marginVertical: resHeight(1.5) }} />
                    <Input placeholder='Phone Number' style={{ marginVertical: resHeight(1.5) }}>
                        <MaterialIcons name='phone-iphone' size={resFont(25)} />
                        <View style={{marginHorizontal: resWidth(1),
                        backgroundColor: '#DEDEDF', width: resWidth(0.2), height: resHeight(4)}}/>
                    </Input>
                    <Button title='Submit' backgroundColor='#5766BA' style={{ marginVertical: resHeight(3.5) }}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pageHeader: {
        color: '#FFFFFF',
        fontSize: resFont(28),
        // width: resWidth(50),
        textAlign: 'center',
        fontFamily: 'josefin-sans-semi-bold',
        marginBottom: resHeight(3)
    },
    pageSubHeader: {
        color: '#FFFFFF',
        fontSize: resFont(16),
        // width: resWidth(80),
        textAlign: 'center',
        fontFamily: 'josefin-sans-light',
        marginVertical: resHeight(1.5)
    }
})