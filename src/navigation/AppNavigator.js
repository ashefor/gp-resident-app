import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer,  } from 'react-navigation';
import DrawerNavigation from './DrawerNavigation';
import AuthStack from './stacks/AuthStack';
// import GetStarted from '../screens/GetStarted';
import GetStartedStack from './stacks/GetStartedStack';
import { Transition } from 'react-native-reanimated';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';

export default createAppContainer(createAnimatedSwitchNavigator({
    // 'Get Started': {
    //     screen: GetStartedStack
    // },
    Auth: {
        screen: AuthStack
    },
    Main: {
        screen: DrawerNavigation
    }
}, {
    defaultNavigationOptions: {
        cardStyle: {
            backgroundColor: 'transparent'
        },
    },
    transition:(
        <Transition.Together>
            <Transition.Out type='slide-left' durationMs={400} interpolation='easeOut'/>
            <Transition.In type='fade' durationMs={400}/>
        </Transition.Together>
    )
}))