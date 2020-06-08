import React, {useState} from 'react';
import Login from "./Screens/Login.js";
import * as Font from 'expo-font';
import {AppLoading} from "expo";

const getFonts = () => {
  return Font.loadAsync({
    'OpenSans-Italic': require('./assets/Font/OpenSans-Italic.ttf'),
    'OpenSans-Regular': require('./assets/Font/OpenSans-Regular.ttf'),
    'OpenSans-SemiBold': require('./assets/Font/OpenSans-SemiBold.ttf'),
    'OpenSans-Bold': require('./assets/Font/OpenSans-Bold.ttf'),
    'Nunito-Regular' : require('./assets/Font/Nunito-Regular.ttf'),
    'Nunito-Italic' : require('./assets/Font/Nunito-Italic.ttf'),
    'Nunito-SemiBold' : require('./assets/Font/Nunito-SemiBold.ttf'),
    'Nunito-Bold' : require('./assets/Font/Nunito-Bold.ttf'),
  });
}

export default function App() {
  const[fontsLoaded, setFontsLoaded] = useState(false);

  if(fontsLoaded) {
    return(
        <Login/>
    );
  } else {
    return (<AppLoading
              startAsync={getFonts}
              onFinish={() => setFontsLoaded(true)}
              />)
  }
}
