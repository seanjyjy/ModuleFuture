import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  Platform,
} from "react-native";
import { globalFontStyles } from "./GlobalFont";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const Header = (props) => {
  return (
    <SafeAreaView style={styles.header}>
      {props.leftChildren}
      <Text style={{ ...globalFontStyles.OSB_17, color: "#232323" }}>
        {props.str}
      </Text>
      {props.rightChildren}
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
    marginTop: Platform.OS === "android" ? height * 0.008 : -0.06 * height,
    backgroundColor: "white",
    borderBottomWidth: 0.2,
    width: width,
    height: 0.12 * height,
    elevation: 5,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.1,
  },
});
