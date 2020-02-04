import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import Input from '../../components/Input';
import { CheckBox } from 'react-native-elements'
import ButtonWithIcon from '../../components/ButtonWithIcon';

import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-navigation';
import Header from '../../components/Header';
import Textarea from '../../components/Textarea';
import { resWidth, resFont, resHeight } from '../../utils/utils';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import PageOne from '../stepper/PageOne';
import PageTwo from '../stepper/PageTwo';
import PageThree from '../stepper/PageThree';

const { width } = Dimensions.get('window')
export default class GettingStartedSteps extends Component {
    constructor(props) {
        super(props)
        this.state = {
            stepper: [
                {
                    page: 'Page One',
                    checked: true
                },
                {
                    page: 'Page Two',
                    checked: false
                },
                {
                    page: 'Page Three',
                    checked: false
                },
            ],
            activeStep: 'Page One',
            backgroundColor: [
                '#fff', '#fff'
            ],
            pageTitle: 'Customer Details',
            backBtnColor: '#222455'
        }
    }
    togglePage = () => {
        const { activeStep } = this.state
        switch (activeStep) {
            case 'Page One':
                return (<PageOne />);
            case 'Page Two':
                return (<PageTwo />);
            case 'Page Three':
                return (<PageThree />)
        }
    }
    toggleChecked = (key) => {
        if (key === 1) {
            this.setState(prev => {
                const found = prev.stepper[key]
                found.checked = true;
                prev.stepper[2].checked = false;
                return {
                    stepper: prev.stepper,
                    activeStep: found.page,
                    backgroundColor: ['#fff', '#fff'],
                    pageTitle: 'Customer Details',
                    backBtnColor: '#222455'
                }
            })
        } else if (key === 2) {
            this.setState(prev => {
                const found = prev.stepper[key]
                prev.stepper.map(object => object.checked = true)
                return {
                    stepper: prev.stepper,
                    activeStep: found.page,
                    backgroundColor: ['#7c93cd', '#8473b7'],
                    pageTitle: null,
                    backBtnColor: '#fff'
                }
            })
        }
        else {
            this.setState(prev => {
                const found = prev.stepper[0]
                prev.stepper.filter(object => object !== found).map(obj => obj.checked = false);
                return {
                    stepper: prev.stepper,
                    activeStep: found.page,
                    backgroundColor: ['#fff', '#fff'],
                    pageTitle: 'Customer Details',
                    backBtnColor: '#222455'
                }
            })
        }
    }
    render() {
        const { navigation } = this.props;
        const { backBtnColor, pageTitle } = this.state
        return (
            <LinearGradient colors={this.state.backgroundColor} style={[StyleSheet.absoluteFillObject]}>
                <SafeAreaView style={StyleSheet.absoluteFillObject}>
                    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                        <Header navigation={navigation} Cancel='Start' textColor='#8A98BA' title={pageTitle} backColor={backBtnColor} />
                        <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', width: resWidth(89), alignSelf: 'center' }}>
                            {this.togglePage()}
                            <View style={styles.bottomContainer}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    {this.state.stepper.map((step, index) =>
                                        <CheckBox
                                            key={index}
                                            checked={step.checked}
                                            size={resFont(30)}
                                            iconType='material-community'
                                            checkedIcon={<Image source={require('../../assets/images/checked.png')}
                                            style={{width: resWidth(6), height: resWidth(6)}} />}
                                            uncheckedIcon={<Image source={require('../../assets/images/unchecked.png')}
                                            style={{width: resWidth(6), height: resWidth(6)}} />}
                                            containerStyle={styles.checkbox}
                                            checkedColor='#616EFF'
                                            uncheckedColor='#616EFF'
                                            onIconPress={() => this.toggleChecked(index)}
                                            onPress={() => { this.toggleChecked(index) }}
                                        />)}
                                </View>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    middleBlock: {
        paddingHorizontal: resWidth(1.5),
        paddingVertical: resHeight(1),
        width: resWidth(89),
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        borderRadius: 5,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },
    bottomContainer: {
        marginTop: resHeight(5),
        width: '100%',
        position: 'absolute',
        bottom: 0
    },
})