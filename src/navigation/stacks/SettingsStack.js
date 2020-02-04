import {createStackNavigator} from 'react-navigation-stack';
import Profile from '../../screens/settings/Profile';
import EmergencyContact from '../../screens/settings/EmergencyContact';

const SettingsStack = createStackNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false,
        }
    },
    'Emergency Contact': {
        screen: EmergencyContact,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false,
        }
    },
}, {
    defaultNavigationOptions: {
        cardStyle: {
            backgroundColor: 'transparent'
        },
        
    }
})

export default SettingsStack