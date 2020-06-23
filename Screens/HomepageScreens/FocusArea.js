import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../../Component/Header";
const FocusArea = () => {
  return (
    <View style={styles.container}>
      <Header str={"Focus Area"} leftChildren={null} rightChildren={null} />
    </View>
  );
};

export default FocusArea;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
