import React, { Component } from 'react';
import { Text } from 'react-native';

export default class CustomText extends Component {
    render() {
        const { content, style, numberOfLines } = this.props
        return (
            <Text allowFontScaling={false} 
            numberOfLines={numberOfLines}
            style={{...style}}>
                {content}
            </Text>
        )
    }
}