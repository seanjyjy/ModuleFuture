import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const ScreenPic = ({ imageLink }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={imageLink}
        style={{
          justifyContent: "center",
          alignSelf: "center",
          alignItems: "center",
          width: 0.9 * width,
          height: 0.62 * height,
        }}
      >
        <Text>hello world</Text>
      </ImageBackground>
    </View>
  );
};

export default ScreenPic;

const styles = StyleSheet.create({
  container: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
});
