import { StyleSheet } from "react-native";
import React from "react";
import { Icon } from "react-native-eva-icons";

const AddModuleButton = (props) => {
  return (
    <Icon
      style={styles.buttonDesign}
      name="plus-circle"
      width={47}
      height={47}
      fill="#393939"
      onPress={() => props.func()}
    />
  );
};

export default AddModuleButton;
const styles = StyleSheet.create({
  buttonDesign: {
    left: "83%",
    bottom: "10%",
  },
});
