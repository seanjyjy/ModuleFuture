import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { globalFontStyles } from "./GlobalFont";

const height = Dimensions.get("window").height;

const AddYourOwn = (props) => (
  <TouchableOpacity
    style={styles.buttonDesign}
    activeOpacity={0.875}
    onPress={() => props.func()}
  >
    <Text style={{ ...globalFontStyles.NBEB_15, color: "white" }}>
      Add type
    </Text>
  </TouchableOpacity>
);

export default AddYourOwn;

const styles = StyleSheet.create({
  buttonDesign: {
    height: 30,
    backgroundColor: "#FB5581",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    width: 160,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});
