import React, { Component } from 'react';
import {Text} from 'react-native';

export default class Text extends Component {
    render(){
        const {text, regular} = this.props
        return (
            <Text
            >
                {text}
            </Text>
        )
    }
}