import React, { Component, Fragment } from 'react';
import { StatusBar, TouchableOpacity, StyleSheet, Image, Text, Platform } from 'react-native';
import { Feather, FontAwesome, Entypo, Ionicons } from '@expo/vector-icons';
import { NavBar } from 'galio-framework';
import { NavigationEvents } from 'react-navigation';
import { deAnimatePage } from '../functions/toggleDrawer'
import { resWidth, resFont, resHeight } from '../utils/utils';

const MenuButton = ({ navigation }) => (
    <TouchableOpacity onPress={navigation.openDrawer}>
        <Feather name='menu' color='#222455' size={resFont(25)} />
    </TouchableOpacity>
)
const UserIconButton = ({ navigation }) => (
    <TouchableOpacity onPress={() => { navigation.navigate('Estate Passport') }}>
        <FontAwesome name='user' color='#5766BA' size={resFont(25)} />
    </TouchableOpacity>
)
const BackButton = ({ navigation, textColor }) => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
        <Entypo name='chevron-left' color={textColor ? textColor : '#222455'} size={resFont(25)} />
    </TouchableOpacity>
)
const HistoryButton = ({ navigation, route }) => (
    <TouchableOpacity onPress={() => { navigation.navigate(route) }}>
        <Image source={require('../assets/images/history.png')} style={{
            width: resFont(25),
            height: resFont(25),
            resizeMode: 'contain'
        }} />
    </TouchableOpacity>
)
const SearchButton = ({ navigation }) => (
    <TouchableOpacity onPress={() => { }}>
        <Feather name='search' color='#3E3F68' size={resFont(25)} />
    </TouchableOpacity>
)
const CancelButton = ({ navigation, route, textColor }) => (
    <TouchableOpacity onPress={() => { navigation.navigate(route) }}>
        <Text style={[styles.headerRightText, { color: textColor }]}>Cancel</Text>
    </TouchableOpacity>
)
const SkipButton = ({ navigation }) => (
    <TouchableOpacity onPress={() => { navigation.navigate('Auth') }} style={styles.skipBtn}>
        <Text style={styles.skipBtnText}>Skip</Text>
    </TouchableOpacity>
)
const CloseButton = ({ navigation }) => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name='md-close' color='#ffffff' size={resFont(25)} />
    </TouchableOpacity>
)
class Header extends Component {
    handleCustomHeader = () => {
        const { title, navigation, history, Cancel, textColor, backColor } = this.props;
        const { routeName } = navigation.state;

        switch (routeName) {
            case 'Verify Code':
                return (
                    <NavBar
                        transparent={true}
                        titleStyle={styles.pageTitle}
                        rightStyle={styles.rightStyle}
                        style={styles.headerStyle}
                        left={<CloseButton navigation={navigation} />}
                        title={null}
                        right={null} />
                );
            case 'Forgot Password':
                return (
                    <NavBar
                        transparent={true}
                        titleStyle={styles.pageTitle}
                        rightStyle={styles.rightStyle}
                        style={styles.headerStyle}
                        left={<CloseButton navigation={navigation} />}
                        title={null}
                        right={null} />
                );
            case 'Start':
                return (
                    <NavBar
                        transparent={true}
                        titleStyle={styles.pageTitle}
                        rightStyle={styles.rightStyle}
                        style={styles.headerStyle}
                        left={null}
                        title={null}
                        right={<SkipButton navigation={navigation} />} />
                );
            case 'Get Started':
                return (
                    <NavBar
                        transparent={true}
                        titleStyle={styles.pageTitle}
                        rightStyle={styles.rightStyle}
                        style={styles.headerStyle}
                        left={<BackButton navigation={navigation} textColor={backColor} />}
                        title={title ? title : null}
                        right={<CancelButton navigation={navigation} route={Cancel} textColor={textColor} />} />
                );
            case 'Home':
                return (
                    <NavBar
                        transparent={true}
                        titleStyle={styles.pageTitle}
                        rightStyle={styles.rightStyle}
                        style={styles.headerStyle}
                        left={<MenuButton navigation={navigation} />}
                        title={title ? title : routeName}
                        right={<UserIconButton navigation={navigation} />} />
                );
            case 'Create Gatepass':
                return (
                    <NavBar
                        transparent={true}
                        titleStyle={styles.pageTitle}
                        rightStyle={styles.rightStyle}
                        style={styles.headerStyle}
                        left={<BackButton navigation={navigation} textColor={backColor} />}
                        title={title ? title : routeName}
                        right={<CancelButton navigation={navigation} route={Cancel} textColor={textColor} />} />
                );
            case 'Users':
                return (
                    <NavBar
                        transparent={true}
                        titleStyle={styles.pageTitle}
                        rightStyle={styles.rightStyle}
                        style={styles.headerStyle}
                        left={<MenuButton navigation={navigation} />}
                        title={title ? title : routeName}
                        right={<UserIconButton navigation={navigation} />} />
                )
            case 'Create User':
                return (
                    <NavBar
                        transparent={true}
                        titleStyle={styles.pageTitle}
                        rightStyle={styles.rightStyle}
                        style={styles.headerStyle}
                        left={<BackButton navigation={navigation} textColor={backColor} />}
                        title={title ? title : routeName}
                        right={<UserIconButton navigation={navigation} />} />
                )
            case 'Staff':
                return (
                    <NavBar
                        transparent={true}
                        titleStyle={styles.pageTitle}
                        rightStyle={styles.rightStyle}
                        style={styles.headerStyle}
                        left={<MenuButton navigation={navigation} />}
                        title={title ? title : routeName}
                        right={<HistoryButton navigation={navigation} route={history} />} />
                )
            case 'Create Staff':
                return (
                    <NavBar
                        transparent={true}
                        titleStyle={[styles.pageTitle, { color: textColor }]}
                        rightStyle={styles.rightStyle}
                        style={styles.headerStyle}
                        left={<BackButton navigation={navigation} textColor={backColor} />}
                        title={title ? title : routeName}
                        right={<CancelButton navigation={navigation} route={Cancel} textColor={textColor} />} />
                )
            case 'Guestlist':
                return (
                    <NavBar
                        transparent={true}
                        titleStyle={styles.pageTitle}
                        rightStyle={styles.rightStyle}
                        style={styles.headerStyle}
                        left={<MenuButton navigation={navigation} />}
                        title={title ? title : routeName}
                        right={<HistoryButton navigation={navigation} route={history} />} />
                )
            case 'Guest History':
                return (
                    <NavBar
                        transparent={true}
                        titleStyle={styles.pageTitle}
                        rightStyle={styles.rightStyle}
                        style={styles.headerStyle}
                        left={<BackButton navigation={navigation} textColor={backColor} />}
                        title={title ? title : routeName}
                        right={<SearchButton navigation={navigation} />} />
                )
            case 'Estate Passport':
                return (
                    <NavBar
                        transparent={true}
                        titleStyle={[styles.pageTitle, { color: textColor }]}
                        rightStyle={styles.rightStyle}
                        style={styles.headerStyle}
                        left={<BackButton navigation={navigation} textColor={backColor} />}
                        title={title ? title : routeName}
                        right={<CancelButton navigation={navigation} route={Cancel} textColor={textColor} />} />
                )
            case 'Complaints':
                return (
                    <NavBar
                        transparent={true}
                        titleStyle={[styles.pageTitle, { color: textColor }]}
                        rightStyle={styles.rightStyle}
                        style={styles.headerStyle}
                        left={<MenuButton navigation={navigation} />}
                        title={title ? title : routeName}
                        right={<SearchButton navigation={navigation} />} />
                )
            case 'New Complaint':
                return (
                    <NavBar
                        transparent={true}
                        titleStyle={[styles.pageTitle, { color: textColor }]}
                        rightStyle={styles.rightStyle}
                        style={styles.headerStyle}
                        left={<BackButton navigation={navigation} textColor={backColor} />}
                        title={title ? title : routeName}
                        right={<SearchButton navigation={navigation} />} />
                )
            case 'Complaint Details':
                return (
                    <NavBar
                        transparent={true}
                        titleStyle={[styles.pageTitle, { color: textColor }]}
                        rightStyle={styles.rightStyle}
                        style={styles.headerStyle}
                        left={<BackButton navigation={navigation} textColor={backColor} />}
                        title={title ? title : routeName}
                        right={null} />
                )
            case 'Complaint Review':
                return (
                    <NavBar
                        transparent={true}
                        titleStyle={[styles.pageTitle, { color: textColor }]}
                        rightStyle={styles.rightStyle}
                        style={styles.headerStyle}
                        left={<BackButton navigation={navigation} textColor={backColor} />}
                        title={title ? title : routeName}
                        right={null} />
                )
            case 'Profile':
                return (
                    <NavBar
                        transparent={true}
                        titleStyle={[styles.pageTitle, { color: textColor }]}
                        rightStyle={styles.rightStyle}
                        style={styles.headerStyle}
                        left={<MenuButton navigation={navigation} />}
                        title={title ? title : routeName}
                        right={<UserIconButton navigation={navigation} />} />
                )
            case 'Emergency Contact':
                return (
                    <NavBar
                        transparent={true}
                        titleStyle={[styles.pageTitle, { color: textColor }]}
                        rightStyle={styles.rightStyle}
                        style={styles.headerStyle}
                        left={<BackButton navigation={navigation} textColor={backColor} />}
                        title={title ? title : routeName}
                        right={<UserIconButton navigation={navigation} />} />
                )
            default:
                return (
                    <NavBar
                        transparent={true}
                        titleStyle={[styles.pageTitle, { color: textColor }]}
                        rightStyle={styles.rightStyle}
                        style={styles.headerStyle}
                        left={<MenuButton navigation={navigation} />}
                        title={title ? title : routeName}
                        right={<UserIconButton navigation={navigation} />} />
                )
        }
    }
    render() {
        return (
            <Fragment>
                <NavigationEvents
                    onWillBlur={() => deAnimatePage()}
                    onWillFocus={() => deAnimatePage()}
                />
                <StatusBar hidden />
                {this.handleCustomHeader()}
            </Fragment>
        )
    }
}

export default Header

const styles = StyleSheet.create({
    rightStyle: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 0,
        margin: 0,
    },
    pageTitle: {
        fontSize: resFont(18),
        fontFamily: 'josefin-sans-semi-bold'
    },
    headerStyle: {
        height: resHeight(11),
        width: resWidth(98),
        alignSelf: 'center',
        marginTop: Platform.OS === 'android' ? 10 : 0
    },
    headerRightText: {
        fontSize: resFont(16),
        fontFamily: 'josefin-sans-reg',
    },
    skipBtn: {
        backgroundColor: '#628CB8',
        borderRadius: 35,
        height: resHeight(6),
        width: resWidth(20),
        justifyContent: 'center',
        alignItems: 'center'
    },
    skipBtnText: {
        fontSize: resFont(15),
        fontFamily: 'josefin-sans-reg',
        color: '#fff'
    },
})