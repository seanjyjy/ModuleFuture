import React from "react";
import SlideScreen from "./SlideScreen";
import { createStackNavigator } from "@react-navigation/stack";

const WhatIfLesson = () => {
  const Stack = createStackNavigator();
  const slides = [
    {
      imageLink: require("../../../../assets/WhatIfLesson1.png"),
      subtitle: "Part I",
      description:
        "Given the two plans, with current being at Plan AA, your future plans will be calculated using this plan",
    },
    {
      imageLink: require("../../../../assets/WhatIfLesson2.png"),
      subtitle: "Part I result",
      description:
        "In the future sem(e.g Y1S2), with the planned cap being of CAP 5, since we use Plan AA which is of cap 5, planned semestral CAP is 5 .",
    },
    {
      imageLink: require("../../../../assets/WhatIfLesson3.png"),
      subtitle: "Part II",
      description:
        "Now switch we to Plan CC by clicking onto Plan CC. Note that current is now on Plan CC",
    },
    {
      imageLink: require("../../../../assets/WhatIfLesson4.png"),
      subtitle: "Plat II result",
      description:
        "Looking at the CAP now, we can see the planned semestral CAP to have change now.",
    },
    {
      imageLink: require("../../../../assets/WhatIfLesson5.png"),
      subtitle: "Part III",
      description:
        "Now if we were to insert our final grades instead, we do not need to worry about current being in wrong position. Note that plan CC terms has changed",
    },
    {
      imageLink: require("../../../../assets/WhatIfLesson6.png"),
      subtitle: "Part III result",
      description:
        "Looking at the CAP now, we will use the final grade regardless of the position of current.",
    },
    {
      imageLink: require("../../../../assets/PlannerPage1.png"),
      subtitle: "Final",
      description:
        "To enjoy the best experience for the app, it is adviced to enter only one set of final grades for each semester!",
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

export default WhatIfLesson;
