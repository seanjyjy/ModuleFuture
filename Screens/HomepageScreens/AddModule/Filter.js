import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import { globalFontStyles } from "../../../Component/GlobalFont";
import BottomBar from "../../../Component/BottomBar";
import Cross from "../../../Component/Cross";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FilterItem from "../../../Component/FilterItem";
import FilterSection from "./FilterSection";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const Filter = ({ navigation }) => {
  const [numMods, update] = useState("400+");
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
        activeOpacity={0.95}
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
    <View style={styles.sortComponent}>
      <Text style={{ ...globalFontStyles.NSB_17, color: "#232323" }}>
        Sort by
      </Text>
      <View style={{ flexDirection: "row", marginTop: 14, marginBottom: 30 }}>
        {sortButton(sortState1, setSortState1, "Level")}
        {sortButton(sortState2, setSortState2, "Code")}
      </View>
    </View>
  );

  const levels = [
    { name: "1000", key: 1 },
    { name: "2000", key: 2 },
    { name: "3000", key: 3 },
    { name: "4000", key: 4 },
    { name: "5000", key: 5 },
    { name: "6000", key: 6 },
    { name: "8000", key: 7 },
  ];

  const codes = [
    { name: "CS", key: 1 },
    { name: "MA", key: 2 },
    { name: "ST", key: 3 },
    { name: "ES", key: 4 },
    { name: "IS", key: 5 },
    { name: "CM", key: 6 },
    { name: "BIZ", key: 7 },
    { name: "CEG", key: 8 },
    { name: "CP", key: 9 },
    { name: "BA", key: 10 },
    { name: "GER", key: 11 },
  ];

  const MCs = [
    { name: "0 - 3", key: 1 },
    { name: "4", key: 2 },
    { name: "5 - 8", key: 3 },
    { name: "More than 8", key: 4 },
  ];

  const other = [
    { name: "S/U Option", key: 1 },
    { name: "No Exam", key: 2 },
  ];

  const textWithIcon2 = (name) => <FilterItem text={name} box={false} />;

  const filterSection = (array, name, clear) => (
    <FilterSection array={array} name={name} reset={clearFilters} />
  );

  const otherSection = (
    <View style={{ marginTop: 35, marginBottom: 15 }}>
      <Text
        style={{
          ...globalFontStyles.NSB_17,
          color: "#232323",
          marginBottom: 5,
        }}
      >
        Other
      </Text>
      <FlatList
        data={other}
        keyExtractor={(item) => item.key.toString()}
        renderItem={({ item }) => textWithIcon2(item.name)}
      />
    </View>
  );

  const section = [
    { key: 1, array: levels, string: "Level" },
    { key: 2, array: codes, string: "Code" },
    { key: 3, array: MCs, string: "MCs" },
  ];

  const [clearFilters, clear] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      {header}
      <View style={{ marginBottom: 155, width: "83.6%" }}>
        <FlatList
          ListHeaderComponent={sort}
          ListFooterComponent={otherSection}
          data={section}
          keyExtractor={(item) => item.key.toString()}
          renderItem={({ item }) =>
            filterSection(item.array, item.string, clearFilters)
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
      <BottomBar
        leftText={"Clear all"}
        transition={() => navigation.navigate("AddModule")}
        rightText={`Show ${numMods} modules`}
        size={"45%"}
        clearAll={() => {
          clear(true);
          setSortState1("Default");
          setSortState2("Default");
          setTimeout(() => {
            clear(false);
          }, 1);
        }}
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
  sortComponent: {
    borderBottomWidth: StyleSheet.hairlineWidth * 3,
    borderBottomColor: "#7070704D",
    alignSelf: "stretch",
    paddingTop: 20,
    alignItems: "center",
  },
});
