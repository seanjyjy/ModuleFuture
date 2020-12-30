import React from "react";
import { View } from "react-native";
import BlocksPerRow from "./BlocksPerRow";

const ModuleWorkloadInformation = ({ arrayToMake }) => {
  let variableLength = arrayToMake.length;
  const arrayMaker = (val) => {
    let arr = [];
    let pos = 0;
    for (let i = 0; i < val; i++) {
      let rowArr = [];
      let pos2 = 0;
      while (pos2 < 10 && pos2 < variableLength) {
        rowArr.push(arrayToMake[pos]);
        pos++;
        pos2++;
      }
      variableLength -= 10;
      arr.push({
        rowArr: rowArr,
      });
    }
    return arr;
  };
  const numbersOfRow = arrayMaker(Math.ceil(arrayToMake.length / 10));

  return (
    <View style={{ flex: 1 }}>
      {numbersOfRow.map(({ rowArr }, index) => (
        <BlocksPerRow key={index} arrayToUse={rowArr} />
      ))}
    </View>
  );
};

export default ModuleWorkloadInformation;
