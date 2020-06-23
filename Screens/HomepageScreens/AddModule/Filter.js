import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import { globalFontStyles } from "../../../Component/GlobalFont";
import Icon from "react-native-vector-icons/FontAwesome";
import BottomBar from "../../../Component/BottomBar";
import Cross from "../../../Component/Cross";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const Filter = ({ navigation }) => {
  const [numMods, update] = useState(400);
  const [sortState1, setSortState1] = useState("Default");
  const [sortState2, setSortState2] = useState("Default");

  const header = (
    <SafeAreaView style={styles.header}>
      <Cross
        top={14}
        left={20}
        transition={() => navigation.dispatch(CommonActions.goBack())}
        text={"Filter"}
      />
    </SafeAreaView>
  );

  const sortButton = (boolean, setter, name) => {
    const setSort = () =>
      boolean === "Default"
        ? "Ascending"
        : boolean === "Ascending"
        ? "Descending"
        : "Default";
    return (
      <TouchableOpacity
        style={{
          ...styles.sortButton,
          backgroundColor: boolean === "Default" ? "white" : "#232323",
          borderRightWidth: name === "Level" ? 0.1 : 0.6,
          marginLeft: name === "Level" ? 1 : 0,
        }}
        activeOpacity={0.85}
        onPress={() => setter(setSort())}
      >
        <Text
          style={{
            ...globalFontStyles.NSB_17,
            color: boolean === "Default" ? "#232323" : "white",
          }}
        >
          {name}
        </Text>
        <View>
          {boolean === "Default" ? null : (
            <MaterialCommunityIcons
              name={
                boolean === "Descending" ? "arrow-down-bold" : "arrow-up-bold"
              }
              size={19}
              color="white"
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const sort = (
    <View
      style={{
        paddingTop: 20,
        alignItems: "center",
      }}
    >
      <Text style={{ ...globalFontStyles.NSB_17, color: "#232323" }}>
        Sort by
      </Text>
      <View style={{ flexDirection: "row", marginTop: 14 }}>
        {sortButton(sortState1, setSortState1, "Level")}
        {sortButton(sortState2, setSortState2, "Code")}
      </View>
    </View>
  );

  const divider = (
    <View
      style={{
        marginTop: 22,
        width: "82%",
        left: 0.09 * width,
        borderBottomWidth: StyleSheet.hairlineWidth * 3,
        borderBottomColor: "#7070704D",
        alignSelf: "stretch",
      }}
    />
  );

  const mainFilter = (
    <View style={{ alignItems: "center" }}>
      <Text style={{ ...globalFontStyles.NSB_17, color: "#232323" }}>
        Filter by
      </Text>
      {/* <FlatList
        data={current.taken}
        renderItem={({ item }) => textWithIcon(item.name)}
      /> */}
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {header}
      {sort}
      {divider}
      <BottomBar
        leftText={"Clear all"}
        transition={() => navigation.navigate("AddModule")}
        rightText={`Show ${numMods} modules`}
        size={"45%"}
      />
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    borderBottomWidth: 0.2,
    width: width,
    height: 0.12 * height,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    justifyContent: "center",
  },
  sortButton: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 30,
    width: 90,
    borderWidth: 0.6,
  },
});
