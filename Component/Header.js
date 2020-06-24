import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import { globalFontStyles } from "./GlobalFont";
import { useSafeArea } from "react-native-safe-area-context";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const Header = (props) => {
  const inset = useSafeArea();
  return (
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
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "#fAfAfA",
    width: width,
    height: 0.11 * height,
    elevation: 5,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.1,
  },
});
