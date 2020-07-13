import React, { useState } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import Background from "../Backgrounds/Background";
import { globalFontStyles } from "../../Component/GlobalFont";
import NoPage from "./NoPage";
import LoginAuth from "./LoginAuth";

const Login = () => {
  const [firstHeader, setFirstHeader] = useState({
    color: "#FC5185",
    ...globalFontStyles.OSSB_17,
  });
  const [secondHeader, setSecondHeader] = useState({
    color: "#2D4056",
    ...globalFontStyles.OSSB_17,
  });
  const [leftBar, setLeftBar] = useState({
    ...styles.horizontalLine,
    right: 53,
    backgroundColor: "#FC5185",
  });
  const [rightBar, setRightBar] = useState({
    ...styles.horizontalLine,
    left: 48,
    backgroundColor: "white",
  });
  const [bottomText, setBottomText] = useState({
    firstText: "Don't have an account?",
    secondText: "Sign up",
  });

  const middle = {
    key: 1,
    frame: <LoginAuth />,
  };

  const [originalMiddle, setNewMiddle] = useState(middle);

  const nextMiddle = {
    key: 2,
    frame: <NoPage />,
  };

  const pressingSignUp = (value) => {
    if (value === 1) {
      setFirstHeader({ color: "#2D4056", ...globalFontStyles.OSSB_17 });
      setSecondHeader({ color: "#FC5185", ...globalFontStyles.OSSB_17 });
      setLeftBar({
        ...styles.horizontalLine,
        right: 53,
        backgroundColor: "white",
      });
      setRightBar({
        ...styles.horizontalLine,
        left: 48,
        backgroundColor: "#FC5185",
      });
      setBottomText({
        firstText: "Already have an account?",
        secondText: "Sign in",
      });
      setNewMiddle(nextMiddle);
    } else {
      setFirstHeader({ color: "#FC5185", ...globalFontStyles.OSSB_17 });
      setSecondHeader({ color: "#2D4056", ...globalFontStyles.OSSB_17 });
      setLeftBar({
        ...styles.horizontalLine,
        right: 53,
        backgroundColor: "#FC5185",
      });
      setRightBar({
        ...styles.horizontalLine,
        left: 48,
        backgroundColor: "white",
      });
      setBottomText({
        firstText: "Don't have an account?",
        secondText: "Sign up",
      });
      setNewMiddle(middle);
    }
  };

  return (
    <Background>
      <View style={{ flex: Platform.OS === "android" ? 9 : 8 }}>
        <View style={styles.one}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: 200,
            }}
          >
            <View>
              <Text style={firstHeader}>Sign In</Text>
            </View>
            <View style={styles.verticalLine} />
            <View>
              <Text style={secondHeader}>Sign Up</Text>
            </View>
          </View>
          <View style={leftBar} />
          <View style={rightBar} />
        </View>
      </View>

      <View style={{ flex: 14 }}>{originalMiddle.frame}</View>

      <View style={styles.textHeight}>
        <Text style={{ ...globalFontStyles.OSI_15, color: "#6e6e6e" }}>
          {bottomText.firstText}
        </Text>
        <Text
          onPress={() => {
            pressingSignUp(originalMiddle.key);
          }}
          style={{
            ...globalFontStyles.OSR_15,
            marginLeft: 5,
            color: "#fb5581",
            paddingRight: 5,
          }}
        >
          {bottomText.secondText}
        </Text>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  textHeight: {
    flex: Platform.OS === "android" ? 0.75 : 2,
    flexDirection: "row",
    justifyContent: "center",
  },
  one: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  verticalLine: {
    backgroundColor: "#2D4056",
    width: 2,
    height: 20,
    top: 4,
  },
  horizontalLine: {
    width: 55,
    height: 2,
    top: 5,
  },
});
export default Login;
