import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { resHeight, resWidth, resFont } from '../../utils/utils';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default class PageOne extends Component {
    render() {
        return (
            <View style={{backgroundColor: 'transaprent',
             width: '100%', 
             flex: 1, 
             alignItems: 'center',
             marginBottom: resHeight(10)}}
             >
                <Text allowFontScaling={false}
                style={styles.pageSubHeader}>
                    Confirm your details
                </Text>
                <View style={{ marginBottom: resHeight(1.5) }}>
                    <Input placeholder='First Name' style={{ marginVertical: resHeight(1.5) }} />
                    <Input placeholder='Last Name' style={{ marginVertical: resHeight(1.5) }} />
                    <Input placeholder='Gender' style={{ marginVertical: resHeight(1.5) }} />
                    <Input placeholder='Date' style={{ marginVertical: resHeight(1.5) }} />
                    <Input placeholder='Phone Number' style={{ marginVertical: resHeight(1.5) }} />
                    <Input placeholder='Email' style={{ marginVertical: resHeight(1.5) }} />
                    <Button title='Submit Details' backgroundColor='#5766BA' style={{ marginVertical: resHeight(1.5) }}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    pageSubHeader: {
        color: '#222455',
        fontSize: resFont(18),
        fontFamily: 'josefin-sans-light',
        marginVertical: resHeight(1.5)
    }
})