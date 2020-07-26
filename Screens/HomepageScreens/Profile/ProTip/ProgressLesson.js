import React from "react";
import SlideScreen from "./SlideScreen";
import { createStackNavigator } from "@react-navigation/stack";

const ProgressLesson = () => {
  const Stack = createStackNavigator();
  const slides = [
    {
      imageLink: require("../../../../assets/ProgressLesson1.png"),
      subtitle: "Visuals",
      description:
        "The progress page allows you to track your MC progression, as well as CAP progression using intuitive displays.",
    },
    {
      imageLink: require("../../../../assets/ProgressLesson2.png"),
      subtitle: "Clicking onto data points",
      description:
        "Clicking onto the small data points will allow you to display the information on that particular semester.",
    },
    {
      imageLink: require("../../../../assets/ProgressLesson3.png"),
      subtitle: "Settings",
      description:
        "You can change your target CAP and total MCs by clicking on the cog icon. Default values are 5 and 160 respectively",
    },
  ];
  return (
    <Stack.Navigator initialRouteName="SlideScreen">
      <Stack.Screen name="SlideScreen">
        {(props) => (
          <SlideScreen
            {...props}
            title={"How to track progress"}
            slides={slides}
            backTo="ProTip"
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default ProgressLesson;
