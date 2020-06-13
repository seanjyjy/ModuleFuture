import React , {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ProfilePage from "./HomepageScreens/ProfilePage";
import AskPage from "./HomepageScreens/AskPage";
import ModulePage from "./HomepageScreens/ModulePage";
import Planner from "./HomepageScreens/Planner";
import FocusArea from "./HomepageScreens/FocusArea";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const HomeTabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
                let iconName;
                if (route.name === 'Planner') {
                    iconName = focused ? 'calendar' : 'calendar';
                } else if (route.name === 'Focus Area') {
                    iconName = focused ? 'crosshairs' : 'crosshairs';
                } else if (route.name === 'Module') {
                    iconName = focused ? 'book' : 'book';
                } else if (route.name === 'Ask') {
                    iconName = focused ? 'comments' : 'comments';
                } else if (route.name === 'Profile') {
                    iconName = focused ? 'user-circle' : 'user-circle';
                }
                // You can return any component that you like here!
                return <Icon name={iconName} size={size} color={color} />;
            },
        })}
            tabBarOptions={{
                activeTintColor: '#FB5581',
                inactiveTintColor: '#979797',
        }}>
            <Tab.Screen name="Planner" component={Planner}/>
            <Tab.Screen name="Focus Area" component={FocusArea}/>
            <Tab.Screen name="Module" component={ModulePage}/>
            <Tab.Screen name="Ask" component={AskPage}/>
            <Tab.Screen name="Profile" component={ProfilePage}/>
        </Tab.Navigator>
    )
}


const Homepage = () => {
    return (
        <NavigationContainer>
            <HomeTabNavigator/>
        </NavigationContainer>
    )
}




export default Homepage;
