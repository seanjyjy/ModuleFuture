import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Header from "../../../Component/Header";
import { MenuItem, OverflowMenu } from "@ui-kitten/components";
import { Icon } from "react-native-eva-icons";
import { globalFontStyles } from "../../../Component/GlobalFont";

const Records = ({ navigation }) => {
  // Default states
  const [MCstaken, toggle] = useState(true);
  const [fullView, setView] = useState(false);
  let currentType = "Type";
  const [type, changeType] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

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

  const toggleNoTaken = () => (
    <Text style={{ ...globalFontStyles.OSR_15, color: "#232323" }}>
      {MCstaken ? "Toggle no. taken" : "Toggle MCs taken"}
    </Text>
  );
  const overallView = () => (
    <Text style={{ ...globalFontStyles.OSR_15, color: "#232323" }}>
      {!fullView ? "Full view" : "Categorical view"}
    </Text>
  );

  const viewType = () => {
    <View style={{ flexDirection: "row", flex: 1 }}></View>;
  };

  const renderOverflowMenuAction = () => (
    <OverflowMenu
      visible={menuVisible}
      anchor={MenuIcon}
      onBackdropPress={toggleMenu}
    >
      <MenuItem
        title={toggleNoTaken()}
        onPress={() => toggle(!MCstaken)}
        activeOpacity={0.9}
      />
      <MenuItem
        title={overallView()}
        onPress={() => setView(!fullView)}
        activeOpacity={0.9}
      />
    </OverflowMenu>
  );

  const view2 = () => {
    <View style={styles.header2}>
      <OverflowMenu visible={type} anchor={viewType} />
    </View>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        str={"Records"}
        leftChildren={<View />}
        rightChildren={renderOverflowMenuAction()}
      />
    </SafeAreaView>
  );
};

export default Records;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header2: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomEndRadius: 13,
    borderBottomStartRadius: 16,
  },
});
