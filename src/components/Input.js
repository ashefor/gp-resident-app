import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { resHeight, resFont } from '../utils/utils';

export default class Input extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {style, children, value, onChangeText} = this.props;
        return (
            <View style={[styles.inputStyle, styles.inputContainer, style]}>
                {children}
                <TextInput 
                clearButtonMode='while-editing'
                onChangeText={onChangeText}
                value={value}
                style={styles.input} 
                placeholder={this.props.placeholder}
                    placeholderTextColor='#000' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'rgba(0,0,0,.05)',
        borderWidth: 1
    },
    inputStyle: {
        backgroundColor: '#fff',
        height: resHeight(7),
        paddingHorizontal: 20,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        borderRadius: 5,
        width: '100%',
        marginBottom: resHeight(1.25)
    },
    input: {
        flex: 1,
        fontSize: resFont(16),
        fontFamily: 'josefin-sans-reg'
    },
})