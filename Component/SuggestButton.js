import { StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";
import { globalFontStyles } from "./GlobalFont";

const SuggestButton = () => {
  return (
    <TouchableOpacity
      style={styles.buttonDesign}
      activeOpacity={0.875}
      onPress={() => props.func()}
    >
      <Text style={{ ...globalFontStyles.OSSB_15, color: "white" }}>Edit</Text>
    </TouchableOpacity>
  );
};

export default SuggestButton;
const styles = StyleSheet.create({
  buttonDesign: {
    height: 28,
    backgroundColor: "#FB5581",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    width: 80,
    top: 1,
    marginRight: 50,
    elevation: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    shadowColor: "#000",
  },
});
