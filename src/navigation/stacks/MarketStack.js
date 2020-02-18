import { createStackNavigator } from 'react-navigation-stack';
import MarketPlace from '../../screens/market/MarketPlace';
import MarketItemDetail from '../../screens/market/MarketItemDetail';
const MarketStack = createStackNavigator({
    'Marketplace': {
        screen: MarketPlace,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false,
        }
    },
    'Market Item Detail': {
        screen: MarketItemDetail,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false,
        }
    }
}, {
    initialRouteName: 'Marketplace',
    defaultNavigationOptions: {
        cardStyle: {
            backgroundColor: 'transparent'
        },
    }
})

export default MarketStack