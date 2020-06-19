import React, { useState } from "react";
import { StyleSheet, View, Text, Platform, TextInput } from "react-native";
import Background from "../Backgrounds/Background";
import { globalFontStyles } from "../../Component/GlobalFont";
import { globalStyles } from "../../Component/GlobalStyle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import SignInButton from "../../Component/SignInButton";
import YesNoButton from "../../Component/YesNoButton";
import YesPage from "./YesPage";
import NoPage from "./NoPage";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();
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

  const signIn = () => navigation.navigate("Homepage");

  const middle = {
    key: 1,
    frame: (
        <View style={{ flex: 1 }}>
          <View style={globalStyles.header}>
            <MaterialCommunityIcons
                name="account"
                size={30}
                style={{ ...globalStyles.iconDesign, right: 13 }}
            />
            <TextInput
                placeholder="Username"
                placeholderTextColor="#7F8E9E"
                style={{ ...globalFontStyles.OSR_17, right: 10, flex: 1, top: 7 }}
            />
          </View>
          <View style={{ ...globalStyles.header, top: 10 }}>
            <Ionicons
                name="ios-lock"
                size={34}
                style={{ ...globalStyles.iconDesign, right: 10 }}
            />
            <TextInput
                placeholder="Password"
                placeholderTextColor="#7F8E9E"
                style={{ ...globalFontStyles.OSR_17, right: 2, top: 7, flex: 1 }}
            />
          </View>
          <SignInButton func={() => signIn()}>
            <Text style={{ ...globalFontStyles.OSSB_17, color: "white" }}>
              Sign In
            </Text>
          </SignInButton>
        </View>
    ),
  };

  const [originalMiddle, setNewMiddle] = useState(middle);

  const pressingYesOrNo = (ans) => {
    if (ans === "Yes") {
      setNewMiddle({ key: 3, frame: <YesPage /> });
    } else {
      setNewMiddle({ key: 3, frame: <NoPage /> });
    }
  };

  const nextMiddle = {
    key: 2,
    frame: (
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: "column", flex: 2, bottom: 60 }}>
            <View
                style={{
                  flex: 3,
                  justifyContent: "center",
                  alignItems: "center",
                  bottom: 30,
                }}
            >
              <Text style={{ ...globalFontStyles.NB_28, color: "#7F8E9E" }}>
                Login via NUSnet ID ?
              </Text>
            </View>
            <View style={{ flex: 6, top: Platform.OS === "android" ? 40 : 0 }}>
              <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
              >
                <YesNoButton func={() => pressingYesOrNo("No")}>
                  <Text style={{ ...globalFontStyles.OSSB_17, color: "white" }}>
                    No
                  </Text>
                </YesNoButton>
                <YesNoButton func={() => pressingYesOrNo("Yes")}>
                  <Text style={{ ...globalFontStyles.OSSB_17, color: "white" }}>
                    Yes
                  </Text>
                </YesNoButton>
              </View>
            </View>
          </View>
        </View>
    ),
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