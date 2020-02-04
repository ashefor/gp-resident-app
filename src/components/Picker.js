import React, { Component } from 'react';
import {TouchableWithoutFeedback, View, Text, Picker} from 'react-native';

export default class Picker extends Component {
    render() {
        return (
            <View>
                <TouchableWithoutFeedback>
                    
                </TouchableWithoutFeedback>
                <Picker
                                style={{backgroundColor: 'red'}}
                            selectedValue={this.state.language}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ language: itemValue })
                            }>
                            <Picker.Item label="Java" value="java" />
                            <Picker.Item label="JavaScript" value="js" />
                            <Picker.Item label="JavaSipt" value="jst" />
                        </Picker>
            </View>
        )
    }
}