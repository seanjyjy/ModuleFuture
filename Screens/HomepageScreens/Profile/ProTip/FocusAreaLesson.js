import React from "react";
import SlideScreen from "./SlideScreen";
import { createStackNavigator } from "@react-navigation/stack";

const FocusAreaLesson = () => {
  const Stack = createStackNavigator();
  const slides = [
    {
      imageLink: require("../../../../assets/FocusLesson1.png"),
      subtitle: "Track focus areas",
      description:
        "The focus area page allows you to view the CAP for each focus area, providing you with critical insight on which focus areas you may be more suited to.",
    },
    {
      imageLink: require("../../../../assets/FocusLesson2.png"),
      subtitle: "Different categorical view types",
      description:
        "There are three types of views - Prerequisites (prereq), Primaries and Electives. Prerequisites helps you to choose your focus areas, while primaries and electives helps you to track your progress in the focus area.",
    },
    {
      imageLink: require("../../../../assets/FocusLesson3.png"),
      subtitle: "Editing focus areas",
      description:
        "Here, we can edit the allocations of mcs as well as add or delete focus areas.",
    },
    {
      imageLink: require("../../../../assets/FocusLesson4.png"),
      subtitle: "Clicking into a specific focus area",
      description:
        "Here, we click into the Algorithms and Theory focus area. Prereqs for each focus area are based on the primary modules.",
    },
    {
      imageLink: require("../../../../assets/FocusLesson5.png"),
      subtitle: "Editing the modules",
      description:
        "In the case where you may need to take different modules to those listed, feel free to edit and add / delete before submitting their grades in the planner.",
    },
  ];
  return (
    <Stack.Navigator initialRouteName="SlideScreen">
      <Stack.Screen name="SlideScreen">
        {(props) => (
          <SlideScreen
            {...props}
            title={"How to use focus area"}
            slides={slides}
            backTo="ProTip"
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default FocusAreaLesson;
