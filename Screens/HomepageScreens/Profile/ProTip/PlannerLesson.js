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
        "Interactive scroll-based interface for you to find the semester you wish to create your plan in.",
    },
    {
      imageLink: require("../../../../assets/PlannerPage2.png"),
      subtitle: "Creating of your plans",
      description:
        "Create a memorable plan name for you to remember. Note that no duplicate names are allowed in the same semester.",
    },
    {
      imageLink: require("../../../../assets/PlannerPage3.png"),
      subtitle: "Addition of your modules",
      description:
        "You can either use the search function or the filter to look for your modules.",
    },
    {
      imageLink: require("../../../../assets/PlannerPage4.png"),
      subtitle: "Filter",
      description:
        "Clicking the button on the top right of the previous page will lead you to the filter function.",
    },
    {
      imageLink: require("../../../../assets/PlannerPage5.png"),
      subtitle: "Clicking onto info button",
      description:
        "View relevant informations regarding that particular module. Same applies for the Req button",
    },
    {
      imageLink: require("../../../../assets/PlannerPage6.png"),
      subtitle: "Confirmation",
      description:
        "On clicking add modules, we reach the confirmation page. Here we can choose to edit our current modules to make sure it is correct before clicking confirm.",
    },
    {
      imageLink: require("../../../../assets/PlannerPage7.png"),
      subtitle: "Addition of grades",
      description:
        "Add your target grade for each module. At the end of the semester, submit your final grades and view your progress!",
    },
    {
      imageLink: require("../../../../assets/PlannerPage8.png"),
      subtitle: "Module plans display",
      description:
        "Finally view your modules planned for the semester!\nYou can favourite and provide quick access to each plan by clicking the bookmark icon beside each plan's name.",
    },
    {
      imageLink: require("../../../../assets/PlannerPage9.png"),
      subtitle: "Quick Navigation",
      description:
        "Access the quick navigation tab through the button in the top left corner. It suggests some semesters for you to start planning as well!",
    },
  ];
  return (
    <Stack.Navigator initialRouteName="SlideScreen">
      <Stack.Screen name="SlideScreen">
        {(props) => (
          <SlideScreen
            {...props}
            title={"How to use planner I"}
            slides={slides}
            backTo="ProTip"
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default PlannerLesson;
