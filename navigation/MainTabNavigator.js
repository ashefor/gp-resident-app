import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import CardSlider from '../components/CardSlider/examples';
import HomeScreen from '../screens/HomeScreen';
import Login from '../screens/pLogin/Login';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const LoginStack = createStackNavigator(
  {
    CardSlider: CardSlider,
  },
  config
);

LoginStack.navigationOptions = {
  tabBarLabel: 'Demos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-options`
          : 'md-options'
      }
    />
  ),
};

LoginStack.path = '';



const tabNavigator = createBottomTabNavigator({
  HomeStack,
  LoginStack,
});

tabNavigator.path = '';

export default tabNavigator;