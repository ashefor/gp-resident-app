import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated, Image, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import { resFont, resWidth, resHeight } from '../utils/utils';
export default class FloatingButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            width: new Animated.Value(0),
            animation: new Animated.Value(0),
        }
    }

    toggleMenu = () => {
        if(this.state.open) {
            Animated.parallel([
                Animated.timing(this.state.width, {
                    toValue: 0,
                    duration: 50,
                    easing: Easing.in()
                }),
                Animated.spring(this.state.animation, {
                    toValue: 0,
                })
            ]).start();
            this.setState({open: false})
        }else {
            Animated.parallel([
                Animated.spring(this.state.animation, {
                    toValue: 1,
                    friction: 5
                }),
                Animated.timing(this.state.width, {
                    toValue: resWidth(40),
                    duration: 100,
                    easing: Easing.in()
                })
            ]).start()
            this.setState({open: true})
        }
    }
    render() {
        const bgStyle = {
            transform: [
                {
                    scale: this.state.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 100]
                    })
                }
            ]
        }

        const animatedStyle = {
            width: this.state.width
        }
        const fireStyle = {
            transform: [
                { scale: this.state.animation },
                {
                    translateY: this.state.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, resHeight(-9)]
                    })
                }
            ]
        }
        const violenceStyle = {
            transform: [
                { scale: this.state.animation },
                {
                    translateY: this.state.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, resHeight(-18)]
                    })
                }
            ]
        }
        const healthStyle = {
            transform: [
                { scale: this.state.animation },
                {
                    translateY: this.state.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, resHeight(-27)]
                    })
                }
            ]
        }
        const crimeStyle = {
            transform: [
                { scale: this.state.animation },
                {
                    translateY: this.state.animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, resHeight(-36)]
                    })
                }
            ]
        }
        return (
            <View style={[styles.container, this.props.style]}>
                <Animated.View style={[styles.background, bgStyle]} />
                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.button, styles.secondary, styles.crimeBckg, crimeStyle]}>
                        <Animated.View style={[styles.fabTextWrap, animatedStyle]}>
                            <Text allowFontScaling={false}    style={styles.fabText}>Crime</Text>
                        </Animated.View>
                        <Image source={require('../assets/images/crimeIcon.png')} style={styles.secBtnImg}/>
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.button, styles.secondary, styles.heartBckg, healthStyle]}>
                        <Animated.View style={[styles.fabTextWrap, animatedStyle]}>
                            <Text allowFontScaling={false}    style={styles.fabText}>Health</Text>
                        </Animated.View>
                        <Image source={require('../assets/images/heart.png')} style={styles.secBtnImg}/>
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.button, styles.secondary, styles.violenceBckg, violenceStyle]}>
                        <Animated.View style={[styles.fabTextWrap, animatedStyle]}>
                            <Text allowFontScaling={false}    style={styles.fabText}>Domestic Violence</Text>
                        </Animated.View>
                        <Image source={require('../assets/images/fist.png')} style={styles.secBtnImg}/>
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.button, styles.secondary, styles.fireBckg, fireStyle]}>
                        <Animated.View style={[styles.fabTextWrap, animatedStyle]}>
                            <Text allowFontScaling={false}  style={styles.fabText}>Fire</Text>
                        </Animated.View>
                        <Image source={require('../assets/images/fire.png')} style={styles.secBtnImg}/>
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this.toggleMenu}>
                    <Animated.View style={[styles.button, styles.menu]}>
                        <Ionicons name={this.state.open ? 'md-close' : 'ios-warning'} size={resFont(25)} color='#fff' />
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    fabTextWrap: {
        position: 'absolute',
        right: resWidth(15),
        backgroundColor: '#fff',
        borderRadius: 5,
        alignItems: 'center',
        height: resHeight(3),
        justifyContent: 'center'
    },
    fabText: {
        fontFamily: 'josefin-sans-reg',
        fontSize: resFont(14)
    },
    container: {
        position: 'absolute',
        alignItems: 'center',
    },
    background: {
        backgroundColor: 'rgba(0,0,0, .4)',
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    button: {
        // position: 'absolute',
        width: resHeight(7),
        height: resHeight(7),
        borderRadius: resHeight(7) / 2,
        alignItems: 'center',
        justifyContent: 'center',
        shadowRadius: 2,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            height: 5
        },
        elevation: 3
    },
    menu: {
        backgroundColor: 'red'
    },
    secondary: {
        position: 'absolute',
        width: resHeight(6),
        height: resHeight(6),
        borderRadius: resHeight(6) / 2,
        alignItems: 'center',
        justifyContent: 'center',
        shadowRadius: 2,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        elevation: 3,
    }, fireBckg: {
        backgroundColor: '#D64747'
    },
    heartBckg: {
        backgroundColor: '#4794D6'
    }, crimeBckg: {
        backgroundColor: '#EB883F'
    },
    violenceBckg: {
        backgroundColor: '#945AE3'
    },
    secBtnImg: {
        width:resFont(25), 
        height:resFont(25),
        resizeMode: 'contain'
    }
})