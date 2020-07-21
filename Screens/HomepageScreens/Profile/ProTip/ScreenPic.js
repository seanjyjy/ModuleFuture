import React from "react";
import { View, StyleSheet, Dimensions, ImageBackground } from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const ScreenPic = ({ imageLink }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={imageLink} style={styles.imageStyling} />
    </View>
  );
};

export default ScreenPic;

const styles = StyleSheet.create({
  container: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
  },
  imageStyling: {
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    width: 0.605 * width,
    height: 0.59 * height,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
