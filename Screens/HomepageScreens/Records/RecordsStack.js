import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Records from "./Records";
import RecordsFullView from "./RecordsFullView";
import Foundation from "./Foundation";

const Stack = createStackNavigator();

const RecordsStack = () => {
  return (
    <Stack.Navigator initialRouteName="Records">
      <Stack.Screen name="Records" component={Records} />
      {/* <Stack.Screen name="RecordsFullView" component={RecordsFullView} /> */}
      <Stack.Screen name="Foundation" component={Foundation} />
    </Stack.Navigator>
  );
};

export default RecordsStack;
