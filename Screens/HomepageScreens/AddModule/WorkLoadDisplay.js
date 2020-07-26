import React from "react";
import { View } from "react-native";
import WordSpreader from "./WordSpreader";
import ModuleBlocks from "./ModuleBlocks";

const WorkLoadDisplay = ({ arrayToMake, sum, array }) => {
  return (
    <>
      <WordSpreader arrayToMake={arrayToMake} array={array} sum={sum} />
      <View style={{ flexDirection: "row" }}>
        {arrayToMake.map(({ color }, index) => (
          <ModuleBlocks color={color} key={index} sum={sum} />
        ))}
      </View>
    </>
  );
};

export default WorkLoadDisplay;
