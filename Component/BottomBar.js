import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { globalFontStyles } from "./GlobalFont";

const width = Dimensions.get("window").width;

const BottomBar = (props) => {
  return (
    <SafeAreaView style={styles.bottomBar}>
      <Text style={{ ...globalFontStyles.OSSB_17, color: "#232323" }}>
        {props.leftText}
      </Text>
      <TouchableOpacity
        style={{ ...styles.addModButton, width: props.size }}
        onPress={() => props.transition()}
      >
        <Text style={{ ...globalFontStyles.OSSB_14, color: "white" }}>
          {props.rightText}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  bottomBar: {
    width: width,
    flexDirection: "row",
    flex: 1,
    height: 60,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "grey",
    backgroundColor: "#F9F9F9",
    position: "absolute",
    bottom: 0,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  addModButton: {
    backgroundColor: "#303030",
    height: 33,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
