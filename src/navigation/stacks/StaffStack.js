import {createStackNavigator} from 'react-navigation-stack';
import Staff from '../../screens/staff/Staff';
import CreateStaff from '../../screens/staff/CreateStaff';
import StaffHistory from '../../screens/staff/StaffHistory';
const StaffStack = createStackNavigator({
    Staff: {
        screen: Staff,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false,
        }
    },
    'Create Staff': {
        screen: CreateStaff,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false,
        }
    },
    'Staff History': {
        screen: StaffHistory,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false,
        }
    }
}, {
    initialRouteName: 'Staff',
    defaultNavigationOptions: {
        cardStyle: {backgroundColor: 'transparent'},
    }
})

export default StaffStack