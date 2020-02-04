import {createStackNavigator} from 'react-navigation-stack';
import Users from '../../screens/users/Users';
import CreateUser from '../../screens/users/CreateUser';
const UsersStack = createStackNavigator({
    Users: {
        screen: Users,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false,
        }
    },
    'Create User': {
        screen: CreateUser,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false,
        }
    }
}, {
    initialRouteName: 'Users',
    defaultNavigationOptions: {
        cardStyle: {
            backgroundColor: 'transparent'
        },
    }
})

export default UsersStack