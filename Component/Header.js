import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ImageBackground,
} from "react-native";
import { globalFontStyles } from "./GlobalFont";
import { useSafeArea } from "react-native-safe-area-context";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const Header = (props) => {
  const inset = useSafeArea();
  return (
    <ImageBackground
      style={{
        ...styles.header,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      }}
      source={require("../assets/HeaderBG.png")}
    >
      <SafeAreaView style={styles.header}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            top: inset.top < 44 ? 15 : 0,
          }}
        >
          {props.leftChildren}
        </View>
        <View
          style={{
            flex: 4,
            justifyContent: "center",
            alignItems: "center",
            top: inset.top < 44 ? 15 : 0,
          }}
        >
          <Text style={{ ...globalFontStyles.OSB_17, color: "#232323" }}>
            {props.str}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            top: inset.top < 44 ? 15 : 0,
          }}
        >
          {props.rightChildren}
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "transparent",
    width: width,
    height: 0.111 * height,
  },
});
