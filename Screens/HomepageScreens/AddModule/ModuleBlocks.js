import React from "react";
import { View, Dimensions, Text, Platform } from "react-native";
import { globalFontStyles } from "../../../Component/GlobalFont";
const width = Dimensions.get("window").width;
const ModuleBlocks = ({ color, title, sum }) => {
  const widthToUse = (0.9 * width - 50 - sum * 2) / sum;
  return (
    <View>
      <Text
        style={{ ...globalFontStyles.NSB_11, color: color, left: 2, bottom: 3 }}
      >
        {title ? title : " "}
      </Text>
      <View
        style={{
          backgroundColor: color,
          width: widthToUse,
          height: 30,
          marginHorizontal: 2,
          //bottom: title !== "" ? (Platform.OS === "android" ? 0.5 : 1) : 0,
        }}
      />
    </View>
  );
};

export default ModuleBlocks;
