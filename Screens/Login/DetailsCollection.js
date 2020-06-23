import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import BackgroundFaded from "../Backgrounds/BackgroundFaded";
import { globalFontStyles } from "../../Component/GlobalFont";
import SignInButton from "../../Component/SignInButton";
import ChoosingOptions from "../../Component/MakingClock";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const DetailsCollection = () => {
  const navigation = useNavigation();
  const createAccount = () => navigation.navigate("Homepage");

  let pos = 0;

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
      } else {
        setCS(nonFilledButton(val));
        pos = 0;
      }
    } else if (val === "Business Analytics") {
      if (num === 1) {
        setBA(FilledButton(val));
        deSelect(pos);
        pos = 2;
      } else {
        setBA(nonFilledButton(val));
        pos = 0;
      }
    } else if (val === "Information Systems") {
      if (num === 1) {
        setISys(FilledButton(val));
        deSelect(pos);
        pos = 3;
      } else {
        setISys(nonFilledButton(val));
        pos = 0;
      }
    } else if (val === "Information Security") {
      if (num === 1) {
        setISec(FilledButton(val));
        deSelect(pos);
        pos = 4;
      } else {
        setISec(nonFilledButton(val));
        pos = 0;
      }
    } else {
      if (num === 1) {
        setCE(FilledButton(val));
        deSelect(pos);
        pos = 5;
      } else {
        setCE(nonFilledButton(val));
        pos = 0;
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

  const below = () => (
    <SignInButton func={() => switchToAddInfo()}>
      <Text style={{ ...globalFontStyles.OSSB_17, color: "white" }}>
        Continue
      </Text>
    </SignInButton>
  );

  const createAcc = () => (
    <SignInButton func={() => createAccount()}>
      <Text style={{ ...globalFontStyles.OSSB_17, color: "white" }}>Done</Text>
    </SignInButton>
  );

  const [textHeader, setTextHeader] = useState("Course");
  const [bot, setBot] = useState(below);
  const [truth, setTruth] = useState(true);
  const [newPos, setNewPos] = useState({
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  });

  const switchToAddInfo = () => {
    setTextHeader("Additional\nDetails");
    setBot(createAcc);
    setTruth(false);
    setNewPos({
      flex: 2,
      justifyContent: "center",
      alignItems: "center",
      bottom: 0.2 * height,
    });
  };

  const courseinfo = (
    <View style={{ flex: 1 }}>
      {CS}
      {BA}
      {ISys}
      {ISec}
      {CE}
    </View>
  );

  const additionalinfo = (
    <View style={{ flex: 1 }}>
      <ChoosingOptions />
    </View>
  );

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
          {textHeader}
        </Text>
      </View>
      <View style={{ flex: 5 }}>{truth ? courseinfo : additionalinfo}</View>
      <View style={newPos}>{bot}</View>
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
