import React from "react";
import SlideScreen from "./SlideScreen";
import { createStackNavigator } from "@react-navigation/stack";

const RecordsLesson = () => {
  const Stack = createStackNavigator();
  const slides = [
    {
      imageLink: require("../../../../assets/RecordsLesson1.png"),
      subtitle: "Colourful visuals",
      description:
        "The records page allows you to track your modules taken and their grades over the semesters. As of now, only courses in the SOC have their modules preloaded.",
    },
    {
      imageLink: require("../../../../assets/RecordsLesson2.png"),
      subtitle: "Changing categorical view type",
      description:
        "You are able to change the view type by clicking the drop-down selector and analyse the grades and CAP based on different categories.",
    },
    {
      imageLink: require("../../../../assets/RecordsLesson3.png"),
      subtitle: "Ellipsis",
      description:
        "By clicking the ellipsis, you can do various things like toggling mcs taken, changing view type and editing current types.",
    },
    {
      imageLink: require("../../../../assets/RecordsLesson4.png"),
      subtitle: "Editing types",
      description:
        "Here, you can edit the allocations of mcs as well as add or delete new types. For types which do not have a specific number required, we can leave them empty.",
    },
    {
      imageLink: require("../../../../assets/RecordsLesson5.png"),
      subtitle: "Full view",
      description:
        "By clicking full view, you can see specifically what are the modules you have yet to take!",
    },
    {
      imageLink: require("../../../../assets/RecordsLesson6.png"),
      subtitle: "Clicking into a specific type",
      description:
        "Here, we click into Maths and Sciences. Notice that there is currently 4 MCs left to plan for this type, since the last module is not fixed and hence is not preloaded.",
    },
    {
      imageLink: require("../../../../assets/RecordsLesson7.png"),
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
            title={"How to use records"}
            slides={slides}
            backTo="ProTip"
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default RecordsLesson;
