import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalFontStyles } from "./GlobalFont";

const PrereqButton = (props) => {
  return (
    <TouchableOpacity
      style={ ...styles.main }
      activeOpacity={0.875}
      onPress={() => props.transition()}
    >
      <Text style={{ ...globalFontStyles.OSSB_12, color: "white" }}>
        {props.text}
      </Text>
      <View>{props.icon}</View>
    </TouchableOpacity>
  );
};

export default PrereqButton;

const styles = StyleSheet.create({
  main: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    height: 20,
    width: 40,
    borderRadius: 10,
    backgroundColor: "#FF6B6B",
  },
});
