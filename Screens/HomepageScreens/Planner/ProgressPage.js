import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { globalFontStyles } from "../../../Component/GlobalFont";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ProgressPage = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaStyle}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon
            name="home"
            size={35}
            style={{ color: "white", right: 0.05 * width }}
          />
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Text style={{ ...globalFontStyles.NB_34, color: "white" }}>
            Progress
          </Text>
        </View>
      </SafeAreaView>
      <View
        style={{
          flex: 11,
          width: "100%",
          height: "100%",
          flexDirection: "column",
          bottom: 0.03 * height,
        }}
      >
        <View style={styles.largerRec}></View>
        <View
          style={{
            flex: 9,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <View style={styles.smallerRec}></View>
          <View style={styles.smallerRec}></View>
        </View>
      </View>
    </View>
  );
};

export default ProgressPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  smallerRec: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    bottom: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  largerRec: {
    flex: 7,
    borderRadius: 20,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: "white",
  },
  safeAreaStyle: {
    flex: 2,
    backgroundColor: "#A4A1FB",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
});
