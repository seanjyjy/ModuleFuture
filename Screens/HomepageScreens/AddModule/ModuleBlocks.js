import React from "react";
import { View, Dimensions } from "react-native";

const width = Dimensions.get("window").width;

const ModuleBlocks = ({ color, sum }) => {
  const widthToUse = sum !== 0 ? (0.9 * width - 50 - sum * 2) / sum : 0;
  return (
    <View style={{ marginHorizontal: 2 }}>
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
