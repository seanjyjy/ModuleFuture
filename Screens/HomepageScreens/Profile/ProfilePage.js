import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Course from "./Course";
import Graduation from "./Graduation";
import Focus from "./ChooseFocus";
import Profile from "./Profile";

const Stack = createStackNavigator();

const ProfilePage = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Focus" component={Focus} />
      <Stack.Screen name="Course" component={Course} />
      <Stack.Screen name="Graduation" component={Graduation} />
    </Stack.Navigator>
  );
};

export default ProfilePage;
