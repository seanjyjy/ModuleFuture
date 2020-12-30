import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { globalFontStyles } from "../../../Component/GlobalFont";
import ModuleWorkloadInformation from "../AddModule/ModuleWorkloadInformation";
import Entypo from "react-native-vector-icons/Entypo";
import { Icon } from "react-native-eva-icons";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const ModulePage = (props) => {
  const current = React.createRef();

  const header = (
    <View style={styles.header}>
      <ImageBackground
        style={styles.header}
        source={require("../../../assets/HeaderBG.png")}
      >
        <View style={{ padding: width * 0.05 }}>
          <Text
            style={{ ...globalFontStyles.OSB_15, top: 22, alignSelf: "center" }}
          >
            Module Search
          </Text>
          <View style={styles.second}>
            <View style={styles.item2}>
              <Icon
                style={{ marginLeft: 10, marginRight: 12 }}
                fill="#808080"
                width={20}
                height={20}
                name="search-outline"
              />
              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                  <TextInput
                    placeholder="Module code, name"
                    placeholderTextColor="#808080"
                    autoCapitalize="words"
                    onChangeText={(text) => {
                      let newList = Array.from(fullList).filter(
                        (item) =>
                          item.lowerCasedName.indexOf(text.toLowerCase()) !== -1
                      );
                      setModuleList(newList);
                    }}
                    ref={current}
                  ></TextInput>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <Icon
              style={{ marginLeft: 10 }}
              fill="#3FE2D3"
              width={28}
              height={28}
              name="options-2-outline"
              onPress={() => {
                props.navigation.navigate("Filter", {
                  fullList: Array.from(fullList),
                  currentFilters: filterArr,
                  origList: Array.from(origList),
                  loc: "Module",
                });
                current.current.clear();
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );

  useEffect(() => {
    if (props.route.params?.locationFrom === "Filter") {
      const newList = props.route.params?.afterFilter;
      setFullList(new Set(newList));
      setModuleList(newList);
      setFilterArr(props.route.params?.currentFilters);
    }
  }, [props.route.params?.currentFilters]);

  const [filterArr, setFilterArr] = useState([]);
  const [origList, setOrigList] = useState(new Set(props.moduleList));
  const [fullList, setFullList] = useState(new Set(props.moduleList));
  const [moduleList, setModuleList] = useState(props.moduleList);

  const crossIcon = (
    <Entypo size={20} name="cross" style={{ color: "#FF6C7D", top: 1 }} />
  );
  const tickIcon = (
    <Entypo size={18} name="check" style={{ color: "#4AE8AB", left: 1 }} />
  );

  const setSem = (array) => {
    if (array) {
      const arrOfBoolean = [false, false, false, false];
      for (let i = 0; i < array.length; i++) {
        arrOfBoolean[array[i] - 1] = true;
      }
      return arrOfBoolean;
    }
  };

  const holders = (item) => {
    const mc = item.MC;
    const suOptions = item.suOption;
    let description = item.description;
    if (description) {
      description = description.replace(/(\r\n|\n|\r)/gm, " ");
      description = description.replace(/  +/g, " ");
    }
    const semData = setSem(item.Semester);
    const workLoad = item.workLoad;
    let sum = 0;
    let realsum = 0;
    if (workLoad) {
      for (let i = 0; i < workLoad.length; i++) {
        sum += Math.ceil(workLoad[i]);
        realsum += workLoad[i];
      }
    }
    let numRowRequired = Math.ceil(sum / 10) - 1;
    numRowRequired = numRowRequired ? numRowRequired : 0;
    const findHeight = () => {
      let height = 275 + numRowRequired * 35;
      if (description === "" && workLoad === undefined) {
        height -= 115;
      } else if (description === "") {
        height -= 40;
      } else if (workLoad === undefined) {
        height -= 65;
      }
      return height;
    };

    return (
      <TouchableOpacity
        style={{
          ...styles.container,
          height: findHeight(),
          flexDirection: "column",
        }}
        activeOpacity={0.95}
        onPress={() =>
          props.navigation.navigate("ModuleItself", { item: item })
        }
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              width: "78%",
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                ...globalFontStyles.OSSB_14,
                color: "#232323",
                marginBottom: 15,
              }}
            >
              {item.name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignContent: "center",
                marginBottom: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 15,
                }}
              >
                <Text style={{ ...styles.suTextStyle, marginRight: 2 }}>
                  SU availability
                </Text>
                {suOptions ? tickIcon : crossIcon}
              </View>
              <View
                style={{
                  borderLeftWidth: 1,
                  borderLeftColor: "black",
                  marginRight: 15,
                }}
              />
              <Text
                style={{
                  alignSelf: "center",
                  ...globalFontStyles.OSSB_14,
                  color: "#2A4F74",
                }}
              >{`MCs : ${mc}`}</Text>
            </View>
            <Text
              numberOfLines={4}
              style={{
                color: "#3B6EA2",
                ...globalFontStyles.OSSB_13,
                marginBottom: 20,
              }}
            >
              {description}
            </Text>
          </View>
          <View style={{ width: "22%", alignItems: "flex-end" }}>
            {sidetab("Sem 1", semData[0])}
            {sidetab("Sem 2", semData[1])}
            {sidetab("ST I", semData[2])}
            {sidetab("ST II", semData[3])}
          </View>
        </View>
        {workLoad ? workloaddisplays(workLoad, realsum) : null}
      </TouchableOpacity>
    );
  };

  const sidetab = (sem, bool) => (
    <View
      style={{
        ...styles.sideTab,
        backgroundColor: bool ? "#FF6B6B" : "#DCDCDC",
      }}
    >
      <Text style={{ ...globalFontStyles.OSSB_13, color: "white" }}>{sem}</Text>
    </View>
  );

  const workloaddisplays = (array, sum) => {
    const colorArray = ["#F49097", "#DFB2F4", "#5467CE", "#5491CE", "#55D6C2"];
    const titleArray = ["Lec", "Tut", "Lab", "Proj", "Prep"];
    const arrayToMake = [];
    for (let i = 0; i < array.length; i++) {
      let val = array[i];
      for (let j = 0; j < Math.ceil(array[i]); j++) {
        if (j === 0) {
          arrayToMake.push({
            color: colorArray[i],
            title: titleArray[i],
            value: val >= 1 ? 1 : val.toFixed(1),
          });
        } else {
          arrayToMake.push({
            color: colorArray[i],
            title: "",
            value: val >= 1 ? 1 : val.toFixed(1),
          });
        }
        val -= 1;
      }
    }
    let showSum = sum;
    if (isNaN(showSum)) {
      showSum = showSum.toString().substring(1);
    }
    if (array) {
      return (
        <View style={{ flex: 1, bottom: 7 }}>
          <Text
            style={styles.workloadStyling}
          >{`Workload: ${showSum} hrs`}</Text>
          <View
            style={{
              flex: 1,
              width: width * 0.9 - 20,
              bottom: 3,
            }}
          >
            <ModuleWorkloadInformation arrayToMake={arrayToMake} />
          </View>
        </View>
      );
    }
  };

  return (
    <View style={{ alignItems: "center", backgroundColor: "#F4F4F4", flex: 1 }}>
      {header}
      <View style={{ marginBottom: 0.25 * height }}>
        <FlatList
          keyboardShouldPersistTaps="always"
          initialNumToRender={6}
          ListHeaderComponent={<View style={{ marginVertical: 5 }} />}
          data={moduleList}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => holders(item)}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: height * 0.06 - 20 }} />}
        />
      </View>
    </View>
  );
};

export default ModulePage;

const styles = StyleSheet.create({
  // Stylesheet for header
  header: {
    backgroundColor: "white",
    borderBottomWidth: 0.2,
    width: width,
    height: 0.178 * height,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    alignContent: "flex-start",
    justifyContent: "center",
  },
  item2: {
    flexDirection: "row",
    backgroundColor: "#3E3D3D1F",
    height: "100%",
    width: "88%",
    alignItems: "center",
  },
  second: {
    top: height * 0.04 + 5,
    height: "50%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  suTextStyle: {
    ...globalFontStyles.OSSB_14,
    color: "#2A4F74",
  },
  container: {
    backgroundColor: "white",
    borderRadius: 15,
    borderColor: "lightgrey",
    borderWidth: StyleSheet.hairlineWidth * 3,
    width: width * 0.95,
    paddingLeft: 18,
    paddingTop: 18,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  sideTab: {
    width: 55,
    height: 30,
    marginBottom: 0.5,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  workloadStyling: {
    ...globalFontStyles.OSSB_13,
    color: "#333333",
    bottom: 5,
  },
});
