import React from "react";
import { View, Text } from "react-native";
import { globalFontStyles } from "../../../Component/GlobalFont";

const BlocksPerRow = ({ arrayToUse }) => {
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      {arrayToUse.map(({ color, title, value }, index) => (
        <View key={index}>
          <Text style={{ ...globalFontStyles.NSB_11, color: color, left: 2 }}>
            {title === "" ? " " : title}
          </Text>
          <View style={{ marginHorizontal: 2 }}>
            <View
              style={{
                backgroundColor: "white",
                width: 27,
                height: (1 - value) * 27,
              }}
            />
            <View
              style={{
                backgroundColor: color,
                width: 27,
                height: value * 27,
              }}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

export default BlocksPerRow;
