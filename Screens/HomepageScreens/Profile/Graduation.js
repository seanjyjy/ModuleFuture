import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../../../Component/Header";
import Icon from "react-native-vector-icons/FontAwesome";

const Graduation = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header
        str={"Expected Graduation Sem"}
        leftChildren={
          <Icon name="arrow-left" size={19} style={{ color: "#232323" }} />
        }
        rightChildren={<View />}
      />
      <Text>hello world</Text>
    </View>
  );
};

export default Graduation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
