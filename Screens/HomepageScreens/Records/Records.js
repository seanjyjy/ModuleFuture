import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Header from "../../../Component/Header";
import { MenuItem, OverflowMenu } from "@ui-kitten/components";
import { Icon } from "react-native-eva-icons";
import { globalFontStyles } from "../../../Component/GlobalFont";
import ColouredList from "../../../Component/ColouredList";
import FullView from "../../../Component/FullView";

const Records = ({ navigation }) => {
  // Default states
  const [MCstaken, toggle] = useState(true);
  const [catView, setView] = useState(true);
  const [currentType, changeType] = useState("Type");
  const [type, setTypeVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  {
    /* --------------------------------------------Ellipsis------------------------------------------------ */
  }
  const MenuIcon = () => (
    <Icon
      fill="#232323"
      width={30}
      height={30}
      name="more-vertical-outline"
      onPress={toggleMenu}
    />
  );

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const toggleTypeMenu = () => {
    setTypeVisible(!type);
  };

  /* --------------------------------------------Selector---------------------------------------- */

  const text = (word) => (
    <Text style={{ ...globalFontStyles.OSR_15, color: "#232323" }}>{word}</Text>
  );

  const numTaken = () => (MCstaken ? "Toggle no. taken" : "Toggle MCs taken");

  const overallView = () => (catView ? "Full view" : "Categorical view");

  const item1 = () =>
    currentType === "Type" || currentType === "Level" ? "Code" : "Type";

  const item2 = () =>
    currentType === "Type" || currentType === "Code" ? "Level" : "Type";

  const renderOverflowMenuAction = () => {
    const option = (menu1, menu2) => (
      <MenuItem
        title={text(menu1())}
        onPress={() => {
          if (menu1() === numTaken()) {
            toggle(!menu2);
          } else {
            setView(!menu2);
          }
          toggleMenu();
        }}
        activeOpacity={0.9}
      />
    );

    return (
      <OverflowMenu
        visible={menuVisible}
        anchor={MenuIcon}
        onBackdropPress={toggleMenu}
      >
        {option(numTaken, MCstaken)}
        {option(overallView, catView)}
      </OverflowMenu>
    );
  };

  const viewType = () => (
    <TouchableOpacity
      style={styles.header2}
      activeOpacity={0.85}
      onPress={toggleTypeMenu}
    >
      <Text style={{ ...globalFontStyles.OSSB_19, color: "#232323" }}>
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
          toggleTypeMenu();
        }}
        activeOpacity={0.9}
      />
    );
    return (
      <OverflowMenu
        visible={type}
        anchor={viewType}
        onBackdropPress={toggleTypeMenu}
      >
        {option(item1)}
        {option(item2)}
      </OverflowMenu>
    );
  };

  /* --------------------------------------------Floating content------------------------------------------------ */

  const colors = [
    "#FFB584",
    "#FF6F66",
    "#C6E198",
    "#6CD5AF",
    "#8F9ED5",
    "#CE6F73",
    "#241161",
    "#6c2386",
  ];

  /* --------------------------------------------Content headers------------------------------------------------ */

  const text1 = MCstaken ? "MCs taken" : "No. taken";
  const text2 = MCstaken ? "12 / 28" : "3 / 7";

  const menu = () => {
    if (currentType === "Type") {
      return [
        { key: 1, name: "Foundation" },
        { key: 2, name: "Specialisation" },
        { key: 3, name: "Maths and Sciences" },
        { key: 4, name: "Depth" },
        { key: 5, name: "IT Professionalism" },
        { key: 6, name: "UE" },
        { key: 7, name: "GEM" },
      ];
    } else if (currentType === "Level") {
      return [
        { key: 1, name: "1000s" },
        { key: 2, name: "2000s" },
        { key: 3, name: "3000s" },
        { key: 4, name: "4000s" },
        { key: 5, name: "5000s" },
        { key: 6, name: "8000s" },
        { key: 7, name: "8000s" },
      ];
    } else {
      return [
        { key: 1, name: "CS" },
        { key: 2, name: "MA" },
        { key: 3, name: "ST" },
        { key: 4, name: "ES" },
        { key: 5, name: "IS" },
        { key: 6, name: "CM" },
      ];
    }
  };

  return catView ? (
    <View style={{ flex: 1 }}>
      <Header
        str={"Records"}
        leftChildren={null}
        rightChildren={renderOverflowMenuAction()}
      />
      {selector()}
      <ColouredList
        colors={colors}
        transition={() => navigation.navigate("Foundation")}
        text1={text1}
        text2={text2}
        text3={"4.5"}
        array={menu()}
      />
    </View>
  ) : (
    // To be updated for Full View
    <View style={{ flex: 1 }}>
      <Header
        str={"Records"}
        leftChildren={<View />}
        rightChildren={renderOverflowMenuAction()}
      />
      {selector()}
    </View>
  );
};

export default Records;

const styles = StyleSheet.create({
  header2: {
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomEndRadius: 13,
    borderBottomStartRadius: 16,
  },
});
