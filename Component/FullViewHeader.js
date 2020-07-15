import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { globalFontStyles } from "./GlobalFont";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const FullViewHeader = () => (
  <View style={styles.header}>
    <View
      style={{
        width: "23%",
        borderRightColor: "lightgrey",
        borderRightWidth: 0.7,
      }}
    ></View>
    <View
      style={{
        width: "77%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingRight: 10,
        paddingLeft: 8,
      }}
    >
      <View
        style={{
          width: "79%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ ...globalFontStyles.OSB_13, color: "#232323" }}>
          Module
        </Text>
        <Text
          style={{
            ...globalFontStyles.OSB_13,
            color: "#232323",
          }}
        >
          Grade
        </Text>
      </View>
      <Text style={{ ...globalFontStyles.OSB_13, color: "#232323" }}>Sem</Text>
    </View>
  </View>
);

export default FullViewHeader;

const styles = StyleSheet.create({
  header: {
    marginTop: 18,
    width: width * 0.9,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 36,
    borderColor: "lightgrey",
    borderBottomColor: "#BBBBBB",
    borderWidth: 0.7,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
});
