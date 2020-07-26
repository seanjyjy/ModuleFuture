import React from "react";
import { View, Text, Dimensions } from "react-native";
import { globalFontStyles } from "../../../Component/GlobalFont";
const width = Dimensions.get("window").width;
const WordSpreader = ({ arrayToMake, array, sum }) => {
  let index = 0;
  const widthToUse = sum !== 0 ? (0.9 * width - 50 - sum * 2) / sum : 0;
  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      {array.map((x) => {
        if (x !== 0) {
          const toReturn = (
            <View
              style={{
                width: widthToUse * x + 4 * x,
                justifyContent: "center",
              }}
              key={index}
            >
              <Text
                style={{
                  ...globalFontStyles.NSB_11,
                  color: arrayToMake[Math.floor(index)].color,
                  bottom: 3,
                  left: 2,
                }}
              >
                {arrayToMake[Math.floor(index)].title}
              </Text>
            </View>
          );
          index = index + x;
          return toReturn;
        }
      })}
    </View>
  );
};

export default WordSpreader;
