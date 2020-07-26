import React from "react";
import { View, Text } from "react-native";
import { globalFontStyles } from "../../../Component/GlobalFont";
const WordSpreader = ({ color, title }) => {
  return (
    <View style={{ flex: 1, left: 1 }}>
      <Text
        style={{ ...globalFontStyles.NSB_11, color: color, left: 2, bottom: 3 }}
      >
        {title ? title : " "}
      </Text>
    </View>
  );
};

export default WordSpreader;
