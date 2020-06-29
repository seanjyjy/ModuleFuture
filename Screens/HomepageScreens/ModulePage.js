import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../../Component/Header";
const ModulePage = () => {
  return (
    <View style={styles.container}>
      <Header str={"Module"} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>COMING SOOOOOOOOOON!</Text>
      </View>
    </View>
  );
};

export default ModulePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
