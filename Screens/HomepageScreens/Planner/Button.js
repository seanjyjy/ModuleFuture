import React from "react";
import { View, Text } from "react-native";

const Button = ({ wrapperStyle, style, ...rest }) => (
  <View
    style={{
      padding: 10,
      ...wrapperStyle,
    }}
  >
    <Text
      style={{
        color: "#FB5581",
        ...style,
      }}
      {...rest}
    />
  </View>
);

export default Button;
