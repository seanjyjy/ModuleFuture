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
  <View
    style={{
      marginTop: 40,
      marginBottom: height * 0.12,
      alignItems: "center",
    }}
  >
    <Text
      style={{
        ...globalFontStyles.OSB_15,
        color: "#434343",
        textAlign: "center",
      }}
    >
      {`Unable to find a ${props.text}?`}
    </Text>
    <TouchableOpacity
      style={styles.buttonDesign}
      activeOpacity={0.875}
      onPress={() => props.func()}
    >
      <Text style={{ ...globalFontStyles.NBEB_15, color: "white" }}>
        Add your own!
      </Text>
    </TouchableOpacity>
  </View>
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
