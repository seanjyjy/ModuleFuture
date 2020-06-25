import React from "react";
import { StyleSheet } from "react-native";

import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import ContentPage from "./ContentPage";
import Y1S1 from "./Plans/Y1S1";
import Y1S2 from "./Plans/Y1S2";
import Y2S1 from "./Plans/Y2S1";
import Y2S2 from "./Plans/Y2S2";
import Y3S1 from "./Plans/Y3S1";
import Y3S2 from "./Plans/Y3S2";
import Y4S1 from "./Plans/Y4S1";
import Y4S2 from "./Plans/Y4S2";
import ProgressPage from "./ProgressPage";
import ProgressPageSettings from "./ProgressPageSettings";

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
      <AuthStack.Screen name="Y1S1" component={Y1S1} />
      <AuthStack.Screen name="Y1S2" component={Y1S2} />
      <AuthStack.Screen name="Y2S1" component={Y2S1} />
      <AuthStack.Screen name="Y2S2" component={Y2S2} />
      <AuthStack.Screen name="Y3S1" component={Y3S1} />
      <AuthStack.Screen name="Y3S2" component={Y3S2} />
      <AuthStack.Screen name="Y4S1" component={Y4S1} />
      <AuthStack.Screen name="Y4S2" component={Y4S2} />
      <AuthStack.Screen name="ProgressPage" component={ProgressPage} />
      {/* <AuthStack.Screen
        name="ProgressPageSettings"
        component={ProgressPageSettings}
      /> */}
    </AuthStack.Navigator>
  );
};

export default Planner;

const styles = StyleSheet.create({});

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
