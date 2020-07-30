import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Svg, { Path, Rect } from "react-native-svg";
import Animated, {
  Value,
  cond,
  divide,
  eq,
  modulo,
  pow,
  set,
  useCode,
} from "react-native-reanimated";
import {
  canvas2Polar,
  clamp,
  onGestureEvent,
  vec,
  withOffset,
} from "react-native-redash";

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const quadraticIn = (t) => pow(t, 2);
const { width } = Dimensions.get("window");
const PICKER_WIDTH = 30;
const STROKE_WIDTH = 4;
const CANVAS_SIZE = width - PICKER_WIDTH * 2;
const CENTER = {
  x: CANVAS_SIZE / 2,
  y: CANVAS_SIZE / 2,
};

export default ({ h, s, backgroundColor }) => {
  const state = new Value(State.UNDETERMINED);
  const translation = vec.createValue(0, 0);
  const offset = {
    x: withOffset(translation.x, state),
    y: withOffset(translation.y, state),
  };
  const v2 = vec.add(offset, CENTER);
  const polar = canvas2Polar(v2, CENTER);
  const l = {
    theta: polar.theta,
    radius: clamp(polar.radius, 0, CANVAS_SIZE / 2),
  };
  const hue = divide(modulo(l.theta, 2 * Math.PI), 2 * Math.PI);
  const saturation = cond(
    eq(l.radius, 0),
    0,
    divide(l.radius, CANVAS_SIZE / 2)
  );
  useCode(() => [set(h, hue), set(s, quadraticIn(saturation))], [
    h,
    hue,
    s,
    saturation,
  ]);
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        top: 20,
      }}
    >
      <Svg width="100" height="100" viewBox="0 0 100 100" style={{ right: 25 }}>
        <AnimatedRect
          width="90"
          height="50"
          stroke="#B5B5B5"
          fill={backgroundColor}
          stroke-width={STROKE_WIDTH}
          fillRule="evenodd"
        />
      </Svg>
    </View>
  );
};
