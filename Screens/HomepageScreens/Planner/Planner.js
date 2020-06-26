import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import ContentPage from "./ContentPage";
import ProgressPage from "./ProgressPage";

const Planner = () => {
  const AuthStack = createStackNavigator();

  return (
    <AuthStack.Navigator
      headerMode="false"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        ...TransitionPresets.SlideFromRightIOS,
        transitionSpec: {
          open: config,
          close: config,
        },
      }}
    >
      <AuthStack.Screen name="Content Page" component={ContentPage} />
      <AuthStack.Screen name="ProgressPage" component={ProgressPage} />
    </AuthStack.Navigator>
  );
};

export default Planner;

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 100,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
    useNativeDriver: true,
  },
};
