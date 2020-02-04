import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from '../../screens/LoginScreen';
import ForgotPassword from '../../screens/ForgotPassword';
import VerifyCode from '../../screens/VerifyCode';

const AuthStack = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false
        }
    },
    'Forgot Password': {
        screen: ForgotPassword,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false
        }
    },
    'Verify Code': {
        screen: VerifyCode,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false
        }
    }
}, {
    initialRouteName: 'Login',
    mode: 'modal',
    defaultNavigationOptions: {
        headerStyle: {
            height: 85
        }
    }
})

export default AuthStack