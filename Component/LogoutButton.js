import { StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import React from "react";

const LogoutButton = (props) => {
  return (
    <TouchableOpacity
      style={styles.buttonDesign}
      activeOpacity={0.875}
      onPress={() => props.func()}
    >
      {props.children}
    </TouchableOpacity>
  );
};

export default LogoutButton;
const screenwidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  buttonDesign: {
    height: 33,
    backgroundColor: "#FB5581",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginTop: 400,
    borderRadius: 10,
    width: 350,
    elevation: 10,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.1,
  },
});
