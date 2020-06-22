import React from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

//362
const ratio = 228 / 362;

const width = Dimensions.get("window").width;

export const MARGIN = 20;
export const CARD_HEIGHT = width * 0.8 * ratio + MARGIN * 2;
const { height: wHeight } = Dimensions.get("window");
const height = wHeight - 64;
const styles = StyleSheet.create({
  card: {
    marginVertical: MARGIN,
    alignSelf: "center",
    width: width * 0.8,
    borderRadius: 20,
    overflow: "hidden",
  },
});

const CardWallet = (y, index, card, PageName) => {
  const position = Animated.subtract(index * CARD_HEIGHT, y);
  const isDisappearing = -CARD_HEIGHT;
  const isTop = 0;
  const isBottom = height - CARD_HEIGHT;
  const isAppearing = height;
  const translateY = Animated.add(
    Animated.add(
      y,
      y.interpolate({
        inputRange: [0, 0.00001 + index * CARD_HEIGHT],
        outputRange: [0, -index * CARD_HEIGHT],
        extrapolateRight: "clamp",
      })
    ),
    position.interpolate({
      inputRange: [isBottom, isAppearing],
      outputRange: [0, -CARD_HEIGHT / 4],
      extrapolate: "clamp",
    })
  );
  const scale = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: "clamp",
  });
  const opacity = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
  });
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        justifyContent: "center",
        alignSelf: "center",
        width: 0.8 * width,
        height: CARD_HEIGHT,
      }}
      onPress={() => PageName}
    >
      <Animated.View
        style={[
          styles.card,
          { opacity, transform: [{ translateY }, { scale }] },
        ]}
        key={index}
      >
        {card}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default CardWallet;
