import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { globalFontStyles } from "./GlobalFont";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const FullViewHeader = (props) => {
  const Text1 = (word, num) => (
    <Text
      style={{
        ...(props.fa ? globalFontStyles.OSB_14 : globalFontStyles.OSB_13),
        color: "#232323",
        left: num,
      }}
    >
      {word}
    </Text>
  );

  return (
    <View style={styles.header}>
      <View
        style={{
          width: props.fa ? "20%" : "23%",
          borderRightColor: "lightgrey",
          borderRightWidth: 0.7,
        }}
      ></View>
      <View
        style={{
          width: props.fa ? "80%" : "77%",
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
          {Text1("Module")}
          {Text1("Grade", 5)}
        </View>
        {Text1("Sem")}
      </View>
    </View>
  );
};

export default FullViewHeader;

const styles = StyleSheet.create({
  header: {
    marginTop: 18,
    width: width * 0.95,
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
