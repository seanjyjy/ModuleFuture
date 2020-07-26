import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  View,
} from "react-native";
import { globalFontStyles } from "./GlobalFont";
import { useSafeArea } from "react-native-safe-area-context";

const width = Dimensions.get("window").width;

const BottomBar = (props) => {
  return (
    <View
      style={{
        ...styles.bottomBar,
        height: 60 + (useSafeArea().bottom > 0 ? useSafeArea().bottom - 5 : 0),
      }}
    >
      <TouchableOpacity
        onPress={() => props.clearAll()}
        activeOpacity={props.opacity}
      >
        <Text
          style={{
            ...(props.leftTextSize === undefined
              ? globalFontStyles.OSSB_17
              : globalFontStyles.OSSB_16),
            color: "#232323",
            bottom:
              useSafeArea().bottom > 0 ? (useSafeArea().bottom - 5) / 2 : 0,
          }}
        >
          {props.leftText}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          ...styles.addModButton,
          width: props.size,
          bottom: useSafeArea().bottom > 0 ? (useSafeArea().bottom - 5) / 2 : 0,
        }}
        onPress={() => props.transition()}
      >
        <Text style={{ ...globalFontStyles.OSSB_14, color: "white" }}>
          {props.rightText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  bottomBar: {
    width: width,
    flexDirection: "row",
    flex: 1,
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
