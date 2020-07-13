import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-eva-icons";
import { globalFontStyles } from "../../../Component/GlobalFont";

export const NotPressed = (props) => (
  <TouchableOpacity
    style={styles.unpressed}
    activeOpacity={0.85}
    onPress={() => props.transition()}
  >
    <Text style={{ ...globalFontStyles.OSSB_14, color: "#00000080" }}>
      {props.text}
    </Text>
    <Icon name="checkmark-outline" width={25} height={25} fill="white" />
  </TouchableOpacity>
);

export const Pressed = (props) => (
  <TouchableOpacity
    style={{
      ...styles.unpressed,
      borderBottomWidth: StyleSheet.hairlineWidth * 2,
    }}
    activeOpacity={0.65}
    onPress={() => props.transition()}
  >
    <Text style={{ ...globalFontStyles.OSSB_14, color: "#232323" }}>
      {props.text}
    </Text>
    <Icon name="checkmark-outline" width={25} height={25} fill="#232323" />
  </TouchableOpacity>
);

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
