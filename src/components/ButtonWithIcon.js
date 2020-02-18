import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import { resHeight, resFont, resWidth } from '../utils/utils';

export default class ButtonWithIcon extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {backgroundColor, title, onPress, icon, iconColor, textColor, style} = this.props
        return (
            <TouchableOpacity style={[styles.button, {...style}]} onPress={onPress}>
            <Feather name={icon} color={iconColor} size={resFont(25)} />
                <Text allowFontScaling={false}    style={[styles.btnText, {color: textColor}]}>{title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        flexDirection:'row',
        alignItems: 'center',
        paddingLeft: resWidth(5),
        borderRadius: 5, 
        height: resHeight(7),
        paddingBottom: Platform.OS === 'android' ? resHeight(1) : 0,
        // paddingTop: Platform.OS === 'ios' ? resHeight(.5) : 0
    },
    btnText: {
        fontFamily: 'josefin-sans-reg',
        fontSize: resFont(17),
        marginLeft: resWidth(4)
    },
})