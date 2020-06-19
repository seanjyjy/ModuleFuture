import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Header from "../../../Component/Header";
import { Icon } from "react-native-eva-icons";
import { globalFontStyles } from "../../../Component/GlobalFont";
import SuggestButton from "../../../Component/SuggestButton";

const Focus = ({ navigation }) => {
  const NotPressed = (props) => (
    <TouchableOpacity
      style={styles.unpressed}
      activeOpacity={0.85}
      onPress={() => activate(props)}
    >
      <Text style={{ ...globalFontStyles.OSSB_17, color: "#00000080" }}>
        {props}
      </Text>
      <Icon name="square-outline" width={25} height={25} fill="#00000080" />
    </TouchableOpacity>
  );
  const Pressed = (props) => (
    <TouchableOpacity
      style={styles.Pressed}
      activeOpacity={0.65}
      onPress={() => deactivate(props)}
    >
      <Text style={{ ...globalFontStyles.OSSB_17, color: "#232323" }}>
        {props}
      </Text>
      <Icon name="checkmark-square-2" width={25} height={25} fill="#232323" />
    </TouchableOpacity>
  );

  const [CS, setCS] = useState(NotPressed("Algorithms and Theory"));
  const [BA, setBA] = useState(NotPressed("Artificial Intelligence"));
  const [IS, setIS] = useState(NotPressed("Computer Graphics and Games"));
  const [InfoSec, setInfoSec] = useState(NotPressed("Computer Security"));
  const [CEG, setCEG] = useState(NotPressed("Database Systems"));

  const activate = (props) => {
    if (props === "Algorithms and Theory") {
      setCS(Pressed("Algorithms and Theory"));
    } else if (props === "Artificial Intelligence") {
      setBA(Pressed("Artificial Intelligence"));
    } else if (props === "Computer Graphics and Games") {
      setIS(Pressed("Computer Graphics and Games"));
    } else if (props === "Computer Security") {
      setInfoSec(Pressed("Computer Security"));
    } else if (props === "Database Systems") {
      setCEG(Pressed("Database Systems"));
    }
  };

  const deactivate = (props) => {
    if (props === "Algorithms and Theory") {
      setCS(NotPressed("Algorithms and Theory"));
    } else if (props === "Artificial Intelligence") {
      setBA(NotPressed("Artificial Intelligence"));
    } else if (props === "Computer Graphics and Games") {
      setIS(NotPressed("Computer Graphics and Games"));
    } else if (props === "Computer Security") {
      setInfoSec(NotPressed("Computer Security"));
    } else if (props === "Database Systems") {
      setCEG(NotPressed("Database Systems"));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        str={"Focus Area"}
        leftChildren={
          <Icon
            name="chevron-left-outline"
            width={100}
            height={30}
            fill="#232323"
            onPress={() => navigation.goBack()}
          />
        }
        rightChildren={
          <SuggestButton
            func={() => {
              navigation.goBack();
            }}
          />
        }
      />
      <View style={{ paddingLeft: 20, paddingRight: 25 }}>
        {CS}
        {BA}
        {IS}
        {InfoSec}
        {CEG}
      </View>
    </SafeAreaView>
  );
};

export default Focus;

const styles = StyleSheet.create({
  unpressed: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingBottom: 12,
  },
  Pressed: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingBottom: 12,
  },
});
