import {createStackNavigator} from 'react-navigation-stack';
import Complaints from '../../screens/complaints/Complaints';
import ComplaintDetails from '../../screens/complaints/ComplaintDetails';
import ComplaintReview from '../../screens/complaints/ComplaintReview';
import NewComplaint from '../../screens/complaints/NewComplaint';
const ComplaintsStack = createStackNavigator({
    Complaints: {
        screen: Complaints,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false,
        }
    },
    'New Complaint': {
        screen: NewComplaint,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false,
        }
    },
    'Complaint Details': {
        screen: ComplaintDetails,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false,
        }
    },
    'Complaint Review': {
        screen: ComplaintReview,
        navigationOptions: {
            headerTransparent: true,
            headerShown: false,
        }
    }
}, {
    initialRouteName: 'Complaints',
    defaultNavigationOptions: {
        cardStyle: {
            backgroundColor: 'transparent'
        },
    }
})

export default ComplaintsStack