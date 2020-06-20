import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../../../Component/Header";
const Foundation = () => {
  return (
    <View style={styles.container}>
      <Header
        str={"Foundation"}
        leftChildren={<View />}
        rightChildren={<View />}
      />
    </View>
  );
};

export default Foundation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
