import {createStackNavigator} from 'react-navigation-stack';
import AboutScreen from '../../screens/AboutScreen';

const AboutStack = createStackNavigator({
    About: {
        screen: AboutScreen
    }
}, {
    defaultNavigationOptions: {
        headerStyle: {
            height: 85
        }
    }
})

export default AboutStack