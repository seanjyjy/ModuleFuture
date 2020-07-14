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
import FirebaseDB from "../FirebaseDB";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const ProfileButton0 = (props) => {
  const user = FirebaseDB.auth().currentUser;

  return (
    <TouchableOpacity
      style={styles.main}
      onPress={() => props.transition()}
      activeOpacity={props.left === "Course" ? 1 : 0.7}
    >
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            ...globalFontStyles.OSSB_15,
            color: "#232323",
            position: user
              ? !user.emailVerified && props.left === "Email"
                ? "absolute"
                : null
              : null,
          }}
        >
          {props.left}
        </Text>
        {user ? (
          !user.emailVerified && props.left === "Email" ? (
            <View style={styles.exclamationMark}>
              <Text style={{ color: "white", fontSize: 12, left: 0.5 }}>!</Text>
            </View>
          ) : (
            <View />
          )
        ) : (
          <View />
        )}
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
        <View>
          {props.left === "Course" ? null : (
            <Icon
              name="arrow-ios-forward-outline"
              width={15}
              height={15}
              fill="#2D405699"
              style={styles.icon}
            />
          )}
        </View>
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
  exclamationMark: {
    backgroundColor: "red",
    height: 15,
    width: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    left: 0.11 * width,
    top: 2,
  },
});
