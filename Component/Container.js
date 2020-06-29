import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { globalFontStyles } from "./GlobalFont";
import { Icon } from "react-native-eva-icons";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const Container = (props) => {
  const [plus, changeState] = useState(true);

  return (
    <View style={styles.container}>
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
            style={{
              ...styles.button1,
              backgroundColor: props.prereq ? "#303030" : "#FF6B6B",
            }}
            activeOpacity={0.85}
            onPress={() => {
              props.button1Press();
            }}
          >
            <Text style={{ ...globalFontStyles.OSSB_12, color: "white" }}>
              Prereq
            </Text>
            <View>
              {props.prereq ? null : (
                <Icon
                  style={{ marginLeft: 2 }}
                  fill="white"
                  width={15}
                  height={15}
                  name="alert-circle"
                />
              )}
            </View>
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
      {/* Firebase to handle modules being added */}
      <Icon
        name={plus ? "plus-circle" : "minus-circle"}
        width={43}
        height={43}
        fill={plus ? "#3FE2D3" : "#FF6B6B"}
        onPress={() => {
          plus ? props.incr() : props.decr();
          changeState(!plus);
        }}
      />
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
