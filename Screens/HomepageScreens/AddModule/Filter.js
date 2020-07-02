import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { globalFontStyles } from "../../../Component/GlobalFont";
import BottomBar from "../../../Component/BottomBar";
import Cross from "../../../Component/Cross";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FilterItem from "../../../Component/FilterItem";
import FilterSection from "./FilterSection";
import { useSafeArea } from "react-native-safe-area-context";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const Filter = ({ navigation, route }) => {
  useEffect(() => {
    if (route.params?.moduleList) {
      const num = route.params?.moduleList;
      setList(num);
      update(numConversion(num));
    }
  });

  const numConversion = (num) => {
    const rounded = Math.floor((num - 50).toPrecision(2));
    return rounded + "+";
  };

  const [numMods, update] = useState(null);
  const [sortState1, setSortState1] = useState("Default");
  const [sortState2, setSortState2] = useState("Default");
  const [list, setList] = useState(null);

  const header = (
    <View style={styles.header}>
      <Cross
        top={14 + useSafeArea().top > 24 ? 10 : 0}
        left={20}
        transition={() => navigation.goBack()}
        text={"Filter"}
      />
    </View>
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

  const semesters = [
    { name: "Semester 1", key: 1 },
    { name: "Semester 2", key: 2 },
    { name: "Special Term I", key: 3 },
    { name: "Special Term II", key: 4 },
  ];

  const other = [
    { name: "S/U Option", key: 1 },
    { name: "No Exam", key: 2 },
  ];

  const departments = [
    {
      key: 18,
      name: "Computer Science",
    },
    {
      key: 17,
      name: "Information Systems and Analytics",
    },
    {
      key: 37,
      name: "Mathematics",
    },
    {
      key: 39,
      name: "Statistics and Applied Probability",
    },
    {
      key: 9,
      name: "BIZ Dean's Office",
    },
    {
      key: 43,
      name: "Electrical and Computer Engineering",
    },
    {
      key: 22,
      name: "Computing and Engineering Programme",
    },
    { key: 0, name: "Accounting" },
    {
      key: 14,
      name: "Management and Organisation",
    },
    {
      key: 13,
      name: "Marketing",
    },
    {
      key: 8,
      name: "Analytics and Operations",
    },
    { key: 74, name: "Alice Lee Center for Nursing Studies" },
    {
      key: 6,
      name: "Anatomy",
    },
    {
      key: 3,
      name: "Architecture",
    },
    {
      key: 70,
      name: "Biochemistry",
    },
    {
      key: 11,
      name: "Biological Sciences",
    },
    {
      key: 15,
      name: "Biomedical Engineering",
    },
    {
      key: 16,
      name: "Building",
    },
    {
      key: 30,
      name: "Center for Engl Lang Comms",
    },
    {
      key: 77,
      name: "Center for Quantum Technologies",
    },
    {
      key: 35,
      name: "Centre for Language Studies",
    },
    {
      key: 26,
      name: "Chemical and Biomolecular Engineering",
    },
    {
      key: 25,
      name: "Chemistry",
    },
    {
      key: 23,
      name: "Chinese Studies",
    },
    {
      key: 24,
      name: "Chua Thian Poh Comm Leader Center",
    },
    {
      key: 21,
      name: "Civil and Environmental Engineering",
    },
    {
      key: 81,
      name: "College of Alice and Peter Tan",
    },
    {
      key: 31,
      name: "Communications and New Media",
    },

    {
      key: 41,
      name: "Division of Graduate Dental Studies",
    },
    {
      key: 5,
      name: "Division of Graduate Medical Studies",
    },
    {
      key: 65,
      name: "Duke-NUS Dean's Office",
    },
    {
      key: 42,
      name: "Economics",
    },

    {
      key: 47,
      name: "Engineering Science Programme",
    },
    {
      key: 46,
      name: "English Language and Literature",
    },
    {
      key: 4,
      name: "FASS Dean's Office/Office of Programmes",
    },
    {
      key: 12,
      name: "Finance",
    },
    {
      key: 33,
      name: "FoD Dean's Office",
    },
    {
      key: 45,
      name: "FoE Dean's Office",
    },
    {
      key: 68,
      name: "FoL Dean's Office",
    },
    {
      key: 38,
      name: "FoS Dean's Office",
    },
    {
      key: 62,
      name: "Food Science and Technology",
    },
    {
      key: 52,
      name: "Geography",
    },
    {
      key: 1,
      name: "History",
    },
    {
      key: 67,
      name: "Industrial Design",
    },
    {
      key: 63,
      name: "Industrial Systems Engineering and Management",
    },

    {
      key: 34,
      name: "Institute of Systems Science",
    },
    {
      key: 54,
      name: "Japanese Studies",
    },
    {
      key: 75,
      name: "LKYSPP Dean's Office",
    },
    {
      key: 69,
      name: "Logistics Inst - Asia Pac",
    },
    {
      key: 60,
      name: "Malay Studies",
    },
    {
      key: 73,
      name: "Materials Science and Engineering",
    },

    {
      key: 44,
      name: "Mechanical Engineering",
    },
    {
      key: 72,
      name: "Mechanobiology Institute (MBI)",
    },
    {
      key: 57,
      name: "Microbiology and Immunology",
    },
    {
      key: 66,
      name: "NGS Dean's Office",
    },
    {
      key: 78,
      name: "NUS Entrepreneurship Centre",
    },
    {
      key: 20,
      name: "NUS Medicine Dean's Office",
    },
    {
      key: 2,
      name: "Office of Sr Dy Pres and Provost",
    },
    {
      key: 76,
      name: "Pathology",
    },
    {
      key: 71,
      name: "Pharmacology",
    },
    {
      key: 55,
      name: "Pharmacy",
    },
    {
      key: 50,
      name: "Philosophy",
    },
    {
      key: 28,
      name: "Physics",
    },
    {
      key: 59,
      name: "Physiology",
    },
    {
      key: 48,
      name: "Political Science",
    },
    {
      key: 61,
      name: "Psychology",
    },
    {
      key: 32,
      name: "Real Estate",
    },
    {
      key: 82,
      name: "Residential College 4",
    },
    {
      key: 36,
      name: "Ridge View Residential College",
    },
    {
      key: 51,
      name: "Risk Management Institute",
    },
    {
      key: 27,
      name: "SCALE Dean's Office",
    },
    {
      key: 10,
      name: "SDE Dean's Office",
    },
    {
      key: 58,
      name: "SSH School of Public Health Dean's Office",
    },
    {
      key: 29,
      name: "SoC Dean's Office",
    },
    {
      key: 64,
      name: "Social Work",
    },
    {
      key: 49,
      name: "Sociology",
    },
    {
      key: 53,
      name: "South Asian Studies",
    },
    {
      key: 19,
      name: "Southeast Asian Studies",
    },

    {
      key: 7,
      name: "Strategy and Policy",
    },
    {
      key: 40,
      name: "Temasek Defence Systems Inst",
    },
    {
      key: 80,
      name: "Tembusu College",
    },
    {
      key: 79,
      name: "University Scholars Programme",
    },
    {
      key: 56,
      name: "YSTCM Dean's Office",
    },
    {
      key: 83,
      name: "Yale-NUS College",
    },
  ];

  const textWithIcon2 = (name) => (
    <FilterItem text={name} box={false} reset={clearFilters} />
  );

  const filterSection = (array, name) => (
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
    { key: 4, array: semesters, string: "Semester" },
    { key: 1, array: levels, string: "Level" },
    { key: 2, array: departments, string: "Department" },
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
          renderItem={({ item }) => filterSection(item.array, item.string)}
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
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
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
