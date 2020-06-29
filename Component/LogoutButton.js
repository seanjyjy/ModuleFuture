import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  NativeModules,
  Alert,
} from "react-native";
import React from "react";
import { globalFontStyles } from "./GlobalFont";
import { useSafeArea } from "react-native-safe-area-context";
import { log } from "react-native-reanimated";

const LogoutButton = (props) => {
  return (
    <TouchableOpacity
      style={styles.buttonDesign}
      activeOpacity={0.875}
      // TEMPORARY SOLUTION TO THE LOG OUT
      onPress={() => props.func()}
    >
      <Text style={{ ...globalFontStyles.OSSB_17, color: "white" }}>
        Logout
      </Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;
const screenwidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  buttonDesign: {
    height: 40,
    backgroundColor: "#FB5581",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    borderRadius: 10,
    width: screenwidth * 0.845,
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
