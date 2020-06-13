import React , {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ProfilePage from "./HomepageScreens/ProfilePage";
import AskPage from "./HomepageScreens/ProfilePage";
import ModulePage from "./HomepageScreens/ProfilePage";
import Planner from "./HomepageScreens/ProfilePage";
import FocusArea from "./HomepageScreens/ProfilePage";

const Homepage = () => {
    return(
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text>
                HELLO DENNIS
            </Text>
        </View>
    )
}

export default createBottomTabNavigator({
    Planner: {

    },
    FocusArea: {

    },
    ModulePage: {

    },
    AskPage: {

    },
    ProfilePage: {

    }
});