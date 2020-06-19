import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProgressPageSettings = () => {
  return (
    <View style={styles.container}>
      <Text>ProgressPageSettings</Text>
    </View>
  );
};

export default ProgressPageSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
