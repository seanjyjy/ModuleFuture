import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import BackgroundFaded from "../Backgrounds/BackgroundFaded";
import { globalFontStyles } from "../../Component/GlobalFont";
import SignInButton from "../../Component/SignInButton";
import { useNavigation } from "@react-navigation/native";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const DetailsCollection = ({ route }) => {
  const valuesReceived = route.params?.item;
  const navigation = useNavigation();

  const courseValue = (val) => {
    return val === 1
      ? "Computer Science"
      : val === 2
      ? "Business Analytics"
      : val === 3
      ? "Information Systems"
      : val === 4
      ? "Information Security"
      : val === 5
      ? "Computer Engineering"
      : "No indication";
  };
  let pos = 0;
  const [pos2, setPos2] = useState(0);
  const nonFilledButton = (props) => (
    <TouchableOpacity
      activeOpacity={0.95}
      style={styles.shape}
      onPress={() => change(1, props)}
    >
      <Text style={{ ...globalFontStyles.OSB_17, color: "#364F6B" }}>
        {props}
      </Text>
    </TouchableOpacity>
  );

  const FilledButton = (props) => (
    <TouchableOpacity
      activeOpacity={0.95}
      style={styles.newShape}
      onPress={() => change(2, props)}
    >
      <Text style={{ ...globalFontStyles.OSB_17, color: "white" }}>
        {props}
      </Text>
    </TouchableOpacity>
  );

  const [CS, setCS] = useState(nonFilledButton("Computer Science"));
  const [BA, setBA] = useState(nonFilledButton("Business Analytics"));
  const [ISys, setISys] = useState(nonFilledButton("Information Systems"));
  const [ISec, setISec] = useState(nonFilledButton("Information Security"));
  const [CE, setCE] = useState(nonFilledButton("Computer Engineering"));

  // allow toggling between buttons
  const change = (num, val) => {
    if (val === "Computer Science") {
      if (num === 1) {
        setCS(FilledButton(val));
        deSelect(pos);
        pos = 1;
        setPos2(1);
      } else {
        setCS(nonFilledButton(val));
        pos = 0;
        setPos2(0);
      }
    } else if (val === "Business Analytics") {
      if (num === 1) {
        setBA(FilledButton(val));
        deSelect(pos);
        pos = 2;
        setPos2(2);
      } else {
        setBA(nonFilledButton(val));
        pos = 0;
        setPos2(0);
      }
    } else if (val === "Information Systems") {
      if (num === 1) {
        setISys(FilledButton(val));
        deSelect(pos);
        pos = 3;
        setPos2(3);
      } else {
        setISys(nonFilledButton(val));
        pos = 0;
        setPos2(0);
      }
    } else if (val === "Information Security") {
      if (num === 1) {
        setISec(FilledButton(val));
        deSelect(pos);
        pos = 4;
        setPos2(4);
      } else {
        setISec(nonFilledButton(val));
        pos = 0;
        setPos2(0);
      }
    } else {
      if (num === 1) {
        setCE(FilledButton(val));
        deSelect(pos);
        pos = 5;
        setPos2(5);
      } else {
        setCE(nonFilledButton(val));
        pos = 0;
        setPos2(0);
      }
    }
  };

  // allow  deselecting of buttons
  const deSelect = (num) => {
    if (num === 1) {
      setCS(nonFilledButton("Computer Science"));
    } else if (num === 2) {
      setBA(nonFilledButton("Business Analytics"));
    } else if (num === 3) {
      setISys(nonFilledButton("Information Systems"));
    } else if (num === 4) {
      setISec(nonFilledButton("Information Security"));
    } else if (num === 5) {
      setCE(nonFilledButton("Computer Engineering"));
    }
  };

  return (
    <BackgroundFaded>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            ...globalFontStyles.OSEB_34,
            color: "#686868",
            left: 30,
            top: 30,
          }}
        >
          Course
        </Text>
      </View>
      <View style={{ flex: 5 }}>
        <View style={{ flex: 1 }}>
          {CS}
          {BA}
          {ISys}
          {ISec}
          {CE}
        </View>
      </View>
      <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
        <SignInButton
          func={() => {
            navigation.navigate("ChoosingOptions", {
              item: [valuesReceived, courseValue(pos2)],
            });
          }}
        >
          <Text style={{ ...globalFontStyles.OSSB_17, color: "white" }}>
            Continue
          </Text>
        </SignInButton>
      </View>
    </BackgroundFaded>
  );
};

const styles = StyleSheet.create({
  shape: {
    width: 0.95 * width,
    height: 0.09 * height,
    borderRadius: 40,
    borderColor: "#364F6B",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  newShape: {
    margin: 10,
    width: 0.95 * width,
    height: 0.09 * height,
    borderRadius: 40,
    borderColor: "#364F6B",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#364F6B",
  },
});
export default DetailsCollection;
