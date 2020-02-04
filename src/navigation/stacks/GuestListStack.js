import {createStackNavigator} from 'react-navigation-stack';
import GuestLists from '../../screens/guestlist/GuestLists';
import GuestHistory from '../../screens/guestlist/GuestHistory';
const GuestListStack = createStackNavigator({
    'Guestlist': {
        screen: GuestLists,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false,
        }
    },
    'Guest History': {
        screen: GuestHistory,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false,
        }
    }
}, {
    initialRouteName: 'Guestlist',
    defaultNavigationOptions: {
        cardStyle: {
            backgroundColor: 'transparent'
        },
    }
})

export default GuestListStack