import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { globalFontStyles } from "../../../../Component/GlobalFont";
const Tabs = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => props.func()}
      style={{
        flex: 1,
        flexDirection: "row",
        ...props.viewDesign,
      }}
    >
      <View style={{ ...styles.iconContainer, ...props.iconStyle }}>
        {props.icon}
      </View>
      <View style={{ ...styles.wordContainer, ...props.wordStyle }}>
        <Text style={styles.textStyle}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  wordContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  textStyle: {
    ...globalFontStyles.NB_14,
    color: "#726F6F",
    left: 20,
  },
});
