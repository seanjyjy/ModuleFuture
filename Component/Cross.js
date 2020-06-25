import React from "react";
import { Text, View } from "react-native";
import { Icon } from "react-native-eva-icons";
import { globalFontStyles } from "./GlobalFont";

const Cross = (props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        // flex: 1,
        top: props.top,
        alignItems: "center",
        left: props.left,
      }}
    >
      <Icon
        fill="#666666"
        width={30}
        height={22}
        name="close-outline"
        onPress={() => props.transition()}
      />
      <Text
        style={{
          ...globalFontStyles.OSB_15,
          color: "#666666",
          marginLeft: 10,
        }}
      >
        {props.text}
      </Text>
    </View>
  );
};

export default Cross;
