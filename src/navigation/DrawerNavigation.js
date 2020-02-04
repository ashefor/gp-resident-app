import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Image } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import HomeStack from './stacks/HomeStack';
import AboutStack from './stacks/AboutStack';
import UsersStack from './stacks/UsersStack';
import StaffStack from './stacks/StaffStack';
import GuestListStack from './stacks/GuestListStack';
import { AnimatePage, deAnimatePage } from '../functions/toggleDrawer'
import DrawerComponent from '../components/DrawerComponent';
import Null from '../components/Null';
import { Feather, Entypo, FontAwesome } from '@expo/vector-icons';
import EstatePassport from '../screens/EstatePassport';
import ComplaintsStack from './stacks/ComplaintsStack';
import { resFont, resHeight, resWidth } from '../utils/utils';
import SettingsStack from './stacks/SettingsStack';

const DrawerNavigation = createDrawerNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            drawerIcon: ({ tintColor }) => <Feather name='home' size={resFont(25)} color={tintColor} />
        }
    },
    Users: {
        screen: UsersStack,
        navigationOptions: {
            drawerIcon: ({ tintColor }) => <Image source={require('../assets/images/users.png')} style={{width:resFont(25), 
                height:resFont(25),
                resizeMode: 'contain'}}/>
        }
    },
    Staff: {
        screen: StaffStack,
        navigationOptions: {
            drawerIcon: ({ tintColor }) => <Image source={require('../assets/images/staff.png')} style={{width:resFont(25), 
                height:resFont(25),
                resizeMode: 'contain'}}/>
        }
    },
    Guestlist: {
        screen: GuestListStack,
        navigationOptions: {
            drawerIcon: ({ tintColor }) => <Image source={require('../assets/images/staff.png')} style={{width:resFont(25), 
                height:resFont(25),
                resizeMode: 'contain'}}/>
        }
    },
    'Settings': {
        screen: SettingsStack,
        navigationOptions: {
            drawerIcon: ({ tintColor }) => <Image source={require('../assets/images/settings.png')} style={{width:resFont(25), 
                height:resFont(25),
                resizeMode: 'contain'}}/>
        }
    },
    'Estate Passport': {
        screen: EstatePassport,
        navigationOptions: {
            drawerLabel: <Null />
        }
    },
    'Complaints': {
        screen: ComplaintsStack,
        navigationOptions: {
            drawerLabel: <Null />
        }
    },
}, {
    drawerType: 'front',
    backBehavior: 'history',
    drawerBackgroundColor: 'transparent',
    defaultNavigationOptions: {
        // drawerLockMode: 'locked-open'

    },
    contentComponent: props => <DrawerComponent {...props} />,
    hideStatusBar: true,
    contentOptions: {
        inactiveTintColor: 'rgba(204,204,204, .7)',
        activeTintColor: '#fff',
        itemStyle: {
            // backgroundColor: 'red',
            marginBottom: resHeight(2.5),
            padding: 0,
        },
        labelStyle: {
            fontSize: resFont(16),
            marginLeft: 0,
            fontFamily: 'josefin-sans-semi-bold'
        },
        iconContainerStyle: {
            padding: 0,
            width: resWidth(10)
        }
    }
});

export default DrawerNavigation;

const defaultGetStateForAction = DrawerNavigation.router.getStateForAction;

DrawerNavigation.router.getStateForAction = (action, state) => {
    switch (action.type) {
        case 'Navigation/OPEN_DRAWER':
        case 'Navigation/DRAWER_OPENED':
            AnimatePage()
            break;

        case 'Navigation/CLOSE_DRAWER':
        case 'Navigation/DRAWER_CLOSED':
            deAnimatePage();
            break;
    }

    return defaultGetStateForAction(action, state);
};
