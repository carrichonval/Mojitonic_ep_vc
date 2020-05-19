import React, { Component } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Home from '../screens/Home';
import CocktailStack from '../screens/CocktailStack';
import Infos from '../screens/Infos';

const AppTabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Ionicons name="ios-home" size={20} color={tintColor}></Ionicons>
            }
        },
        CocktailStack: {
            screen: CocktailStack,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Ionicons name="ios-beer" size={20} color={tintColor}></Ionicons>
            }
        },
        Infos: {
            screen: Infos,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Ionicons name="ios-information-circle" size={20} color={tintColor}></Ionicons>
            }
        },
    },
    {
        tabBarOptions: {
            activeTintColor: "#FFFFFF",
            inactiveTintColor: "#757575",
            showLabel: false,
            swipeEnabled: true,

            style: {
                backgroundColor: '#202020',
                borderTopColor: 'transparent',
                height: 45
            }
        }
    }
);



export default createAppContainer(
    createSwitchNavigator(
        {
            App: AppTabNavigator,
        },
        {
            initialRouteName: "App"
        }
    )
)