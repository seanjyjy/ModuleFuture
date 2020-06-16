import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Course from "./Course";
import Graduation from "./Graduation";
import Focus from "./ChooseFocus";
import Profile from "./Profile";
import Login from "../../Login/Login";

const Stack = createStackNavigator();

const ProfilePage = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ChooseFocus" component={Focus} />
      <Stack.Screen name="Course" component={Course} />
      <Stack.Screen name="Expected Graduation Sem" component={Graduation} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default ProfilePage;
