import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Platform,
} from "react-native";
import { globalFontStyles } from "./GlobalFont";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const Header = (props) => {
  console.log("hdear height is" + 0.11 * height);
  return (
    <SafeAreaView style={styles.header}>
      <View
        style={{
          top: Platform.OS === "android" ? 10 : -3,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {props.leftChildren}
      </View>
      <View
        style={{
          flex: 4,
          justifyContent: "center",
          alignItems: "center",
          top: Platform.OS === "android" ? 10 : -3,
        }}
      >
        <Text style={{ ...globalFontStyles.OSB_17, color: "#232323" }}>
          {props.str}
        </Text>
      </View>
      <View
        style={{
          top: Platform.OS === "android" ? 10 : -3,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {props.rightChildren}
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "white",
    borderBottomWidth: 0.2,
    width: width,
    height: 0.11 * height,
    elevation: 5,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.1,
  },
});
