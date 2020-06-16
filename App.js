import React, { useState } from "react";
import Login from "./Screens/Login/Login";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import DetailsCollection from "./Screens/Login/DetailsCollection";
import Homepage from "./Screens/Homepage";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import MakingClock from "./Component/MakingClock";
import { SafeAreaProvider } from "react-native-safe-area-context";
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
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      // <SafeAreaProvider>
      //   <NavigationContainer>
      //     <Homepage/>
      //   </NavigationContainer>
      // </SafeAreaProvider>

      <ApplicationProvider {...eva} theme={eva.light}>
        <IconRegistry icons={EvaIconsPack} />
        <NavigationContainer theme={{ colors: { background: "white" } }}>
          <AuthStack.Navigator headerMode={false}>
            <AuthStack.Screen name="Login" component={Login} />
            <AuthStack.Screen
              name="DetailsCollection"
              component={DetailsCollection}
            />
            <AuthStack.Screen name="Homepage" component={Homepage} />
          </AuthStack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    );
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
  }
}
