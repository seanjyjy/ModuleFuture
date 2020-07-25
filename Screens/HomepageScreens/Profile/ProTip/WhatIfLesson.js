import React from "react";
import SlideScreen from "./SlideScreen";
import { createStackNavigator } from "@react-navigation/stack";

const WhatIfLesson = () => {
  const Stack = createStackNavigator();
  const slides = [
    {
      imageLink: require("../../../../assets/WhatIfLesson1.png"),
      subtitle: "Choosing plan A",
      description:
        "Suppose we have 2 plans, A and C. Let us proceed with the current plan selected being A first. ",
    },
    {
      imageLink: require("../../../../assets/WhatIfLesson2.png"),
      subtitle: "CAP with plan A selected",
      description:
        "Now we create another plan for Y1S2 with semestral CAP being 5. Notice that the planned overall CAP is 5, which is based on Plan A of Y1S1 and this current plan.",
    },
    {
      imageLink: require("../../../../assets/WhatIfLesson3.png"),
      subtitle: "Switching current plan to plan C",
      description:
        "Now we switch the current plan to Plan C by clicking onto it.",
    },
    {
      imageLink: require("../../../../assets/WhatIfLesson4.png"),
      subtitle: "CAP with plan C selected",
      description:
        "Looking at the CAP in Y1S2 now, we can see that the planned overall CAP has changed since the plan selected in Y1S1 is now Plan C.",
    },
    {
      imageLink: require("../../../../assets/WhatIfLesson5.png"),
      subtitle: "With final grades",
      description:
        "After inserting final grades to Plan C, we do not need to worry about current's position, it will automatically take the final grades in this semester. ",
    },
    {
      imageLink: require("../../../../assets/WhatIfLesson5.png"),
      subtitle: "Changes in terminology",
      description:
        "Note that when a plan has the final grades, the terminology will change from Planned Cap to Semestral Cap and Planned Overall Cap to Overall Cap.",
    },
    {
      imageLink: require("../../../../assets/WhatIfLesson6.png"),
      subtitle: "CAP with final grades inserted",
      description:
        "Observe that the planned overall CAP in Y1S2 computed is based on Plan C.",
    },
    {
      imageLink: require("../../../../assets/PlannerPage1.png"),
      subtitle: "Final",
      description:
        "To enjoy the best experience for the app, it is advised to enter only one set of final grades for each semester!",
    },
  ];
  return (
    <Stack.Navigator initialRouteName="SlideScreen">
      <Stack.Screen name="SlideScreen">
        {(props) => (
          <SlideScreen
            {...props}
            title={"How to use planner II"}
            slides={slides}
            backTo="ProTip"
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default WhatIfLesson;
