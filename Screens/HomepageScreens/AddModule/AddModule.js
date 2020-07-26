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
  ScrollView,
  Alert,
} from "react-native";
import { globalFontStyles } from "../../../Component/GlobalFont";
import { Icon } from "react-native-eva-icons";
import BottomBar from "../../../Component/BottomBar";
import Modal from "react-native-modal";
import Cross from "../../../Component/Cross";
import Container from "../../../Component/Container";
import Entypo from "react-native-vector-icons/Entypo";
import ModuleBlocks from "./ModuleBlocks";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const AddModule = (props) => {
  const current = React.createRef();

  const header = (
    <View style={styles.header}>
      <View style={{ padding: width * 0.05 }}>
        <Cross
          top={22}
          transition={() => props.navigation.goBack()}
          text={"Add a module"}
        />
        <View style={styles.second}>
          <View style={styles.item2}>
            <Icon
              style={{ marginLeft: 10, marginRight: 12 }}
              fill="#76768080"
              width={20}
              height={20}
              name="search-outline"
            />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
              <View style={{ flex: 1 }}>
                <TextInput
                  placeholder="Module code, name"
                  placeholderTextColor="#76768080"
                  autoCapitalize="words"
                  onFocus={() => {
                    for (const mod of modules) {
                      fullList.delete(mod);
                    }
                  }}
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
              for (const mod of modules) {
                origList.delete(mod);
                fullList.delete(mod);
              }
              props.navigation.navigate("Filter", {
                fullList: Array.from(fullList),
                currentFilters: filterArr,
                origList: Array.from(origList),
                loc: "AddModule",
              });
              current.current.clear();
            }}
          />
        </View>
      </View>
    </View>
  );

  useEffect(() => {
    if (props.route.params?.locationFrom === "Filter") {
      const newList = props.route.params?.afterFilter;
      setFullList(new Set(newList));
      setModuleList(newList);
      setFilterArr(props.route.params?.currentFilters);
    } else if (
      props.route.params?.locationFrom === "SeeModules" &&
      props.route.params?.value !== MCcount
    ) {
      const reAdded = props.route.params?.reAddedModules;
      const newList = fullList;
      for (const mod of reAdded) {
        fullList.add(mod);
        origList.add(mod);
      }
      setFullList(newList);
      setModuleList(Array.from(newList));
      setOrigList(origList);
      add(props.route.params?.newModules);
      addVal(props.route.params?.value);
    }
  }, [props.route.params?.newModules || props.route.params?.currentFilters]);

  const [modulesPlanned, setModulesPlanned] = useState(
    props.route.params?.modulesPlanned
  );
  const locationFrom = props.route.params?.item;
  const [filterArr, setFilterArr] = useState([]);
  const [origList, setOrigList] = useState(new Set(props.moduleList));
  const [fullList, setFullList] = useState(new Set(props.moduleList));
  const [moduleList, setModuleList] = useState(props.moduleList);
  const [MCcount, addVal] = useState(0);
  const [preReqmodalVisible, setPreReqModalVisible] = useState(false);
  const [infomodalVisible, setInfoModalVisible] = useState(false);
  const [infoInfo, setInfoInfo] = useState([]);
  const [preReqInfo, setpreReqInfo] = useState([]);
  const [modules, add] = useState([]); // modules are stored here

  const valAdded = (item) => (locationFrom === "AddPlan" ? item.MC : 1);

  const checkIfCanAdd = (code) => {
    console.log(modulesPlanned);
    for (const mod of modulesPlanned) {
      if (mod.code === code || mod.moduleCode === code) {
        return false;
      }
    }
    return true;
  };

  const holders = (item) => (
    <Container
      name={item.name}
      canAdd={checkIfCanAdd(item.code)}
      button1Press={() => {
        if (item.preclusion && item.prerequisite) {
          setpreReqInfo([item.preclusion, item.prerequisite]);
          setPreReqModalVisible(true);
        } else if (item.preclusion) {
          setpreReqInfo([item.preclusion, ""]);
          setPreReqModalVisible(true);
        } else if (item.prerequisite) {
          setpreReqInfo(["", item.prerequisite]);
          setPreReqModalVisible(true);
        } else {
          Alert.alert(
            "Note",
            "There are no prerequisites nor preclusions for this module",
            [{ text: "Cancel" }],
            { cancelable: false }
          );
        }
        return null;
      }}
      button2Press={() => {
        setInfoModalVisible(true);
        setInfoInfo([
          item.MC,
          item.code,
          item.description,
          item.semData,
          item.suOption,
          item.workLoad,
        ]);
        return null;
      }}
      incr={() => {
        addVal(MCcount + valAdded(item));
        modules.push(item);
        let newArr = moduleList.filter((x) => x.code !== item.code);
        setModuleList(newArr);
      }}
    />
  );

  const moduleOrMC = locationFrom === "AddPlan" ? "MC count" : "Modules Added";

  const preReqModal = () => {
    const prereq = preReqInfo[1];
    const preclu = preReqInfo[0];
    return (
      <Modal
        style={styles.modalBox2}
        backdropOpacity={0.3}
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropTransitionOutTiming={0}
        isVisible={preReqmodalVisible}
        onBackdropPress={() => {
          setPreReqModalVisible(false);
        }}
        onBackButtonPress={() => {
          setPreReqModalVisible(false);
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.oneCenter}>
            <Text style={{ ...globalFontStyles.OSB_15, bottom: 5 }}>
              Requirements
            </Text>
            <View style={{ ...styles.lineDesign, top: 5 }} />
          </View>
          <View style={{ flex: 3 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ ...styles.headerPreStyling }}>Preclusion</Text>
            </View>
            <View style={styles.infoBox}>
              <View style={{ height: 5 }} />
              <ScrollView style={styles.ScrollViewStyling}>
                <Text style={styles.informationStyling}>{preclu}</Text>
              </ScrollView>
              <View style={{ height: 2 }} />
            </View>
          </View>
          <View style={{ flex: 3 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ ...styles.headerPreStyling }}>Prerequisite</Text>
            </View>
            <View style={styles.infoBox}>
              <View style={{ height: 5 }} />
              <ScrollView style={styles.ScrollViewStyling}>
                <Text style={styles.informationStyling}>{prereq}</Text>
              </ScrollView>
              <View style={{ height: 2 }} />
            </View>
          </View>
        </View>
        <View style={{ height: 10 }} />
      </Modal>
    );
  };

  const crossIcon = (
    <Entypo size={20} name="cross" style={{ color: "#FF6C7D", top: 2 }} />
  );
  const tickIcon = (
    <Entypo size={17} name="check" style={{ color: "#4AE8AB", top: 1 }} />
  );

  const workloaddisplays = (array) => {
    let sum = 0;
    const colorArray = ["#F49097", "#DFB2F4", "#5467CE", "#5491CE", "#55D6C2"];
    const titleArray = ["Lec", "Tut", "Lab", "Proj", "Prep"];
    const arrayToMake = [];
    for (let i = 0; i < array.length; i++) {
      sum += array[i];
      for (let j = 0; j < array[i]; j++) {
        if (j === 0) {
          arrayToMake.push({
            color: colorArray[i],
            title: titleArray[i],
          });
        } else {
          arrayToMake.push({
            color: colorArray[i],
            title: "",
          });
        }
      }
    }
    if (array) {
      return (
        <View style={{ flex: 1, bottom: 7 }}>
          <Text
            style={{
              ...globalFontStyles.OSSB_13,
              color: "#333333",
              bottom: 5,
            }}
          >
            {`Workload: ${sum} hrs`}
          </Text>
          <View style={{ flex: 1, flexDirection: "row" }}>
            {arrayToMake.map(({ color, title }, index) => (
              <ModuleBlocks color={color} key={index} title={title} sum={sum} />
            ))}
          </View>
        </View>
      );
    }
  };

  const infoModal = () => {
    const codeName = infoInfo[1];
    const mc = infoInfo[0];
    let description = infoInfo[2];
    if (description) {
      description = description.replace(/(\r\n|\n|\r)/gm, "");
    }
    const semData = infoInfo[3];
    const suOptions = infoInfo[4];
    const workLoad = infoInfo[5];
    let arrOfBoolean = [false, false, false, false];
    if (semData) {
      for (let i = 0; i < semData.length; i++) {
        arrOfBoolean[semData[i].semester - 1] = true;
      }
    }

    let modalSizing = [
      {
        modalstyle: {
          backgroundColor: "white",
          alignSelf: "center",
          marginVertical: height * 0.2,
          width: width * 0.9,
          borderRadius: 25,
        },
        descriptionflex: 6,
        workloadflex: 2,
      },
      {
        modalstyle: {
          backgroundColor: "white",
          alignSelf: "center",
          marginVertical: height * 0.32,
          width: width * 0.9,
          borderRadius: 25,
        },
        descriptionflex: 0,
        workloadflex: 2,
      },
      {
        modalstyle: {
          backgroundColor: "white",
          alignSelf: "center",
          marginVertical: height * 0.27,
          width: width * 0.9,
          borderRadius: 25,
        },
        descriptionflex: 6,
        workloadflex: 0,
      },
      {
        modalstyle: {
          backgroundColor: "white",
          alignSelf: "center",
          marginVertical: height * 0.37,
          width: width * 0.9,
          borderRadius: 25,
        },
        descriptionflex: 0,
        workloadflex: 0,
      },
    ];

    let styleToUse = 0;
    if (description && description !== "" && workLoad) {
      styleToUse = 0;
    } else if (description && description !== "") {
      styleToUse = 2;
    } else if (workLoad) {
      styleToUse = 1;
    } else {
      styleToUse = 3;
    }

    return (
      <Modal
        style={modalSizing[styleToUse].modalstyle}
        backdropOpacity={0.3}
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropTransitionOutTiming={0}
        isVisible={infomodalVisible}
        onBackdropPress={() => {
          setInfoModalVisible(false);
        }}
        onBackButtonPress={() => {
          setInfoModalVisible(false);
        }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              height: 70,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.headerStyling}>{codeName ? codeName : ""}</Text>
          </View>
          <View style={styles.lineDesign} />
          <View style={{ flex: modalSizing[styleToUse].descriptionflex }}>
            <View style={{ flex: 1 }}>
              <Text style={{ ...styles.mdStyle, bottom: 5 }}>
                Module Details
              </Text>
            </View>
            <View style={{ flex: 10 }}>
              <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
                <Text
                  style={{
                    color: "#3B6EA2",
                    ...globalFontStyles.OSR_13,
                    top: 5,
                  }}
                >
                  {description}
                </Text>
                <Text></Text>
              </ScrollView>
            </View>
          </View>
          <View style={{ flex: 2 }}>
            <View style={{ height: 20 }} />
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ ...styles.oneCenter, ...styles.flexRow10 }}>
                <Text style={styles.suTextStyle}>Semester 1</Text>
                {arrOfBoolean[0] ? tickIcon : crossIcon}
              </View>
              <View style={{ ...styles.oneCenter, ...styles.flexRow10 }}>
                <Text style={styles.suTextStyle}>Semester 2</Text>
                {arrOfBoolean[1] ? tickIcon : crossIcon}
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: "row", top: 2 }}>
              <View style={{ ...styles.oneCenter, ...styles.flexRow10 }}>
                <Text style={styles.suTextStyle}>Special term I</Text>
                {arrOfBoolean[2] ? tickIcon : crossIcon}
              </View>
              <View style={{ ...styles.oneCenter, ...styles.flexRow10 }}>
                <Text style={styles.suTextStyle}>Special term II</Text>
                {arrOfBoolean[3] ? tickIcon : crossIcon}
              </View>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ ...styles.oneCenter, bottom: 10 }}>
              <Text style={styles.mcTextStyle}>{`Number of MCs: ${mc}`}</Text>
            </View>
            <View style={{ ...styles.oneCenter, ...styles.flexRow10 }}>
              <Text style={styles.suTextStyle}>SU availability</Text>
              {suOptions ? tickIcon : crossIcon}
            </View>
          </View>
          <View style={{ height: 5 }} />
          <View
            style={{
              flex: modalSizing[styleToUse].workloadflex,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {workLoad ? workloaddisplays(workLoad) : <View />}
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={{ alignItems: "center", backgroundColor: "#F4F4F4", flex: 1 }}>
      {header}
      <View style={{ marginBottom: 0.25 * height }}>
        <FlatList
          keyboardShouldPersistTaps="always"
          ListHeaderComponent={<View style={{ marginVertical: 5 }} />}
          data={moduleList}
          extraData={modules}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => holders(item)}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: height * 0.06 - 20 }} />}
        />
      </View>
      <BottomBar
        leftText={`${moduleOrMC}: ${MCcount}`}
        opacity={1}
        transition={() => {
          for (const mod of modules) {
            fullList.delete(mod);
            origList.delete(mod);
          }
          props.navigation.navigate("SeeModules", {
            modDetails: modules,
            location: locationFrom,
            MC: MCcount,
          });
          current.current.clear();
        }}
        rightText={"Add modules"}
        size={"33%"}
      />
      {preReqModal()}
      {infoModal()}
    </View>
  );
};

export default AddModule;

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
    backgroundColor: "#7676801F",
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
  modalBox: {
    backgroundColor: "white",
    alignSelf: "center",
    marginVertical: height * 0.2,
    width: width * 0.9,
    borderRadius: 25,
  },
  modalBox2: {
    backgroundColor: "white",
    alignSelf: "center",
    marginVertical: height * 0.29,
    width: width * 0.9,
    borderRadius: 25,
  },
  headerStyling: {
    ...globalFontStyles.OSB_17,
    alignSelf: "center",
    color: "#1F3C58",
  },
  mcTextStyle: {
    alignSelf: "center",
    ...globalFontStyles.OSSB_14,
    color: "#2A4F74",
  },
  suTextStyle: {
    ...globalFontStyles.OSSB_14,
    color: "#2A4F74",
  },
  lineDesign: {
    height: 1,
    width: "90%",
    backgroundColor: "#D0CECE",
    alignSelf: "center",
    bottom: 10,
  },
  oneCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flexRow10: {
    flexDirection: "row",
    bottom: 10,
  },
  headerPreStyling: {
    ...globalFontStyles.OSB_15,
    color: "#2A4F74",
    alignSelf: "center",
    textDecorationLine: "underline",
  },
  mdStyle: {
    alignSelf: "center",
    ...globalFontStyles.OSB_17,
    color: "#2A4F74",
  },
  ScrollViewStyling: {
    flex: 1,
    paddingHorizontal: 10,
  },
  informationStyling: {
    color: "#3B6EA2",
    ...globalFontStyles.OSSB_13,
    alignSelf: "center",
  },
  infoBox: {
    flex: 3,
    backgroundColor: "#f0f0f0",
    bottom: 10,
    width: 0.9 * width - 40,
    alignSelf: "center",
    borderRadius: 5,
  },
});
