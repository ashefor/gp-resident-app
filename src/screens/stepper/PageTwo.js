import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { resHeight, resWidth, resFont } from '../../utils/utils';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default class PageTwo extends Component {
    render() {
        return (
            <View style={{backgroundColor: 'transparent',
             width: '100%', 
             flex: 1, 
             alignItems: 'center',
             marginBottom: resHeight(10)}}
             >
                <Text allowFontScaling={false}
                style={styles.pageSubHeader}>
                    Create New Password
                </Text>
                <View style={{ marginBottom: resHeight(1.5) }}>
                    <Input placeholder='New Password' style={{ marginVertical: resHeight(1.5) }} />
                    <Input placeholder='Confirm Password' style={{ marginVertical: resHeight(1.5) }} />
                    <Button title='Submit' backgroundColor='#5766BA' style={{ marginVertical: resHeight(3.5) }}/>
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