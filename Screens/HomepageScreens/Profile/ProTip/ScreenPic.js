import React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const ScreenPic = ({ imageLink }) => {
  return (
    <View style={styles.container}>
      <View style={styles.shadowImage}>
        <Image source={imageLink} style={styles.imageStyling} />
      </View>
    </View>
  );
};

export default ScreenPic;

const styles = StyleSheet.create({
  container: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  shadowImage: {
    width: 0.62 * width,
    height: 0.62 * height,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    alignSelf: "center",
    justifyContent: "center",
  },
  imageStyling: {
    resizeMode: "contain",
    alignSelf: "center",
    width: 0.62 * width,
    height: 0.62 * height,
  },
});
