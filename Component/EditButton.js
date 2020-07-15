import { StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";
import React from "react";
import { globalFontStyles } from "./GlobalFont";

const EditButton = (props) => {
  return (
    <TouchableOpacity
      style={styles.buttonDesign}
      activeOpacity={0.875}
      onPress={() => props.func()}
    >
      <Text
        style={{
          ...globalFontStyles.OSSB_12,
          color: "#68686880",
          textDecorationLine: "underline",
        }}
      >
        Edit
      </Text>
    </TouchableOpacity>
  );
};

export default EditButton;
const styles = StyleSheet.create({
  buttonDesign: {
    height: 35,
    width: 28,
    // backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
    left: "88%",
    bottom: "1%",
  },
});
