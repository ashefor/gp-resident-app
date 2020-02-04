import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { resFont, resHeight, resWidth } from '../utils/utils';

export default class Textarea extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { style, placeholder } = this.props
        return (
            <View style={[styles.inputStyle, styles.inputContainer, style]}>
                <TextInput
                    underlineColorAndroid="transparent"
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor='#000'
                    numberOfLines={10}
                    multiline={true}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({

    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderColor: 'rgba(0,0,0,.05)',
        borderWidth: 1
    },
    inputStyle: {
        backgroundColor: '#fff',
        height: resHeight(20),
        padding: resWidth(5),
        justifyContent: "center",
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
        fontSize: resFont(15),
        fontFamily: 'josefin-sans-reg',
        textAlignVertical: 'top'
    },
})