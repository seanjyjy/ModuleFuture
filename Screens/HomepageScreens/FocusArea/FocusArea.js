import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../../../Component/Header";
import SuggestButton from "../../../Component/SuggestButton";
import specialisations from "../../../Data/Specialisations";
import ColouredList from "../../../Component/ColouredList";

const colors = [
  "#5EDCC2",
  "#4ABBEE",
  "#5E77DC",
  "#765EDC",
  "#BB5EDC",
  "#DC5E9D",
  "#A47777",
  "#E19797",
  "#20A87F",
  "#EC5286",
];

const FocusArea = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header
        str={"Focus Area"}
        leftChildren={null}
        rightChildren={<SuggestButton />}
      />
      <ColouredList
        colors={colors}
        transition={() => null}
        text1={"No. of prereq taken"}
        text2={"3/5"}
        text3={"4.5"}
        array={specialisations}
      />
    </View>
  );
};

export default FocusArea;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
