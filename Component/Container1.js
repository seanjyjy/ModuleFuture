import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { globalFontStyles } from "./GlobalFont";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const Container = (props) => {
  return (
    <View style={{ ...styles.container }}>
      <View style={{ flexDirection: "column", flex: 1 }}>
        <View
          style={{
            width: 0.76 * width,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Text
            numberOfLines={1}
            style={{ ...globalFontStyles.OSSB_14, color: "#232323" }}
          >
            {props.name}
          </Text>
        </View>
        {/* Two buttons below */}
        <View
          style={{
            flexDirection: "row",
            flex: 1,
          }}
        >
          {/* Prereq button */}
          <TouchableOpacity
            style={{
              ...styles.button1,
              backgroundColor: "#303030",
            }}
            activeOpacity={0.85}
            onPress={() => {
              props.button1Press();
            }}
          >
            <Text style={{ ...globalFontStyles.OSSB_12, color: "white" }}>
              Req
            </Text>
          </TouchableOpacity>
          {/* Info button */}
          <TouchableOpacity
            style={styles.button1}
            activeOpacity={0.85}
            onPress={() => {
              props.button2Press();
            }}
          >
            <Text style={{ ...globalFontStyles.OSSB_12, color: "white" }}>
              Info
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 15,
    borderColor: "lightgrey",
    borderWidth: StyleSheet.hairlineWidth * 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    width: width * 0.9,
    height: height * 0.12,
    paddingHorizontal: 15,
    paddingLeft: 20,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  button1: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 30,
    width: 75,
    borderRadius: 5,
    backgroundColor: "#303030",
  },
});
