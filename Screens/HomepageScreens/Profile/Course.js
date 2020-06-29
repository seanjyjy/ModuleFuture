import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Header from "../../../Component/Header";
import { Icon } from "react-native-eva-icons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { globalFontStyles } from "../../../Component/GlobalFont";

/**
 * TODO: Retrieve info from firebase?
 * TODO: Set course with firebase + update records/planner page accordingly with firebase
 */

const Course = ({ navigation }) => {
  const NotPressed = (props) => (
    <TouchableOpacity
      style={styles.unpressed}
      activeOpacity={0.85}
      onPress={() => change(props)}
    >
      <Text style={{ ...globalFontStyles.OSSB_14, color: "#00000080" }}>
        {props}
      </Text>
      <Icon name="checkmark-outline" width={25} height={25} fill="white" />
    </TouchableOpacity>
  );
  const Pressed = (props) => (
    <TouchableOpacity
      style={{
        ...styles.unpressed,
        borderBottomWidth: StyleSheet.hairlineWidth * 2,
      }}
      activeOpacity={0.65}
      onPress={() => change(props)}
    >
      <Text style={{ ...globalFontStyles.OSSB_14, color: "#232323" }}>
        {props}
      </Text>
      <Icon name="checkmark-outline" width={25} height={25} fill="#232323" />
    </TouchableOpacity>
  );

  let current = 0;
  const [CS, setCS] = useState(Pressed("Computer Science"));
  const [BA, setBA] = useState(NotPressed("Business Analytics"));
  const [IS, setIS] = useState(NotPressed("Information Systems"));
  const [InfoSec, setInfoSec] = useState(NotPressed("Information Security"));
  const [CEG, setCEG] = useState(NotPressed("Computer Engineering"));

  const deSelect = (current) => {
    if (current === 0) {
      setCS(NotPressed("Computer Science"));
    } else if (current === 1) {
      setBA(NotPressed("Business Analytics"));
    } else if (current === 2) {
      setIS(NotPressed("Information Systems"));
    } else if (current === 3) {
      setInfoSec(NotPressed("Information Security"));
    } else {
      setCEG(NotPressed("Computer Engineering"));
    }
  };

  const change = (props) => {
    if (props === "Computer Science" && current !== 0) {
      setCS(Pressed("Computer Science"));
      deSelect(current);
      current = 0;
    } else if (props === "Business Analytics" && current !== 1) {
      setBA(Pressed("Business Analytics"));
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
    <View style={{ flex: 1 }}>
      <Header
        str={"Course"}
        leftChildren={
          <Ionicons
            name="md-arrow-round-back"
            size={25}
            style={{ color: "#232323" }}
            onPress={() => navigation.goBack()}
          />
        }
        rightChildren={<View />}
      />
      <View style={{ paddingLeft: 20, paddingRight: 25 }}>
        {CS}
        {BA}
        {IS}
        {InfoSec}
        {CEG}
      </View>
    </View>
  );
};

export default Course;

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
});
