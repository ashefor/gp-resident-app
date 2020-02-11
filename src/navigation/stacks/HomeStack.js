import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import HomeScreen from '../../screens/home/HomeScreen';
import CreateGatePass from '../../screens/home/CreateGatePass';
import GuestLists from '../../screens/guestlist/GuestLists';

const HomeStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false,
        }
    }, 
    'Guests': {
        screen: GuestLists,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false,
        }
    },
    'Create Gatepass' : {
        screen: CreateGatePass,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false,
        }
    }
}, {
    defaultNavigationOptions: {
        cardStyle: {backgroundColor: 'transparent'},
        
    }
})

export default HomeStack;
