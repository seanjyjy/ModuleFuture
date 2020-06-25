import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import Course from "./Course";
import Graduation from "./Graduation";
import Focus from "./ChooseFocus";
import Profile from "./Profile";

const Stack = createStackNavigator();

const ProfilePage = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        ...TransitionPresets.SlideFromRightIOS,
        transitionSpec: {
          open: config,
          close: config,
        },
      }}
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Focus" component={Focus} />
      <Stack.Screen name="Course" component={Course} />
      <Stack.Screen name="Graduation" component={Graduation} />
    </Stack.Navigator>
  );
};

export default ProfilePage;

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
    useNativeDriver: true,
  },
};
