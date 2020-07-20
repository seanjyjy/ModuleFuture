import React from "react";
import SlideScreen from "./SlideScreen";
import { createStackNavigator } from "@react-navigation/stack";

const PlannerLesson = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="SlideScreen">
      <Stack.Screen name="SlideScreen" component={SlideScreen} />
    </Stack.Navigator>
  );
};

export default PlannerLesson;
