import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { globalFontStyles } from "../../../../Component/GlobalFont";
import SignInButton from "../../../../Component/SignInButton";

const SubText = ({ subtitle, description, last, onPress }) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={{ flex: 2, alignItems: "center" }}>
        <SignInButton func={onPress}>
          <Text style={{ ...globalFontStyles.OSSB_17, color: "white" }}>
            {last ? "Back to tutorial" : "Next"}
          </Text>
        </SignInButton>
      </View>
    </View>
  );
};

export default SubText;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subtitle: {
    ...globalFontStyles.NB_20,
    color: "#0C0d34",
    padding: 10,
    left: 10,
    textDecorationLine: "underline",
  },
  description: {
    ...globalFontStyles.NSB_13,
    color: "#0C0d34",
    padding: 20,
    bottom: 25,
    letterSpacing: -0.3,
  },
});
