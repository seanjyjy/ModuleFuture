import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Header from "../../../Component/Header";
import Icon from "react-native-vector-icons/FontAwesome";
import LogoutButton from "../../../Component/LogoutButton";

const Course = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header
        str={"Course"}
        leftChildren={
          <Icon name="arrow-left" size={19} style={{ color: "#232323" }} />
        }
        rightChildren={<Button size="tiny" title="asdsad" />}
      />
      <Text>hello world</Text>
    </View>
  );
};

export default Course;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
