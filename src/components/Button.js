import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { resHeight, resFont } from '../utils/utils';

export default class Button extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {backgroundColor, title, textColor, style, onPress, children, fontFamily, fontSize} = this.props;
        return (
            <TouchableOpacity style={[styles.button, {backgroundColor: backgroundColor}, {...style}]} onPress={onPress}>
                <Text allowFontScaling={false}
                 style={[styles.btnText, 
                    {color: textColor? textColor: '#fff', 
                    fontFamily: fontFamily? fontFamily: 'josefin-sans-reg',
                fontSize: fontSize? fontSize : resFont(17)
                }]}
                    >{title}</Text>
                {children}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        // backgroundColor: '#5666ba',
        borderRadius: 5,
        height: resHeight(7),
        justifyContent: 'center'
    },
})