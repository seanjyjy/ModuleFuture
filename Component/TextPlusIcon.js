import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { globalFontStyles } from "./GlobalFont";
import { Icon } from "@ui-kitten/components";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const TextPlusIcon = (props) => {
  return (
    <TouchableOpacity style={styles.main} onPress={() => props.transition()}>
      <Text style={{ ...globalFontStyles.OSSB_17, color: "#232323" }}>
        {props.left}
      </Text>
      <View style={styles.fade}>
        <Text style={{ ...globalFontStyles.OSSB_17, color: "#2D405699" }}>
          {props.right}
        </Text>
        <Icon name="arrow-ios-forward-outline" />
      </View>
    </TouchableOpacity>
  );
};

export default TextPlusIcon;

const styles = StyleSheet.create({
  main: {
    paddingLeft: 35,
    paddingRight: 35,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fade: {
    color: "#2D405699",
  },
});
