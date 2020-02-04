import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, Dimensions, ScrollView, Animated, StatusBar } from 'react-native';
import Accordion from '../../components/Accordion';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import { LinearGradient } from 'expo-linear-gradient';
import { scaleValue, translateX } from '../../functions/toggleDrawer';
import { withNavigationFocus } from 'react-navigation'
import Header from '../../components/Header';
import { resWidth } from '../../utils/utils';



class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: [
                {
                    checkedIn: 'January 20, 2014 10:30am',
                },
                {
                    checkedIn: 'January 21, 2014 10:30am',
                },
                {
                    checkedIn: 'January 22, 2014 10:30am',
                },
                {
                    checkedIn: 'January 23, 2014 10:30am',
                },
            ],
            scale: scaleValue,
            opacity: new Animated.Value(1),
            translateY: new Animated.Value(1),
            translateX: translateX,
            contentHeight: 0,
        }
    }

    currentItem = (index) => {
        this.setState({
            contentHeight: index
        })
    }
    renderList = () => (
        this.state.menu.map((item, index) =>
            <Accordion
                scrollToPosition={this.currentItem}
                itemIndex={index}
                key={index}
                checkedIn={item.checkedIn}
                bgColor='#222455' />)
    )
    render() {
        const { navigation } = this.props
        return (
            <Animated.View
                style={[
                    { transform: [{ scale: this.state.scale }, { translateX: this.state.translateX }], opacity: this.state.opacity },
                    styles.animatedContainer]}>
                <LinearGradient colors={['#fff', '#fff', '#5766BA', '#5766BA']} style={[StyleSheet.absoluteFill]}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={styles.mainContainer}>
                            <Header navigation={navigation} />
                            <View style={{ flex: 5, alignItems: 'center', marginBottom: 5}}>
                                <ScrollView
                                    ref='_scrollView'
                                    onContentSizeChange={() => { this.refs._scrollView.scrollTo({ x: 0, y: this.state.contentHeight * 120, animated: true }) }}
                                    showsVerticalScrollIndicator={false}>
                                    {this.renderList()}
                                </ScrollView>
                            </View>
                            <View style={styles.bottomWrapper}>
                                <View style={{ width: resWidth(55) }}>
                                    <ButtonWithIcon
                                        title='Create user'
                                        textColor='#65658A'
                                        icon='user-plus'
                                        iconColor='#65658A'
                                        backgroundColor='#fff'
                                        onPress={() => this.props.navigation.navigate('Create User')} />
                                </View>
                            </View>
                        </View>
                    </SafeAreaView>
                </LinearGradient>
            </Animated.View>
        )
    }
}

export default withNavigationFocus(Users)
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    animatedContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    bottomWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5766BA',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
})