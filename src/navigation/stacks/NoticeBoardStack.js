import {createStackNavigator} from 'react-navigation-stack';
import NoticeBoard from '../../screens/noticeboard/NoticeBoard';
import CreateNotice from '../../screens/noticeboard/CreateNotice';
const NoticeBoardStack = createStackNavigator({
    'Notice Board': {
        screen: NoticeBoard,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false,
        }
    },
    'New Post': {
        screen: CreateNotice,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false,
        }
    }
}, {
    initialRouteName: 'Notice Board',
    defaultNavigationOptions: {
        cardStyle: {
            backgroundColor: 'transparent'
        },
    }
})

export default NoticeBoardStack