import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { resHeight, resFont } from '../utils/utils';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SelectInput extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {style, name, children, value, onChangeText, onFocus, onBlur, showType} = this.props;
        return (
            <View style={[styles.inputStyle, styles.inputContainer, style]}
            >
                <View
                    style={{
                        flex:8
                    }}
                >
                <TextInput 
                    editable={true}
                    name={name}
                    clearButtonMode='never'
                    onFocus={onFocus}
                    onChangeText={onChangeText}
                    value={value}
                    style={styles.input} 
                    placeholder={this.props.placeholder}
                    placeholderTextColor='#000' 
                />
                </View>
                <View
                    style={{
                        flex:2
                    }}
                >
                {showType ? (
                    <Button
                        type="clear"
                        onPress={onBlur}
                      icon={
                        <Icon
                          name="check-circle-o"
                          size={20}
                          color="green"
                        />
                      }
                    />
                ) : (
                    <Button
                        type="clear"
                        onPress={onFocus}
                      icon={
                        <Icon
                          name="address-book-o"
                          size={20}
                          color="#65658A"
                        />
                      }
                    />
                )}
                </View>
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
        paddingLeft: 20,
        paddingRight: 5,
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