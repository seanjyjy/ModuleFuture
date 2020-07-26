import React from "react";
import { View, Dimensions, Text } from "react-native";
import { globalFontStyles } from "../../../Component/GlobalFont";
const width = Dimensions.get("window").width;
const ModuleBlocks = ({ color, sum }) => {
  const widthToUse = sum !== 0 ? (0.9 * width - 50 - sum * 2) / sum : 0;
  return (
    <View style={{ marginHorizontal: 1 }}>
      <View
        style={{
          backgroundColor: color,
          width: widthToUse,
          height: 30,
        }}
      />
    </View>
  );
};

export default ModuleBlocks;
