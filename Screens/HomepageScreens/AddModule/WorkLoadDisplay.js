import React from "react";
import { View } from "react-native";
import WordSpreader from "./WordSpreader";
import ModuleBlocks from "./ModuleBlocks";

const WorkLoadDisplay = ({ arrayToMake, sum }) => {
  return (
    <>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        {arrayToMake.map(({ color, title }, index) => (
          <WordSpreader title={title} key={index} color={color} />
        ))}
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        {arrayToMake.map(({ color }, index) => (
          <ModuleBlocks color={color} key={index} sum={sum} />
        ))}
      </View>
    </>
  );
};

export default WorkLoadDisplay;
