import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Header from "../../../Component/Header";
import SuggestButton from "../../../Component/SuggestButton";
import specialisations from "../../../Data/Specialisations";
import ColouredList from "../../../Component/ColouredList";
import { Icon } from "react-native-eva-icons";
import { MenuItem, OverflowMenu } from "@ui-kitten/components";
import { globalFontStyles } from "../../../Component/GlobalFont";

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
  const [currentType, changeType] = useState("Prereq");
  const [menuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  // prereq primaries electives
  const item1 = () =>
    currentType === "Prereq" || currentType === "Electives"
      ? "Primaries"
      : "Prereq";

  const item2 = () =>
    currentType === "Prereq" || currentType === "Primaries"
      ? "Electives"
      : "Prereq";

  const text = (word) => (
    <Text style={{ ...globalFontStyles.OSR_14, color: "#232323" }}>{word}</Text>
  );

  const viewType = () => (
    <TouchableOpacity
      style={styles.header2}
      activeOpacity={0.85}
      onPress={() => toggleMenu()}
    >
      <Text style={{ ...globalFontStyles.OSSB_17, color: "#232323" }}>
        {currentType}
      </Text>
      <Icon
        fill="#232323"
        width={30}
        height={20}
        name="arrow-ios-downward-outline"
        style={{ marginTop: 4 }}
      />
    </TouchableOpacity>
  );

  const selector = () => {
    const option = (item) => (
      <MenuItem
        title={text(item())}
        onPress={() => {
          changeType(item());
          toggleMenu();
        }}
        activeOpacity={0.9}
      />
    );
    return (
      <OverflowMenu
        visible={menuVisible}
        anchor={viewType}
        onBackdropPress={() => toggleMenu()}
      >
        {option(item1)}
        {option(item2)}
      </OverflowMenu>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        str={"Focus Area"}
        leftChildren={null}
        rightChildren={<SuggestButton />}
      />
      {selector()}
      <ColouredList
        colors={colors}
        transition={() => null}
        text1={`Number of ${currentType.toLowerCase()} taken`}
        text2={"3/5"}
        text3={"4.1"}
        array={specialisations}
      />
    </View>
  );
};

export default FocusArea;

const styles = StyleSheet.create({
  header2: {
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
