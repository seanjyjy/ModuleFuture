import React from "react";
import SlideScreen from "./SlideScreen";
import { createStackNavigator } from "@react-navigation/stack";

const PlannerLesson = () => {
  const Stack = createStackNavigator();
  const slides = [
    {
      imageLink: require("../../../../assets/PlannerPage1.png"),
      subtitle: "Selecting of semester",
      description:
        "Interactive scroll for you to find the semester you wish to create your plan in.",
    },
    {
      imageLink: require("../../../../assets/PlannerPage2.png"),
      subtitle: "Creating of your plans",
      description:
        "Create a memorable plan name for you to remember. Note that no duplicate names are allow in the same semester.",
    },
    {
      imageLink: require("../../../../assets/PlannerPage3.png"),
      subtitle: "Addition of your modules",
      description:
        "You can either use the search function or the filter to look for your modules.",
    },
    {
      imageLink: require("../../../../assets/PlannerPage4.png"),
      subtitle: "Confirmation",
      description: "Confirmation on the modules to add.",
    },
    {
      imageLink: require("../../../../assets/PlannerPage5.png"),
      subtitle: "Addition of grades",
      description:
        "Add your CAP for the calculation of CAP to track the progress!",
    },
    {
      imageLink: require("../../../../assets/PlannerPage6.png"),
      subtitle: "Module plans display",
      description:
        "View the beautiful displays of your modules!\nYou can favourite this plan by clicking the icon beside My Plans",
    },
    {
      imageLink: require("../../../../assets/PlannerPage7.png"),
      subtitle: "Quick Navigation",
      description:
        "Tap the button at the top Left to activate quick navigation tab. It will suggest some semester for you to start planning as well!",
    },
  ];
  return (
    <Stack.Navigator initialRouteName="SlideScreen">
      <Stack.Screen name="SlideScreen">
        {(props) => (
          <SlideScreen
            {...props}
            title={"How to use planner"}
            slides={slides}
            backTo="ProTip"
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default PlannerLesson;
