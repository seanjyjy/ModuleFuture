import React from "react";
import { StyleSheet, View, ImageBackground} from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
const BackgroundFaded = (props) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/loginbackgroundtest4.png")}
        style={styles.image}
      >
        {props.children}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: hp("100%"),
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
});

export default BackgroundFaded;
