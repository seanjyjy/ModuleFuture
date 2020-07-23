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

  // TODO: Tag modules that are already planned in the current plan
  const modulesPlanned = props.route.params?.modulesPlanned;
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
  // const [current, setItem] = useState(moduleList[0]);
  // const [split, setSplit] = useState(0);
  const [modules, add] = useState([]); // modules are stored here

  const compute = (taken, notTaken) => {
    const len = taken.length + notTaken.length;
    return (taken.length / len) * 100;
  };

  const valAdded = (item) => (locationFrom === "AddPlan" ? item.MC : 1);

  /*
Filter: 
When entering from planner: Filter all modules planned
Entering from records: Filter all modules mapped (to course) + planned
Prereq: matched with whatever is planned / take
*/

  const holders = (item) => (
    <Container
      name={item.name}
      prereq={true}
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
            "There are no prerequisite nor preclusion for this module",
            [{ text: "Cancel", onPress: () => {} }],
            { cancelable: false }
          );
        }
        //setPreReqInfo();
        return null;
        // setItem(item);
        // setSplit(compute(item.taken, item.notTaken));
      }}
      button2Press={() => {
        // console.log(item.semesters);
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

  // const textWithIcon = (name) => (
  //   <View
  //     style={{
  //       flexDirection: "row",
  //       flex: 1,
  //       alignItems: "center",
  //       justifyContent: "flex-start",
  //       paddingVertical: 6,
  //     }}
  //   >
  //     <View
  //       style={{
  //         backgroundColor: "black",
  //         width: 0.02 * width,
  //         height: 0.02 * width,
  //         borderRadius: (0.02 * width) / 2,
  //         marginRight: 7,
  //       }}
  //     />
  //     <View style={{ flex: 1, flexDirection: "row", width: "100%" }}>
  //       <Text
  //         numberOfLines={1}
  //         style={{ ...globalFontStyles.OSR_13, color: "#0E2131" }}
  //       >
  //         {name}
  //       </Text>
  //     </View>
  //   </View>
  // );

  // const modal = (portion1, portion2) => {
  //   return (
  //     <Modal
  //       style={styles.modalBox}
  //       animationIn="fadeIn"
  //       animationOut="fadeOut"
  //       backdropTransitionOutTiming={0}
  //       isVisible={modalVisible}
  //       onBackdropPress={() => {
  //         setModalVisible(false);
  //       }}
  //       onBackButtonPress={() => {
  //         setModalVisible(false);
  //       }}
  //     >
  //       <View
  //         style={{
  //           height: `${portion1}%`,
  //           top: 15,
  //           width: "100%",
  //           paddingBottom: 10,
  //         }}
  //       >
  //         <Text style={{ ...globalFontStyles.OSSB_14 }}>
  //           {portion1 > 0 ? "Taken" : ""}
  //         </Text>
  //         <FlatList
  //           showsVerticalScrollIndicator={false}
  //           data={current.taken}
  //           keyExtractor={(item) => item.key.toString()}
  //           renderItem={({ item }) => textWithIcon(item.name)}
  //         />
  //       </View>
  //       <View style={{ height: `${portion2}%`, width: "100%", paddingTop: 20 }}>
  //         <Text style={{ ...globalFontStyles.OSSB_14 }}>
  //           {portion2 > 0 ? "Not Taken" : ""}
  //         </Text>
  //         <FlatList
  //           data={current.notTaken}
  //           keyExtractor={(item) => item.key.toString()}
  //           renderItem={({ item }) => textWithIcon(item.name)}
  //         />
  //       </View>
  //     </Modal>
  //   );
  // };
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
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerPreStyling}>Preclusion</Text>
            </View>
            <View style={{ flex: 3 }}>
              <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
                <Text style={{ color: "#3B6EA2", ...globalFontStyles.OSSB_13 }}>
                  {preclu}
                </Text>
              </ScrollView>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.headerPreStyling}>prerequisite</Text>
            </View>
            <View style={{ flex: 3 }}>
              <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
                <Text style={{ color: "#3B6EA2", ...globalFontStyles.OSSB_13 }}>
                  {prereq}
                </Text>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const crossIcon = (
    <Entypo size={20} name="cross" style={{ color: "red", top: 2 }} />
  );
  const tickIcon = (
    <Entypo size={20} name="check" style={{ color: "green", top: 1 }} />
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
        <View style={{ flex: 1, flexDirection: "row" }}>
          {arrayToMake.map(({ color, title }, index) => (
            <ModuleBlocks color={color} key={index} title={title} sum={sum} />
          ))}
        </View>
      );
    }
  };
  const infoModal = () => {
    const codeName = infoInfo[1];
    const mc = infoInfo[0];
    const description = infoInfo[2];
    const semData = infoInfo[3]; // check with keane if he did anything to do checking of displaying the information !
    const suOptions = infoInfo[4];
    const workLoad = infoInfo[5];
    return (
      <Modal
        style={styles.modalBox}
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
          <View style={styles.twoCenter}>
            <Text style={styles.headerStyling}>{codeName ? codeName : ""}</Text>
          </View>
          <View style={styles.lineDesign} />
          <View style={{ flex: 11 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.mdStyle}>Module Details</Text>
            </View>
            <View style={{ flex: 12 }}>
              <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
                <Text style={{ color: "#3B6EA2", ...globalFontStyles.OSR_13 }}>
                  {description}
                </Text>
                <Text></Text>
              </ScrollView>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ ...styles.oneCenter, bottom: 10 }}>
              <Text style={styles.mcTextStyle}>{`Number of MCs: ${mc}`}</Text>
            </View>
            <View style={{ ...styles.oneCenter, ...styles.flexRow10 }}>
              <Text style={styles.suTextStyle}>SU availability:</Text>
              {suOptions ? tickIcon : crossIcon}
            </View>
          </View>
          <View style={{ ...styles.twoCenter }}>
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
      {/* {modal(split, 100 - split)} */}
      <BottomBar
        leftText={`${moduleOrMC}: ${MCcount}`}
        clearAll={() => null}
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
    marginVertical: height * 0.35,
    width: width * 0.9,
    borderRadius: 25,
  },
  twoCenter: { flex: 2, alignItems: "center", justifyContent: "center" },
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
    left: 0.05 * width,
    top: 5,
  },
  mdStyle: {
    alignSelf: "center",
    ...globalFontStyles.OSB_17,
    color: "#2A4F74",
  },
});
