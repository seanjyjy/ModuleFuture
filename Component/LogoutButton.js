import { StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";
import { globalFontStyles } from "./GlobalFont";

const LogoutButton = (props) => {
  return (
    <TouchableOpacity
      style={styles.buttonDesign}
      activeOpacity={0.875}
      onPress={() => props.func()}
    >
      <Text style={{ ...globalFontStyles.OSSB_17, color: "white" }}>
        Logout
      </Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  buttonDesign: {
    height: 40,
    backgroundColor: "#FB5581",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 25,
    borderRadius: 10,
    width: "95%",
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
