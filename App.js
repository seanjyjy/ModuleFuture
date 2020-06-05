import React, {useState} from 'react';
import Login from "./Screens/Login.js";
import * as Font from 'expo-font';
import {AppLoading} from "expo";

const getFonts = () => {
  return Font.loadAsync({
    'OpenSans-Italic': require('./assets/Font/OpenSans-Italic.ttf'),
    'OpenSans-Regular': require('./assets/Font/OpenSans-Regular.ttf')
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
