import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, FlatList } from "react-native";
import { globalFontStyles } from "../../../Component/GlobalFont";
import BottomBar from "../../../Component/BottomBar";
import Cross from "../../../Component/Cross";
import FilterItem from "../../../Component/FilterItem";
import FilterSection from "./FilterSection";
import { useSafeArea } from "react-native-safe-area-context";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const Filter = ({ navigation, route }) => {
  useEffect(() => {
    if (route.params?.fullList) {
      const array = route.params?.fullList;
      setList(array);
      update(numConversion(array.length));
    }
    const currentFilters = route.params?.currentFilters;
    if (currentFilters.length !== 0) {
      setFilterArr(currentFilters);
      const newSet = new Set();
      currentFilters.forEach((x) => newSet.add(x.name));
      setFilterSet(newSet);
      setTimeout(() => {
        setFilterSet(new Set());
      }, 20);
    }
  }, [route.params?.fullList]);

  const numConversion = (num) => {
    if (num < 100) {
      return num;
    } else {
      return Math.floor(num / 100) * 100 + "+";
    }
  };

  const [fullList, setFL] = useState(route.params.origList);
  const [numMods, update] = useState(0);
  const [filterSet, setFilterSet] = useState(new Set());
  const [list, setList] = useState([]);
  const [filterArr, setFilterArr] = useState([]);
  const [clearFilters, clear] = useState(false);

  let tempList = list;

  const header = (
    <View style={styles.header}>
      <Cross
        top={19 + useSafeArea().top > 24 ? 15 : 0}
        left={20}
        transition={() => navigation.goBack()}
        text={"Filter"}
      />
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

  const codes = [
    /*------------------ Commonly picked modules---------------*/
    { name: "CS" },
    { name: "IS" },
    { name: "BT" },
    { name: "IFS" },
    { name: "MA" },
    { name: "ST" },
    { name: "CG" },
    { name: "EG" },
    { name: "GEH" },
    { name: "GES" },
    { name: "GET" },
    { name: "EC" },
    { name: "MKT" },
    { name: "EE" },
    { name: "IE" },
    { name: "DBA" },
    { name: "ACC" },
    { name: "DAO" },
    { name: "MNO" },
    { name: "FIN" },
    { name: "CP" },
    { name: "ES" },
    { name: "GEQ" },
    { name: "GER" },
    { name: "CFG" },
    /*------------------ Other modules---------------*/
    { name: "AH" },
    { name: "ALS" },
    { name: "AR" },
    { name: "AS" },
    { name: "ASP" },
    { name: "AUD" },
    { name: "AY" },
    { name: "BAA" },
    { name: "BBP" },
    { name: "BDC" },
    { name: "BHD" },
    { name: "BI" },
    { name: "BIS" },
    { name: "BL" },
    { name: "BLD" },
    { name: "BMA" },
    { name: "BMC" },
    { name: "BME" },
    { name: "BMF" },
    { name: "BMK" },
    { name: "BMM" },
    { name: "BMO" },
    { name: "BMS" },
    { name: "BMU" },
    { name: "BN" },
    { name: "BPM" },
    { name: "BPS" },
    { name: "BRP" },
    { name: "BS" },
    { name: "BSE" },
    { name: "BSN" },
    { name: "BSP" },
    { name: "BSS" },
    { name: "BX" },
    { name: "BZD" },
    { name: "CAS" },
    { name: "CDM" },
    { name: "CE" },
    { name: "CH" },
    { name: "CHC" },
    { name: "CL" },
    { name: "CLC" },
    { name: "CM" },
    { name: "CN" },
    { name: "COS" },
    { name: "CSA" },
    { name: "DE" },
    { name: "DEP" },
    { name: "DI" },
    { name: "DL" },
    { name: "DMA" },
    { name: "DMB" },
    { name: "DMC" },
    { name: "DMR" },
    { name: "DMS" },
    { name: "DMX" },
    { name: "DMY" },
    { name: "DOS" },
    { name: "DSA" },
    { name: "DSC" },
    { name: "DTS" },
    { name: "DY" },
    { name: "EB" },
    { name: "EBA" },
    { name: "ECA" },
    { name: "EL" },
    { name: "EM" },
    { name: "EN" },
    { name: "ENV" },
    { name: "ESE" },
    { name: "ESP" },
    { name: "EU" },
    { name: "FAS" },
    { name: "FDP" },
    { name: "FE" },
    { name: "FMA" },
    { name: "FMS" },
    { name: "FSC" },
    { name: "FSP" },
    { name: "FST" },
    { name: "GE" },
    { name: "GEK" },
    { name: "GEM" },
    { name: "GL" },
    { name: "GMS" },
    { name: "GS" },
    { name: "GSN" },
    { name: "GSS" },
    { name: "HM" },
    { name: "HY" },
    { name: "ID" },
    { name: "IGL" },
    { name: "IL" },
    { name: "IND" },
    { name: "IPS" },
    { name: "ISD" },
    { name: "ISE" },
    { name: "ISY" },
    { name: "IT" },
    { name: "JS" },
    { name: "KE" },
    { name: "LA" },
    { name: "LAB" },
    { name: "LAC" },
    { name: "LAF" },
    { name: "LAG" },
    { name: "LAH" },
    { name: "LAJ" },
    { name: "LAK" },
    { name: "LAL" },
    { name: "LAM" },
    { name: "LAR" },
    { name: "LAS" },
    { name: "LAT" },
    { name: "LAV" },
    { name: "LC" },
    { name: "LCC" },
    { name: "LCD" },
    { name: "LI" },
    { name: "LL" },
    { name: "LLD" },
    { name: "LSE" },
    { name: "LSM" },
    { name: "LX" },
    { name: "MB" },
    { name: "MCI" },
    { name: "MDG" },
    { name: "ME" },
    { name: "MIC" },
    { name: "MLE" },
    { name: "MS" },
    { name: "MST" },
    { name: "MT" },
    { name: "MUA" },
    { name: "MUH" },
    { name: "MUL" },
    { name: "MUT" },
    { name: "MW" },
    { name: "NM" },
    { name: "NUR" },
    { name: "OT" },
    { name: "PA" },
    { name: "PC" },
    { name: "PE" },
    { name: "PF" },
    { name: "PH" },
    { name: "PHS" },
    { name: "PL" },
    { name: "PLB" },
    { name: "PLC" },
    { name: "PLS" },
    { name: "PM" },
    { name: "PP" },
    { name: "PR" },
    { name: "PS" },
    { name: "PX" },
    { name: "PY" },
    { name: "QF" },
    { name: "QT" },
    { name: "RE" },
    { name: "SA" },
    { name: "SC" },
    { name: "SDM" },
    { name: "SE" },
    { name: "SG" },
    { name: "SH" },
    { name: "SLP" },
    { name: "SN" },
    { name: "SP" },
    { name: "SPH" },
    { name: "SSA" },
    { name: "SSB" },
    { name: "SSD" },
    { name: "SSE" },
    { name: "SSS" },
    { name: "SSY" },
    { name: "STR" },
    { name: "SW" },
    { name: "SWD" },
    { name: "SWE" },
    { name: "TBA" },
    { name: "TC" },
    { name: "TCE" },
    { name: "TCN" },
    { name: "TE" },
    { name: "TEE" },
    { name: "TG" },
    { name: "TIC" },
    { name: "TIE" },
    { name: "TM" },
    { name: "TMA" },
    { name: "TME" },
    { name: "TP" },
    { name: "TR" },
    { name: "TS" },
    { name: "TSC" },
    { name: "TTG" },
    { name: "UAR" },
    { name: "UBM" },
    { name: "UCV" },
    { name: "UD" },
    { name: "UHB" },
    { name: "UIS" },
    { name: "UIT" },
    { name: "ULS" },
    { name: "UNL" },
    { name: "UPC" },
    { name: "UPI" },
    { name: "UQF" },
    { name: "UQR" },
    { name: "USE" },
    { name: "USP" },
    { name: "USR" },
    { name: "USS" },
    { name: "UTC" },
    { name: "UTS" },
    { name: "UTW" },
    { name: "UWC" },
    { name: "VM" },
    { name: "WR" },
    { name: "XD" },
    { name: "XFA" },
    { name: "XFB" },
    { name: "XFC" },
    { name: "XFE" },
    { name: "XFS" },
    { name: "YCC" },
    { name: "YHU" },
    { name: "YID" },
    { name: "YIL" },
    { name: "YIR" },
    { name: "YLC" },
    { name: "YLG" },
    { name: "YLL" },
    { name: "YLN" },
    { name: "YLS" },
    { name: "YSC" },
    { name: "YSS" },
    { name: "ZB" },
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
      } else if (cat === "Code") {
        tempList = tempList.filter((x) => x.codePrefix === name);
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
    <View style={{ marginTop: 35, paddingBottom: 15 }}>
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
    { array: codes, category: "Code" },
    { array: MCs, category: "MC" },
  ];

  const FilterHeader = (
    <View style={styles.headerComponent}>
      <Text style={{ ...globalFontStyles.NB_17, color: "#232323" }}>
        Filter by
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      {header}
      <View style={{ marginBottom: height * 0.25, width: "83.6%" }}>
        <FlatList
          ListHeaderComponent={FilterHeader}
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
            locationFrom: "Filter",
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
  headerComponent: {
    paddingTop: 20,
    alignItems: "center",
    marginBottom: -5,
  },
});
