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

/**
 * TODO: Retrieve info from firebase?
 * TODO: Set course with firebase + update records/planner page accordingly with firebase
 */

const Focus = ({ navigation }) => {
  const NotPressed = (props) => (
    <TouchableOpacity
      style={styles.unpressed}
      activeOpacity={0.85}
      onPress={() => change(props)}
    >
      <Text style={{ ...globalFontStyles.OSSB_17, color: "#00000080" }}>
        {props}
      </Text>
      <Icon name="square-outline" width={25} height={25} fill="#232323" />
    </TouchableOpacity>
  );
  const Pressed = (props) => (
    <TouchableOpacity
      style={styles.Pressed}
      activeOpacity={0.65}
      onPress={() => change(props)}
    >
      <Text style={{ ...globalFontStyles.OSSB_17, color: "#232323" }}>
        {props}
      </Text>
      <Icon name="checkmark-square-2" width={25} height={25} fill="#232323" />
    </TouchableOpacity>
  );

  let current = 0;
  const [CS, setCS] = useState(Pressed("Algorithms and Theory"));
  const [BA, setBA] = useState(NotPressed("Artificial Intelligence"));
  const [IS, setIS] = useState(NotPressed("Information Systems"));
  const [InfoSec, setInfoSec] = useState(NotPressed("Information Security"));
  const [CEG, setCEG] = useState(NotPressed("Computer Engineering"));

  const deSelect = (current) => {
    if (current === 0) {
      setCS(NotPressed("Algorithms and Theory"));
    } else if (current === 1) {
      setBA(NotPressed("Artificial Intelligence"));
    } else if (current === 2) {
      setIS(NotPressed("Information Systems"));
    } else if (current === 3) {
      setInfoSec(NotPressed("Information Security"));
    } else {
      setCEG(NotPressed("Computer Engineering"));
    }
  };

  const change = (props) => {
    if (props === "Algorithms and Theory" && current !== 0) {
      setCS(Pressed("Algorithms and Theory"));
      deSelect(current);
      current = 0;
    } else if (props === "Artificial Intelligence" && current !== 1) {
      setBA(Pressed("Artificial Intelligence"));
      deSelect(current);
      current = 1;
    } else if (props === "Information Systems" && current !== 2) {
      setIS(Pressed("Information Systems"));
      deSelect(current);
      current = 2;
    } else if (props === "Information Security" && current !== 3) {
      setInfoSec(Pressed("Information Security"));
      deSelect(current);
      current = 3;
    } else if (props === "Computer Engineering" && current !== 4) {
      setCEG(Pressed("Computer Engineering"));
      deSelect(current);
      current = 4;
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
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomEndRadius: 13,
    borderBottomStartRadius: 16,
  },
  Pressed: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 18.5,
    paddingBottom: 11,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomEndRadius: 13,
    borderBottomStartRadius: 16,
  },
});
