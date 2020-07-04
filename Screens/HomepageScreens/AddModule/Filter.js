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
      const array = route.params?.moduleList;
      setList(array);
      update(numConversion(array.length));
    }
    const currentFilters = route.params?.currentFilters;
    if (currentFilters !== 0) {
      setFilterArr(currentFilters);
      const newSet = new Set();
      currentFilters.forEach((x) => newSet.add(x.name));
      setFilterSet(newSet);
      setTimeout(() => {
        setFilterSet(new Set());
      }, 20);
    }
  }, [route.params?.moduleList]);

  const numConversion = (num) => {
    if (num < 100) {
      return num;
    } else {
      return Math.floor(num / 100) * 100 + "+";
    }
  };

  const fullList = route.params.origList;
  const [numMods, update] = useState(0);
  const [filterSet, setFilterSet] = useState(new Set());
  const [sortState1, setSortState1] = useState("Default");
  const [sortState2, setSortState2] = useState("Default");
  const [list, setList] = useState([]);
  const [filterArr, setFilterArr] = useState([]);
  const [clearFilters, clear] = useState(false);

  let tempList = list;

  const header = (
    <View style={styles.header}>
      <Cross
        top={19 + useSafeArea().top > 24 ? 10 : 0}
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
    { name: "1000" },
    { name: "2000" },
    { name: "3000" },
    { name: "4000" },
    { name: "5000" },
    { name: "6000" },
    { name: "8000" },
  ];

  const MCs = [
    { name: "0 - 3" },
    { name: "4" },
    { name: "5 - 8" },
    { name: "More than 8" },
  ];

  const semesters = [
    { name: "Semester 1" },
    { name: "Semester 2" },
    { name: "Special Term I" },
    { name: "Special Term II" },
  ];

  const other = [{ name: "S/U Option" }, { name: "No Exam" }];

  const departments = [
    { name: "Computer Science" },
    { name: "Information Systems and Analytics" },
    { name: "Mathematics" },
    { name: "Analytics and Operations" },
    { name: "Economics" },
    { name: "Statistics and Applied Probability" },
    { name: "Center for Engl Lang Comms" },
    { name: "Management and Organisation" },
    { name: "Finance" },
    { name: "Accounting" },
    { name: "Marketing" },
    { name: "Computing and Engineering Programme" },
    { name: "Electrical and Computer Engineering" },
    { name: "Alice Lee Center for Nursing Studies" },
    { name: "Anatomy" },
    { name: "Architecture" },
    { name: "BIZ Dean's Office" },
    { name: "Biochemistry" },
    { name: "Biological Sciences" },
    { name: "Biomedical Engineering" },
    { name: "Building" },
    { name: "Center for Quantum Technologies" },
    { name: "Centre for Language Studies" },
    { name: "Chemical and Biomolecular Engineering" },
    { name: "Chemistry" },
    { name: "Chinese Studies" },
    { name: "Chua Thian Poh Comm Leader Center" },
    { name: "Civil and Environmental Engineering" },
    { name: "College of Alice and Peter Tan" },
    { name: "Communications and New Media" },
    { name: "Division of Graduate Dental Studies" },
    { name: "Division of Graduate Medical Studies" },
    { name: "Duke-NUS Dean's Office" },
    { name: "Engineering Science Programme" },
    { name: "English Language and Literature" },
    { name: "FASS Dean's Office/Office of Programmes" },
    { name: "FoD Dean's Office" },
    { name: "FoE Dean's Office" },
    { name: "FoL Dean's Office" },
    { name: "FoS Dean's Office" },
    { name: "Food Science and Technology" },
    { name: "Geography" },
    { name: "History" },
    { name: "Industrial Design" },
    { name: "Industrial Systems Engineering and Management" },
    { name: "Institute of Systems Science" },
    { name: "Japanese Studies" },
    { name: "LKYSPP Dean's Office" },
    { name: "Logistics Inst - Asia Pac" },
    { name: "Malay Studies" },
    { name: "Materials Science and Engineering" },
    { name: "Mechanical Engineering" },
    { name: "Mechanobiology Institute (MBI)" },
    { name: "Microbiology and Immunology" },
    { name: "NGS Dean's Office" },
    { name: "NUS Entrepreneurship Centre" },
    { name: "NUS Medicine Dean's Office" },
    { name: "Office of Sr Dy Pres and Provost" },
    { name: "Pathology" },
    { name: "Pharmacology" },
    { name: "Pharmacy" },
    { name: "Philosophy" },
    { name: "Physics" },
    { name: "Physiology" },
    { name: "Political Science" },
    { name: "Psychology" },
    { name: "Real Estate" },
    { name: "Residential College 4" },
    { name: "Ridge View Residential College" },
    { name: "Risk Management Institute" },
    { name: "SCALE Dean's Office" },
    { name: "SDE Dean's Office" },
    { name: "SSH School of Public Health Dean's Office" },
    { name: "SoC Dean's Office" },
    { name: "Social Work" },
    { name: "Sociology" },
    { name: "South Asian Studies" },
    { name: "Southeast Asian Studies" },
    { name: "Strategy and Policy" },
    { name: "Temasek Defence Systems Inst" },
    { name: "Tembusu College" },
    { name: "University Scholars Programme" },
    { name: "YSTCM Dean's Office" },
    { name: "Yale-NUS College" },
  ];

  const handleClick = (name, bool, category) => {
    if (bool) {
      filterArr.push({ name: name, cat: category });
      setFilterArr(filterArr);
      addFilter(name, category);
    } else {
      const newArr = filterArr.filter((x) => x.name !== name);
      setFilterArr(newArr);
      filterAll(newArr);
    }
    update(numConversion(tempList.length));
  };

  const filterAll = (filters) => {
    tempList = fullList;
    setList(fullList);
    for (let i = 0; i < filters.length; i++) {
      addFilter(filters[i].name, filters[i].cat);
    }
  };

  const addFilter = (name, cat) => {
    try {
      if (cat === "S/U Option") {
        tempList = tempList.filter((x) => x.suOption);
        setList(tempList);
      } else if (cat === "No Exam") {
        tempList = tempList.filter((x) => x.noExam);
        setList(tempList);
      } else if (cat === "Semester") {
        const num =
          name === "Semester 1"
            ? 1
            : name === "Semester 2"
            ? 2
            : name === "Special Term I"
            ? 3
            : 4;
        tempList = tempList.filter((x) => x.Semester.has(num));
        setList(tempList);
      } else if (cat === "Level") {
        tempList = tempList.filter((x) => x.Level === parseInt(name));
        setList(tempList);
      } else if (cat === "MC") {
        if (name === "0 - 3") {
          tempList = tempList.filter((x) => x.MC <= 3);
          setList(tempList);
        } else if (name === "4") {
          tempList = tempList.filter((x) => x.MC === 4);
          setList(tempList);
        } else if (name === "5 - 8") {
          tempList = tempList.filter((x) => x.MC >= 5 && x.MC <= 8);
          setList(tempList);
        } else {
          tempList = tempList.filter((x) => x.MC > 8);
          setList(tempList);
        }
      } else if (cat === "Department") {
        tempList = tempList.filter((x) => x.Department === name);
        setList(tempList);
      } else {
        throw "Category does not exist!";
      }
    } catch (err) {
      console.log(err);
    }
  };

  const textWithIcon2 = (name) => (
    <FilterItem
      text={name}
      box={false}
      click={(name, bool) => {
        handleClick(name, bool, name);
      }}
      reset={clearFilters}
      filterSet={filterSet}
    />
  );

  const filterSection = (array, category) => (
    <FilterSection
      array={array}
      name={category}
      reset={clearFilters}
      click={(name, bool) => {
        handleClick(name, bool, category);
      }}
      filterSet={filterSet}
    />
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
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => textWithIcon2(item.name)}
      />
    </View>
  );

  const section = [
    { array: semesters, category: "Semester" },
    { array: levels, category: "Level" },
    { array: departments, category: "Department" },
    { array: MCs, category: "MC" },
  ];

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      {header}
      <View style={{ marginBottom: 155, width: "83.6%" }}>
        <FlatList
          ListHeaderComponent={sort}
          ListFooterComponent={otherSection}
          data={section}
          keyExtractor={(item) => item.category}
          renderItem={({ item }) => filterSection(item.array, item.category)}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <BottomBar
        leftText={"Clear all"}
        transition={() =>
          navigation.navigate("AddModule", {
            afterFilter: list,
            currentFilters: filterArr,
          })
        }
        rightText={`Show ${numMods} modules`}
        size={"45%"}
        clearAll={() => {
          clear(true);
          setSortState1("Default");
          setSortState2("Default");
          setTimeout(() => {
            clear(false);
            setList(fullList);
            update(numConversion(fullList.length));
            setFilterArr([]);
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
