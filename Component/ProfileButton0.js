import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { globalFontStyles } from "./GlobalFont";
import { Icon } from "react-native-eva-icons";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const ProfileButton0 = (props) => {
  return (
    <TouchableOpacity style={styles.main} onPress={() => props.transition()}>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ ...globalFontStyles.OSSB_15, color: "#232323" }}>
          {props.left}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            ...globalFontStyles.OSR_14,
            color: "#2D405699",
            marginTop: 2,
          }}
        >
          {props.right}
        </Text>
        <Icon
          name="arrow-ios-forward-outline"
          width={15}
          height={15}
          fill="#2D405699"
          style={styles.icon}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileButton0;

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  icon: {
    marginLeft: 6,
    marginTop: 4.5,
  },
});
