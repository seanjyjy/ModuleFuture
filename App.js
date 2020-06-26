import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import Homepage from "./Screens/Homepage";
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Asset } from "expo-asset";
import FirebaseDB from "./FirebaseDB";

// -------------------------------------- SCREEN IMPORTS --------------------------------------------------------

import Login from "./Screens/Login/Login";
import DetailsCollection from "./Screens/Login/DetailsCollection";
import ProgressPageSettings from "./Screens/HomepageScreens/Planner/ProgressPageSettings";
import AddModule from "./Screens/HomepageScreens/AddModule/AddModule";
import Filter from "./Screens/HomepageScreens/AddModule/Filter";
import {
  Y1S1,
  Y1S2,
  Y2S1,
  Y2S2,
  Y3S1,
  Y3S2,
  Y4S1,
  Y4S2,
  Y5S1,
  Y5S2,
} from "./Screens/HomepageScreens/Planner/Plans/ContentPlan";
import AddPlan from "./Screens/HomepageScreens/Planner/Plans/AddPlan";
import ViewPlan from "./Screens/HomepageScreens/Planner/Plans/ViewPlan";
// -------------------------------------------------------------------------------------------------------------

const AuthStack = createStackNavigator();

const getFonts = () => {
  return Font.loadAsync({
    "OpenSans-Italic": require("./assets/Font/OpenSans-Italic.ttf"),
    "OpenSans-Regular": require("./assets/Font/OpenSans-Regular.ttf"),
    "OpenSans-SemiBold": require("./assets/Font/OpenSans-SemiBold.ttf"),
    "OpenSans-Bold": require("./assets/Font/OpenSans-Bold.ttf"),
    "OpenSans-ExtraBold": require("./assets/Font/OpenSans-ExtraBold.ttf"),
    "Nunito-Regular": require("./assets/Font/Nunito-Regular.ttf"),
    "Nunito-Italic": require("./assets/Font/Nunito-Italic.ttf"),
    "Nunito-SemiBold": require("./assets/Font/Nunito-SemiBold.ttf"),
    "Nunito-Bold": require("./assets/Font/Nunito-Bold.ttf"),
    "Nunito-ExtraBold": require("./assets/Font/Nunito-ExtraBold.ttf"),
  });
};

const cacheImages = (images) => {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const loadAssetAsync = async () => {
    const imageAssets = cacheImages([
      require("./assets/loginbackgroundtest2.png"),
      require("./assets/loginbackgroundtest4.png"),
      require("./assets/y1s1.png"),
      require("./assets/y1s2.png"),
      require("./assets/y2s1.png"),
      require("./assets/y2s2.png"),
      require("./assets/y3s1.png"),
      require("./assets/y3s2.png"),
      require("./assets/y4s1.png"),
      require("./assets/y4s2.png"),
      require("./assets/y5s1.png"),
      require("./assets/y5s2.png"),
      require("./assets/HeaderBG.png"),
      require("./assets/plan1.png"),
      require("./assets/plan2.png"),
      require("./assets/plan3.png"),
      require("./assets/plan4.png"),
      require("./assets/corkboard.png"),
      require("./assets/corkboard1.png"),
    ]);

    const fontAssets = getFonts();
    await Promise.all([...imageAssets, fontAssets]);
  };
  // useEffect(() => {
  //   const usersRef = FirebaseDB.firestore().collection("users");
  //   FirebaseDB.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       usersRef
  //         .doc(user.uid)
  //         .get()
  //         .then((document) => {
  //           const userData = document.data();
  //           setLoading(false);
  //           setUser(userData);
  //         })
  //         .catch((error) => {
  //           setLoading(false);
  //         });
  //     } else {
  //       setLoading(false);
  //     }
  //   });
  // }, []);

  // if (isReady) {
  //   if (loading) {
  //     return <></>;
  //   } else {
  //     return (
  //       <SafeAreaProvider>
  //         <ApplicationProvider {...eva} theme={eva.light}>
  //           <NavigationContainer theme={{ colors: { background: "white" } }}>
  //             <AuthStack.Navigator
  //               headerMode="false"
  //               screenOptions={{
  //                 cardStyleInterpolator:
  //                   CardStyleInterpolators.forHorizontalIOS,
  //                 ...TransitionPresets.SlideFromRightIOS,
  //                 transitionSpec: {
  //                   open: config,
  //                   close: config,
  //                 },
  //               }}
  //             >
  //               {user ? (
  //                 <>
  //                   <AuthStack.Screen name="Homepage" component={Homepage} />
  //                   <AuthStack.Screen
  //                     name="ProgressPageSettings"
  //                     component={ProgressPageSettings}
  //                   />
  //                   <AuthStack.Screen name="Y1S1" component={Y1S1} />
  //                   <AuthStack.Screen name="Y1S2" component={Y1S2} />
  //                   <AuthStack.Screen name="Y2S1" component={Y2S1} />
  //                   <AuthStack.Screen name="Y2S2" component={Y2S2} />
  //                   <AuthStack.Screen name="Y3S1" component={Y3S1} />
  //                   <AuthStack.Screen name="Y3S2" component={Y3S2} />
  //                   <AuthStack.Screen name="Y4S1" component={Y4S1} />
  //                   <AuthStack.Screen name="Y4S2" component={Y4S2} />
  //                   <AuthStack.Screen name="Y5S1" component={Y5S1} />
  //                   <AuthStack.Screen name="Y5S2" component={Y5S2} />
  //                   <AuthStack.Screen name="AddPlan" component={AddPlan} />
  //                   <AuthStack.Screen name="AddModule" component={AddModule} />
  //                   <AuthStack.Screen name="ViewPlan" component={ViewPlan} />
  //                   <AuthStack.Screen name="Filter" component={Filter} />
  //                 </>
  //               ) : (
  //                 <>
  //                   <AuthStack.Screen name="Login" component={Login} />
  //                   <AuthStack.Screen
  //                     name="DetailsCollection"
  //                     component={DetailsCollection}
  //                   />
  //                   <AuthStack.Screen name="Homepage" component={Homepage} />
  //                   <AuthStack.Screen
  //                     name="ProgressPageSettings"
  //                     component={ProgressPageSettings}
  //                   />
  //                   <AuthStack.Screen name="Y1S1" component={Y1S1} />
  //                   <AuthStack.Screen name="Y1S2" component={Y1S2} />
  //                   <AuthStack.Screen name="Y2S1" component={Y2S1} />
  //                   <AuthStack.Screen name="Y2S2" component={Y2S2} />
  //                   <AuthStack.Screen name="Y3S1" component={Y3S1} />
  //                   <AuthStack.Screen name="Y3S2" component={Y3S2} />
  //                   <AuthStack.Screen name="Y4S1" component={Y4S1} />
  //                   <AuthStack.Screen name="Y4S2" component={Y4S2} />
  //                   <AuthStack.Screen name="Y5S1" component={Y5S1} />
  //                   <AuthStack.Screen name="Y5S2" component={Y5S2} />
  //                   <AuthStack.Screen name="AddPlan" component={AddPlan} />
  //                   <AuthStack.Screen name="AddModule" component={AddModule} />
  //                   <AuthStack.Screen name="ViewPlan" component={ViewPlan} />
  //                   <AuthStack.Screen name="Filter" component={Filter} />
  //                 </>
  //               )}
  //             </AuthStack.Navigator>
  //           </NavigationContainer>
  //         </ApplicationProvider>
  //       </SafeAreaProvider>
  //     );
  //   }
  // } else {
  //   return (
  //     <AppLoading
  //       startAsync={loadAssetAsync}
  //       onFinish={() => setIsReady(true)}
  //       onError={console.warn}
  //     />
  //   );
  // }
  // ----------------------------------------------------TEMPORARY ----------------------------------------------------
  if (isReady) {
    return (
      <SafeAreaProvider>
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer theme={{ colors: { background: "white" } }}>
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
              <AuthStack.Screen name="Login" component={Login} />
              <AuthStack.Screen
                name="DetailsCollection"
                component={DetailsCollection}
              />
              <AuthStack.Screen name="Homepage" component={Homepage} />
              <AuthStack.Screen
                name="ProgressPageSettings"
                component={ProgressPageSettings}
              />
              <AuthStack.Screen name="Y1S1" component={Y1S1} />
              <AuthStack.Screen name="Y1S2" component={Y1S2} />
              <AuthStack.Screen name="Y2S1" component={Y2S1} />
              <AuthStack.Screen name="Y2S2" component={Y2S2} />
              <AuthStack.Screen name="Y3S1" component={Y3S1} />
              <AuthStack.Screen name="Y3S2" component={Y3S2} />
              <AuthStack.Screen name="Y4S1" component={Y4S1} />
              <AuthStack.Screen name="Y4S2" component={Y4S2} />
              <AuthStack.Screen name="Y5S1" component={Y5S1} />
              <AuthStack.Screen name="Y5S2" component={Y5S2} />
              <AuthStack.Screen name="AddPlan" component={AddPlan} />
              <AuthStack.Screen name="AddModule" component={AddModule} />
              <AuthStack.Screen name="ViewPlan" component={ViewPlan} />
              <AuthStack.Screen name="Filter" component={Filter} />
            </AuthStack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </SafeAreaProvider>
    );
  } else {
    return (
      <AppLoading
        startAsync={loadAssetAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }
}

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
    useNativeDriver: true,
  },
};
