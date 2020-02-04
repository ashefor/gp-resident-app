import { createStackNavigator } from 'react-navigation-stack';
import GetStarted from '../../screens/getstarted/GetStarted';
import GettingStartedSteps from '../../screens/getstarted/GettingStartedSteps';
// import GetStarted from '../../screens/GetStarted';

const GetStartedStack = createStackNavigator({
    'Start': {
        screen: GetStarted,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false,
        }
    },
    'Get Started': {
        screen: GettingStartedSteps,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false,
        }
    },
}, {
    initialRouteName: 'Start',
    defaultNavigationOptions: {
      
    }
});

export default GetStartedStack;