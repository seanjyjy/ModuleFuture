import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Header from "../../../Component/Header";
import { MenuItem, OverflowMenu } from "@ui-kitten/components";
import { Icon } from "react-native-eva-icons";
import { globalFontStyles } from "../../../Component/GlobalFont";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

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

  const renderOverflowMenuAction = () => (
    <OverflowMenu
      visible={menuVisible}
      anchor={MenuIcon}
      onBackdropPress={toggleMenu}
    >
      <MenuItem
        title={text(numTaken())}
        onPress={() => {
          toggle(!MCstaken);
          toggleMenu();
        }}
        activeOpacity={0.9}
      />
      <MenuItem
        title={text(overallView())}
        onPress={() => {
          setView(!catView);
          toggleMenu();
        }}
        activeOpacity={0.9}
      />
    </OverflowMenu>
  );

  const viewType = () => (
    <TouchableOpacity
      style={styles.header2}
      activeOpacity={0.85}
      onPress={toggleTypeMenu}
    >
      <Text style={{ ...globalFontStyles.OSSB_19, color: "#4D4D4D" }}>
        {currentType}
      </Text>
      <Icon
        fill="#232323"
        width={40}
        height={30}
        name="arrow-ios-downward-outline"
      />
    </TouchableOpacity>
  );

  const selector = () => (
    <OverflowMenu
      visible={type}
      anchor={viewType}
      onBackdropPress={toggleTypeMenu}
    >
      <MenuItem
        title={text(item1())}
        onPress={() => {
          changeType(item1());
          toggleTypeMenu();
        }}
        activeOpacity={0.9}
      />
      <MenuItem
        title={text(item2())}
        onPress={() => {
          changeType(item2());
          toggleTypeMenu();
        }}
        activeOpacity={0.9}
      />
    </OverflowMenu>
  );

  /* --------------------------------------------Floating content------------------------------------------------ */

  const colors = [
    "#FFB584",
    "#FF6F66",
    "#C6E198",
    "#6CD5AF",
    "#8F9ED5",
    "#CE6F73",
    "#241161",
    // "#6c2386",
  ];

  const holders = (key, name) => {
    return (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate("Foundation");
        }}
      >
        <View style={{ ...styles.colorTop, backgroundColor: colors[key - 1] }}>
          <Text style={{ ...globalFontStyles.NBEB_17, color: "#F4F4F4" }}>
            {name}
          </Text>
        </View>
        {content(key)}
      </TouchableOpacity>
    );
  };

  const content = (key) => (
    <View style={styles.whitelayer}>
      <View style={styles.innerText}>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: colors[key - 1],
              width: 0.03 * width,
              height: 0.03 * width,
              borderRadius: (0.03 * width) / 2,
              top: 4.5,
              right: 6,
            }}
          />
          <Text style={{ ...globalFontStyles.NBEB_14, color: "#686868" }}>
            {MCstaken ? "MCs taken" : "No. taken"}
          </Text>
        </View>
        <Text style={{ ...globalFontStyles.NBEB_14, color: "#686868" }}>
          {MCstaken ? "26 / 38" : "6 / 9"}
        </Text>
      </View>
      <View style={styles.innerText}>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: colors[key - 1],
              width: 0.03 * width,
              height: 0.03 * width,
              borderRadius: (0.03 * width) / 2,
              top: 4.5,
              right: 6,
            }}
          />
          <Text style={{ ...globalFontStyles.NBEB_14, color: "#686868" }}>
            CAP
          </Text>
        </View>
        <Text style={{ ...globalFontStyles.NBEB_14, color: "#686868" }}>
          4.5
        </Text>
      </View>
    </View>
  );

  /* --------------------------------------------Content headers------------------------------------------------ */

  const menu = () => {
    if (currentType === "Type") {
      return [
        { key: 1, name: "Foundation" },
        { key: 2, name: "Foundation" },
        { key: 3, name: "Foundation" },
        { key: 4, name: "Foundation" },
        { key: 5, name: "Foundation" },
        { key: 6, name: "Foundation" },
        { key: 7, name: "Foundation" },
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
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        str={"Records"}
        leftChildren={<View />}
        rightChildren={renderOverflowMenuAction()}
      />
      {selector()}
      <View style={{ flex: 1, position: "relative", marginBottom: 60 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          keyExtractor={(item) => item.key.toString()}
          data={menu()}
          renderItem={({ item }) => holders(item.key, item.name)}
        />
      </View>
    </SafeAreaView>
  ) : (
    // To be updated for Full View
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        str={"Records"}
        leftChildren={<View />}
        rightChildren={renderOverflowMenuAction()}
      />
      {selector()}
      <View style={{ flex: 1, position: "relative", marginBottom: 60 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          keyExtractor={(item) => item.key.toString()}
          data={menu()}
          renderItem={({ item }) => holders(item.key, item.name)}
        />
      </View>
    </SafeAreaView>
  );
};

export default Records;

const styles = StyleSheet.create({
  header2: {
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: "center",
    // borderBottomColor: "white",
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomEndRadius: 13,
    // borderBottomStartRadius: 16,
  },
  container: {
    width: (width - 40) / 2,
    height: height / 5,
    marginVertical: 12,
    marginHorizontal: 10,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    flexDirection: "column",
    backgroundColor: "white",
  },
  colorTop: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "32%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: (width - 40) / 16,
  },
  innerText: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  whitelayer: {
    height: "60%",
    width: "80%",
    alignItems: "stretch",
  },
});
