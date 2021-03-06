import React, { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import { globalFontStyles } from "./GlobalFont";
import { Icon } from "react-native-eva-icons";
import { Easing } from "react-native-reanimated";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const Container = (props) => {
  const xVal = useRef(new Animated.Value(0)).current;

  const move = () => {
    Animated.timing(xVal, {
      toValue: -width,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => props.incr());
  };

  return (
    <Animated.View style={{ ...styles.container, left: xVal }}>
      <View style={{ flexDirection: "column", flex: 1 }}>
        <View
          style={{
            width: 0.65 * width,
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
            style={{ ...styles.button1, backgroundColor: "#373F51" }}
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
            style={{ ...styles.button1, backgroundColor: "#DAA49A" }}
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
      {props.canAdd ? (
        <Icon
          name={"plus-circle"}
          width={43}
          height={43}
          fill={"#3FE2D3"}
          onPress={() => {
            move();
          }}
        />
      ) : (
        <Text
          style={{
            ...globalFontStyles.OSR_12,
            color: "#777777",
            alignSelf: "flex-start",
            top: 5,
          }}
        >
          Added
        </Text>
      )}
    </Animated.View>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 15,
    borderColor: "lightgrey",
    borderWidth: StyleSheet.hairlineWidth * 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    width: width * 0.9,
    height: height * 0.13,
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
  },
});
