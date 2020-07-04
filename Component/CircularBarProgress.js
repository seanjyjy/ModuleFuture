import React, { useState, useEffect } from "react";
import { View, Dimensions, StyleSheet, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { globalFontStyles } from "./GlobalFont";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const CircularBarProgress = (props) => {
  const {
    size,
    progress,
    strokeWidth,
    circleOuterStroke,
    circleInnerStroke,
    numerator,
    denominator,
  } = props;

  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const progressOffset = ((100 - progress) / 100) * circumference;
    setOffset(progressOffset);
  }, [progress, offset, circumference, setOffset]);

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          alignItems: "center",
          justifyContent: "center",
        },
        {
          transform: [{ rotate: "270deg" }],
        },
      ]}
    >
      <View
        style={{
          height: 0.053 * width,
          width: 0.25 * height,
          top: 0.24 * width,
          justifyContent: "center",
          alignItems: "center",
          transform: [{ rotate: "90deg" }],
        }}
      >
        <Text
          style={{
            ...globalFontStyles.NB_17,
            color: "#686868",
            bottom: 5,
            right: 5,
          }}
        >
          {numerator} {" / "}
          {denominator}
        </Text>
      </View>
      <Svg height="100%" width="100%" style={{ left: 0.02 * height }}>
        <Circle
          stroke={circleInnerStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          fill="none"
        />
        <Circle
          stroke={circleOuterStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="none"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
};

export default CircularBarProgress;

const styles = StyleSheet.create({});
