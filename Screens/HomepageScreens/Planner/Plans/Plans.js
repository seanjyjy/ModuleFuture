import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Keyboard,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-eva-icons";
import { globalFontStyles } from "../../../../Component/GlobalFont";
import Modal from "react-native-modalbox";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import FeatherIcon from "react-native-vector-icons/Feather";
import FirebaseDB from "../../../../FirebaseDB";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

console.disableYellowBox = true;

const ImageSet = [
  require("../../../../assets/plan1.png"),
  require("../../../../assets/plan2.png"),
  require("../../../../assets/plan3.png"),
  require("../../../../assets/plan4.png"),
];
const dateFormatter = (date, month, year, hour, minute) => {
  let newDate = date;
  let newMonth = month;
  let newYear = year;
  let newHour = hour;
  let newMinute = minute;
  if (parseInt(date) < 10) {
    newdate = "0" + newDate;
  }
  if (parseInt(newMonth) < 10) {
    newMonth = "0" + newMonth;
  }
  if (parseInt(newHour) < 10) {
    newHour = "0" + newHour;
  }
  if (parseInt(newMinute) < 10) {
    newMinute = "0" + newMinute;
  }
  return (
    newDate +
    "/" +
    newMonth +
    "/" +
    newYear +
    ", " +
    newHour +
    ":" +
    newMinute +
    " " +
    (newHour <= 12 ? "AM" : "PM")
  );
};

const calcTime = (dateInStr) => {
  let today = new Date();
  let getDate = today.getDate();
  let getMonth = today.getMonth() + 1;
  let getYear = today.getFullYear();
  let getHours = today.getHours();
  let getMinutes = today.getMinutes();
  let date = dateFormatter(getDate, getMonth, getYear, getHours, getMinutes);
  const todayDateArray = dateExtractor(date);
  const previousDateArray = dateExtractor(dateInStr);
  if (todayDateArray[0] == previousDateArray[0]) {
    return "Today " + previousDateArray[1];
  } else if (isYesturday(todayDateArray[0], previousDateArray[0])) {
    return "Yesturday " + previousDateArray[1];
  } else {
    return previousDateArray[0] + " " + previousDateArray[1];
  }
};

const dateExtractor = (str) => {
  let tempStr = "";
  let timeStr = "";
  let tempStart = true;
  let timeStart = false;
  for (let i = 0; i < str.length; i++) {
    if (str.charAt(i) === ",") {
      tempStart = false;
    }
    if (tempStart) {
      tempStr += str.charAt(i);
    }
    if (timeStart) {
      timeStr += str.charAt(i);
    }
    if (str.charAt(i) === " ") {
      timeStart = true;
    }
  }
  return [tempStr, timeStr];
};

const isYesturday = (str1, str2) => {
  if (str1.length !== str2.length) {
    return false;
  } else {
    let dateForStr1 = "";
    let dateForStr2 = "";
    let len = str1.length;
    for (let i = 0; i < len; i++) {
      if (str1.charAt(i) === "/") {
        if (parseInt(dateForStr1) - parseInt(dateForStr2) === 1) {
          if (
            str1.charAt(i + 1) + str1.charAt(i + 2) ===
            str2.charAt(i + 1) + str2.charAt(i + 2)
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    }
  }
};
const colorSet = ["#E09797", "#745454", "white", "#fcf2d8"];
function RectInfoSelected({
  id,
  selected,
  onSelect,
  imageLink,
  idChange,
  nameOfPlan,
  SemestralCap,
  OverallCap,
  MCs,
  LastUpdated,
  PlannedCap,
  useInCap,
  PlannedOverallCap,
}) {
  return (
    <TouchableOpacity
      style={{ ...styles.boxStyle }}
      activeOpacity={0.95}
      onPress={() => {
        onSelect(id);
        idChange(id);
      }}
    >
      <View style={{ flex: 1, overflow: "hidden", borderRadius: 30 }}>
        <ImageBackground style={{ flex: 1 }} source={ImageSet[imageLink]}>
          <View style={styles.boxDesign}>
            <Text
              style={{ ...globalFontStyles.OSR_14, color: colorSet[imageLink] }}
            >
              {selected ? "Current" : ""}
            </Text>
          </View>
          <View style={{ flex: 10 }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  ...globalFontStyles.OSSB_19,
                  left: 20,
                  color: colorSet[imageLink],
                  bottom: 5,
                }}
              >
                {nameOfPlan}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  ...styles.OSSBL20ColorBlack,
                  color: colorSet[imageLink],
                }}
              >
                {useInCap
                  ? `Semestral CAP: ${SemestralCap === 0 ? "-" : SemestralCap}`
                  : `Planned CAP: ${PlannedCap === 0 ? "-" : PlannedCap}`}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  ...styles.OSSBL20ColorBlack,
                  color: colorSet[imageLink],
                }}
              >
                {useInCap
                  ? `Overall CAP: ${OverallCap === 0 ? "-" : OverallCap}`
                  : `Planned Overall CAP: ${
                      PlannedOverallCap === 0 ? "-" : PlannedOverallCap
                    }`}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  ...styles.OSSBL20ColorBlack,
                  color: colorSet[imageLink],
                }}
              >
                {`MCs: ${MCs === 0 ? "-" : MCs}`}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  ...styles.OSSBL20ColorBlack,
                  color: colorSet[imageLink],
                }}
              >
                {calcTime(LastUpdated)}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}

const Plans = (props) => {
  const navigation = useNavigation();
  const info = props.data;
  const userID = info[0];
  const fromWhere = props.headerTitle;
  const docLoc = userID.concat("_", fromWhere);
  const plansArrayRef = FirebaseDB.firestore()
    .collection("plansArray")
    .doc(docLoc);
  const [currentArr, setCurrentArr] = useState(info[1]);
  const [selected, setSelected] = React.useState(new Map().set(info[2], true));
  const [planName, setPlanName] = useState("");
  const [currentID, setCurrentID] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleDeletion, setModalVisibleDeletion] = useState(false);
  const [size, setSize] = useState(props.data[1].length);
  const [showDustBin, setShowDustBin] = useState(true);
  const [alertText, setAlertText] = useState(false);
  const [alertText1, setAlertText1] = useState(false);
  const [arrForRect, setArrForRect] = useState(info[3]);
  const [selectedplansinfo, setselectedplansinfo] = useState(info[4]);

  const fb = FirebaseDB.firestore();
  const [moduleMapping, setModuleMapping] = useState({});
  const [Types, setTypes] = useState({});
  const [Codes, setCodes] = useState({});
  const [Levels, setLevels] = useState({});
  const [records, setRecords] = useState({});
  const [taken, setTaken] = useState({});

  const typeRef = fb.collection("typeArray").doc(userID);
  const codeRef = fb.collection("codeArray").doc(userID);
  const levelRef = fb.collection("levelArray").doc(userID);
  const recordsRef = fb.collection("records").doc(userID);
  const moduleMappingRef = fb.collection("modulesMapping").doc(userID);
  const takenModulesRef = fb.collection("takenModules").doc(userID);

  useEffect(() => {
    const unsub = plansArrayRef.onSnapshot(
      (document) => {
        const val = document.data();
        if (val !== undefined) {
          const arr = val.yearSem;
          const arr2 = val.ArrForRect;
          const selected = val.selected;
          if (size > arr.length) {
            //deletion occurs
            setCurrentArr(arr);
            setArrForRect(arr2);
            setCurrentID(selected);
            setSelected(new Map().set(selected, true));
            setShowDustBin(true);
          } else {
            //addition occurs
            setArrForRect(props.data[3]);
            setSelected(new Map().set(selected, true));
            setCurrentArr(props.data[1]);
            setCurrentID(selected);
            if (props.data[2] !== "-1") {
              setShowDustBin(true);
            }
            setselectedplansinfo(props.data[4]);
          }
          setSize(arr.length);
          if (val.selected === "-1") {
            setShowDustBin(false);
          } else {
            setShowDustBin(true);
          }
        } else {
          plansArrayRef.set({ yearSem: [], selected: "-1", ArrForRect: [] });
          setCurrentArr([]);
          setShowDustBin(false);
          setCurrentID("-1");
        }
        moduleMappingRef.get().then((document) => {
          setModuleMapping(document.data());
        });
        recordsRef.get().then((document) => {
          setRecords(document.data());
        });
        typeRef.get().then((document) => {
          setTypes(document.data());
        });
        codeRef.get().then((document) => {
          setCodes(document.data());
        });
        levelRef.get().then((document) => {
          setLevels(document.data());
        });
        takenModulesRef.get().then((document) => {
          setTaken(document.data());
        });
      },
      (error) => null
    );
    return () => unsub();
  }, [userID, props.data]);

  const onSelect = React.useCallback(
    (key) => {
      if (!selected.get(key)) {
        setShowDustBin(true);
      } else {
        setShowDustBin(false);
      }
      const newSelected = new Map();
      newSelected.set(key, !selected.get(key));
      setSelected(newSelected);
    },
    [selected]
  );

  const setCurrentlyPressID = (val) => {
    if (val === currentID) {
      setCurrentID("-1");
    } else {
      setCurrentID(val);
    }
  };

  const existBefore = (val, arr) => {
    let truth = false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].nameOfPlan === val) {
        truth = true;
      }
    }
    return truth;
  };

  const lettersChecker = (val) => {
    if (val !== "S" && val !== "CS" && val !== "CU") {
      return true;
    } else {
      return false;
    }
  };

  const GradeToPoint = (val) => {
    return val === "A+" || val === "A"
      ? 5.0
      : val === "A-"
      ? 4.5
      : val === "B+"
      ? 4.0
      : val === "B"
      ? 3.5
      : val === "B-"
      ? 3.0
      : val === "C+"
      ? 2.5
      : val === "C"
      ? 2.0
      : val === "D+"
      ? 1.5
      : val === "D"
      ? 1.0
      : 0;
  };

  const SuccessFulDeletion = () => {
    return (
      <Modal
        style={styles.modalBox2}
        isOpen={modalVisibleDeletion}
        backdropPressToClose={false}
        backdropOpacity={0.1}
        animationDuration={300}
        coverScreen={true}
        onClosed={() => setModalVisibleDeletion(false)}
        keyboardTopOffset={300}
        position="center"
        useNativeDriver={true}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.deletionTextAlertStyle}>
            <Text style={{ ...globalFontStyles.NBEB_24, color: "#4AE8AB" }}>
              Successful Deletion!
            </Text>
          </View>
          <View style={{ flex: 2 }}>
            <FeatherIcon
              name="check-circle"
              size={75}
              style={{ color: "#4AE8AB", alignSelf: "center" }}
            />
          </View>
        </View>
      </Modal>
    );
  };

  // ------------------------UNABLE TO PREVENT ANDROID MODAL TO STAY STATIONARY ----------------------------------------------------------
  const PopOutBox = () => {
    return (
      <Modal
        style={styles.modalBox}
        isOpen={modalVisible}
        backdropPressToClose={false}
        coverScreen={true}
        onClosed={() => setModalVisible(false)}
        keyboardTopOffset={300}
        position="center"
        useNativeDriver={true}
      >
        <View style={styles.modalHeaderQuestion}>
          <Text style={styles.popoutheader}>Name of Plan</Text>
        </View>
        <View style={{ ...styles.flexOneCenter }}>
          <View style={styles.textIntputContainerStyle}>
            <TextInput
              style={styles.textInputStyle}
              placeholder="e.g. Main Plan"
              onChangeText={(val) => setPlanName(val)}
            />
          </View>
          {alertText || alertText1 ? (
            alertText ? (
              <Text style={styles.alertTextStyle}>
                Please enter a plan name
              </Text>
            ) : (
              <Text style={styles.alertTextStyle}>
                This plan name exists already!
              </Text>
            )
          ) : (
            <View />
          )}
        </View>
        <View style={styles.holdingCancelAndConfirm}>
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              setAlertText(false);
              setAlertText1(false);
              setModalVisible(false);
            }}
            activeOpacity={0.9}
            style={{
              ...styles.flexOneCenter,
              borderRightWidth: 1,
              borderColor: "#D0CECE",
            }}
          >
            <Text style={{ ...globalFontStyles.NB_14, color: "#007AFF" }}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flexOneCenter}
            activeOpacity={0.9}
            onPress={() => {
              if (existBefore(planName, currentArr) || planName.length <= 0) {
                if (planName.length <= 0) setAlertText(true);
                if (existBefore(planName, currentArr)) setAlertText1(true);
              } else {
                Keyboard.dismiss();
                setAlertText(false);
                setAlertText1(false);
                setModalVisible(false);
                navigation.navigate("AddPlan", {
                  item: [
                    planName,
                    userID.concat("_", props.headerTitle),
                    size,
                    props.headerTitle,
                  ],
                  from: "Plans",
                });
              }
            }}
          >
            <Text style={{ ...globalFontStyles.NB_14, color: "#007AFF" }}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  const emptySpace = <View style={styles.dustBinStyle} />;
  const dustBin = (
    <View style={styles.dustBinStyle}>
      <TouchableOpacity
        style={styles.tempDustBinHolder}
        activeOpacity={0.9}
        onPress={() => {
          if (currentArr.length > 0) {
            plansArrayRef
              .get()
              .then((document) => {
                const val = document.data();
                if (val !== undefined) {
                  const arr = val.yearSem;
                  let justDelete = false;
                  let pos = 0;
                  let planName = "";
                  for (let i = 0; i < arr.length; i++) {
                    if (arr[i].key === currentID) {
                      pos = i;
                      planName = arr[i].nameOfPlan;
                      if (!arr[i].useInCap) {
                        justDelete = true;
                      }
                      break;
                    }
                  }
                  if (justDelete) {
                    // THIS MEANS THAT THIS PLAN IS NOT A IMPORTANT PLAN
                    setModalVisibleDeletion(true);
                    setTimeout(() => setModalVisibleDeletion(false), 1600);
                    let tempArr = [];
                    let tempIndex = 0;
                    let newarrForRect = [];
                    for (let i = 0; i < arr.length; i++) {
                      if (arr[i].key !== currentID) {
                        tempArr.push({
                          LastUpdated: arr[i].LastUpdated,
                          MCs: arr[i].MCs,
                          Cap: arr[i].Cap,
                          key: (tempIndex + 1).toString(),
                          nameOfPlan: arr[i].nameOfPlan,
                          useInCap: arr[i].useInCap,
                          MCsCountedToCap: arr[i].MCsCountedToCap,
                        });
                        tempIndex++;
                        newarrForRect.push(arrForRect[i]);
                      }
                    }
                    let whatPos = (parseInt(currentID) - 1).toString();
                    if (whatPos === "0" && tempArr.length > 0) {
                      whatPos = "1";
                    }
                    //deletion in plansItself
                    const currentPlanName = arr[pos].nameOfPlan;
                    FirebaseDB.firestore()
                      .collection("plansItself")
                      .doc(
                        userID.concat(
                          "_",
                          props.headerTitle,
                          "_",
                          currentPlanName
                        )
                      )
                      .delete();
                    // updates in UserRef plansSelected info
                    let newSelectedPlansInfo = [];
                    let isThereApreviousFinalGrade = false;
                    let previousObjNoFinalGrade;
                    for (let i = 0; i < tempArr.length; i++) {
                      if (tempArr[i].useInCap) {
                        isThereApreviousFinalGrade = true;
                      }
                      if (tempArr[i].key === whatPos) {
                        previousObjNoFinalGrade = {
                          Cap: tempArr[i].Cap,
                          McUsedInCap: tempArr[i].MCsCountedToCap,
                          Semester: props.headerTitle,
                          useInCap: false,
                          nameOfPlan: tempArr[i].nameOfPlan,
                        };
                      }
                    }
                    for (let i = 0; i < selectedplansinfo.length; i++) {
                      // checking if the plan to be deleted exist in selectedPlansInfo
                      if (
                        selectedplansinfo[i].nameOfPlan === planName &&
                        !isThereApreviousFinalGrade
                      ) {
                        if (whatPos !== "0")
                          newSelectedPlansInfo.push(previousObjNoFinalGrade);
                      } else newSelectedPlansInfo.push(selectedplansinfo[i]);
                    }
                    setselectedplansinfo(newSelectedPlansInfo);
                    const userRef = FirebaseDB.firestore()
                      .collection("users")
                      .doc(userID);
                    plansArrayRef.set({
                      yearSem: tempArr,
                      selected: whatPos,
                      ArrForRect: newarrForRect,
                    });
                    userRef.update({
                      SelectedPlansInfo: newSelectedPlansInfo,
                    });
                  } else {
                    Alert.alert(
                      "Warning",
                      "This plan contains the data for your CAP calculation! \n If you're sure you want to remove, press Continue to advance",
                      [
                        { text: "Cancel", onPress: () => {} },
                        {
                          text: "Continue",
                          onPress: () => {
                            setModalVisibleDeletion(true);
                            setTimeout(
                              () => setModalVisibleDeletion(false),
                              1600
                            );
                            let tempArr = [];
                            let tempIndex = 0;
                            let newarrForRect = [];
                            let finalName = "";
                            let haveAchange = false;
                            for (let i = 0; i < arr.length; i++) {
                              if (arr[i].key !== currentID) {
                                tempArr.push({
                                  LastUpdated: arr[i].LastUpdated,
                                  MCs: arr[i].MCs,
                                  Cap: arr[i].Cap,
                                  key: (tempIndex + 1).toString(),
                                  nameOfPlan: arr[i].nameOfPlan,
                                  useInCap: arr[i].useInCap,
                                  MCsCountedToCap: arr[i].MCsCountedToCap,
                                });
                                tempIndex++;
                                newarrForRect.push(arrForRect[i]);
                                if (arr[i].useInCap) {
                                  haveAchange = true;
                                  finalName = arr[i].nameOfPlan;
                                }
                              }
                            }
                            let whatPos = (parseInt(currentID) - 1).toString();
                            if (whatPos === "0" && tempArr.length > 0) {
                              whatPos = "1";
                            }
                            let newSelectedPlansInfo = [];
                            let isThereApreviousFinalGrade = false;
                            let thepreviousObjFinalGrade;
                            let previousObjNoFinalGrade;
                            for (let i = 0; i < tempArr.length; i++) {
                              if (tempArr[i].useInCap) {
                                isThereApreviousFinalGrade = true;
                                thepreviousObjFinalGrade = {
                                  Cap: tempArr[i].Cap,
                                  McUsedInCap: tempArr[i].MCsCountedToCap,
                                  Semester: props.headerTitle,
                                  useInCap: true,
                                  nameOfPlan: tempArr[i].nameOfPlan,
                                };
                                whatPos = tempArr[i].key;
                              } else {
                                if (tempArr[i].key === whatPos) {
                                  previousObjNoFinalGrade = {
                                    Cap: tempArr[i].Cap,
                                    McUsedInCap: tempArr[i].MCsCountedToCap,
                                    Semester: props.headerTitle,
                                    useInCap: false,
                                    nameOfPlan: tempArr[i].nameOfPlan,
                                  };
                                }
                              }
                            }
                            plansArrayRef.set({
                              yearSem: tempArr,
                              selected: whatPos,
                              ArrForRect: newarrForRect,
                            });
                            for (let i = 0; i < selectedplansinfo.length; i++) {
                              // checking if the plan to be deleted exist in selectedPlansInfo
                              if (
                                selectedplansinfo[i].nameOfPlan === planName
                              ) {
                                // if there is a previous final grade inputted, then we go to that
                                if (isThereApreviousFinalGrade)
                                  newSelectedPlansInfo.push(
                                    thepreviousObjFinalGrade
                                  );
                                else {
                                  // else we will just go to the closest plan if exist.
                                  if (whatPos !== "0") {
                                    newSelectedPlansInfo.push(
                                      previousObjNoFinalGrade
                                    );
                                  }
                                }
                              } else
                                newSelectedPlansInfo.push(selectedplansinfo[i]);
                            }
                            // deletion in plansArray
                            const currentPlanName = arr[pos].nameOfPlan;

                            const usersModulesDetailsRef = FirebaseDB.firestore()
                              .collection("usersModulesDetails")
                              .doc(userID);

                            // Removing current modules from the current semester
                            // Updating for records / focus area

                            const origTaken = records.taken;
                            const origNotTaken = records.notTaken;
                            const toInclude = new Set(records.mapping);
                            let newNotTaken = [];
                            const newTaken = [];
                            let typeObj = Types;
                            let codeObj = Codes;
                            let levelObj = Levels;

                            for (let i = 0; i < origTaken.length; i++) {
                              if (origTaken[i].sem === fromWhere) {
                                const numMcs = origTaken[i].numMcs;
                                const codePrefix = origTaken[i].codePrefix;
                                const type = origTaken[i].type;
                                const level = origTaken[i].level;
                                const code = origTaken[i].code;
                                const grade = origTaken[i].grade;
                                const modulePoints =
                                  numMcs * GradeToPoint(grade);
                                const bool = lettersChecker(grade);

                                if (toInclude.has(type)) {
                                  origNotTaken.push({
                                    name: origTaken[i].name,
                                    type: type,
                                    code: code,
                                    level: level,
                                    codePrefix: codePrefix,
                                    numMcs: numMcs,
                                  });
                                }

                                const indexType = typeObj[type];
                                const indexCode = codeObj[codePrefix];
                                const indexLevel = levelObj[level.toString()];
                                if (grade !== "CU") {
                                  typeObj.cat[indexType].mcsTaken -= numMcs;
                                  typeObj.cat[indexType].numTaken -= 1;
                                  codeObj.cat[indexCode].mcsTaken -= numMcs;
                                  codeObj.cat[indexCode].numTaken -= 1;
                                  levelObj.cat[indexLevel].mcsTaken -= numMcs;
                                  levelObj.cat[indexLevel].numTaken -= 1;
                                }
                                if (bool) {
                                  typeObj.cat[indexType].mcsUsedInCap -= numMcs;
                                  codeObj.cat[indexCode].mcsUsedInCap -= numMcs;
                                  levelObj.cat[
                                    indexLevel
                                  ].mcsUsedInCap -= numMcs;

                                  typeObj.cat[indexType].points -= modulePoints;
                                  levelObj.cat[
                                    indexLevel
                                  ].points -= modulePoints;
                                  codeObj.cat[indexCode].points -= modulePoints;
                                }
                                delete taken[code];
                              } else {
                                newTaken.push(origTaken[i]);
                              }
                            }

                            if (haveAchange) {
                              // this signifies that the users has an older data with final grades input
                              const dataToBeInserted = FirebaseDB.firestore()
                                .collection("plansItself")
                                .doc(
                                  userID.concat(
                                    "_",
                                    props.headerTitle,
                                    "_",
                                    finalName
                                  )
                                );
                              let thisSemsemTotalMcUsedInCap = 0;
                              let thisSemtotalMcUsedInCap = 0;
                              let thisSemsemSum = 0;
                              let thisSemtotalSum = 0;
                              let thisSemtotalMc = 0;
                              let thisSemsemMc = 0;
                              let newModulesDetailsArray = [];

                              dataToBeInserted
                                .get()
                                .then((document) => {
                                  const val = document.data();
                                  const arr = val.planInfo;
                                  // For records & focus

                                  // Remove from notTaken
                                  const newSet = new Set();
                                  arr.forEach((x) => {
                                    newSet.add(x.moduleCode);
                                  });

                                  for (
                                    let i = 0;
                                    i < origNotTaken.length;
                                    i++
                                  ) {
                                    if (!newSet.has(origNotTaken[i].code)) {
                                      newNotTaken.push(origNotTaken[i]);
                                    }
                                  }
                                  // For moduleDetailsArray & records
                                  for (let i = 0; i < arr.length; i++) {
                                    const moduleCode = arr[i].moduleCode;
                                    const moduleName = arr[i].name;
                                    const FinalGrade = arr[i].FinalGrade;
                                    const NumMcs = arr[i].NumMcs;
                                    const Level = arr[i].Level;
                                    const codePrefix = arr[i].codePrefix;
                                    const modulePoints =
                                      NumMcs * GradeToPoint(FinalGrade);
                                    const bool = lettersChecker(FinalGrade);
                                    // Check if moduleType exists
                                    let moduleType = "";
                                    // Finding type
                                    if (
                                      moduleMapping[moduleCode] !== undefined
                                    ) {
                                      moduleType = moduleMapping[moduleCode];
                                    }
                                    // Module is found in mapping
                                    if (moduleType !== "") {
                                      const indexType = typeObj[moduleType];
                                      if (
                                        typeObj.cat[indexType].mcsTaken >=
                                        typeObj.cat[indexType].mcsRequired
                                      ) {
                                        moduleType = "UE";
                                      }
                                    } else {
                                      const index = typeObj["ULR"];
                                      if (
                                        codePrefix.length === 3 &&
                                        (codePrefix.substring(0, 2) === "GE" ||
                                          codePrefix === "UTS" ||
                                          codePrefix === "UTC") &&
                                        typeObj.cat[index].mcsTaken <
                                          typeObj.cat[index].mcsRequired
                                      ) {
                                        moduleType = "ULR";
                                      } else {
                                        moduleType = "UE";
                                      }
                                    }

                                    // Check if it is a new code
                                    if (codeObj[codePrefix] === undefined) {
                                      codeObj[codePrefix] = codeObj.cat.length;
                                      codeObj.cat.push({
                                        name: codePrefix,
                                        key: codeObj.cat.length + 1,
                                        mcsTaken: 0,
                                        numTaken: 0,
                                        mcsUsedInCap: 0,
                                        points: 0,
                                      });
                                    }
                                    // Check if it is a new level
                                    if (
                                      levelObj[Level.toString()] === undefined
                                    ) {
                                      levelObj[Level.toString()] =
                                        levelObj.cat.length;
                                      levelObj.cat.push({
                                        name: Level.toString() + "s",
                                        context: Level,
                                        key: levelObj.cat.length + 1,
                                        mcsTaken: 0,
                                        numTaken: 0,
                                        mcsUsedInCap: 0,
                                        points: 0,
                                      });
                                    }
                                    const indexType = typeObj[moduleType];
                                    const indexCode = codeObj[codePrefix];
                                    const indexLevel =
                                      levelObj[Level.toString()];

                                    if (FinalGrade !== "CU") {
                                      typeObj.cat[indexType].mcsTaken += NumMcs;
                                      typeObj.cat[indexType].numTaken += 1;
                                      codeObj.cat[indexCode].mcsTaken += NumMcs;
                                      codeObj.cat[indexCode].numTaken += 1;
                                      levelObj.cat[
                                        indexLevel
                                      ].mcsTaken += NumMcs;
                                      levelObj.cat[indexLevel].numTaken += 1;
                                    }
                                    if (bool) {
                                      typeObj.cat[
                                        indexType
                                      ].mcsUsedInCap += NumMcs;
                                      codeObj.cat[
                                        indexCode
                                      ].mcsUsedInCap += NumMcs;
                                      levelObj.cat[
                                        indexLevel
                                      ].mcsUsedInCap += NumMcs;

                                      typeObj.cat[
                                        indexType
                                      ].points += modulePoints;
                                      codeObj.cat[
                                        indexCode
                                      ].points += modulePoints;
                                      levelObj.cat[
                                        indexLevel
                                      ].points += modulePoints;
                                    }
                                    newTaken.push({
                                      name: moduleName,
                                      code: moduleCode,
                                      type: moduleType,
                                      grade: FinalGrade,
                                      level: Level,
                                      codePrefix: codePrefix,
                                      numMcs: NumMcs,
                                      sem: fromWhere,
                                    });

                                    taken[moduleCode] = {
                                      name: moduleName,
                                      code: moduleCode,
                                      grade: FinalGrade,
                                      numMcs: NumMcs,
                                      sem: fromWhere,
                                    };

                                    // moduleDetailsArray
                                    newModulesDetailsArray.push({
                                      FinalGrade: FinalGrade,
                                      Level: Level,
                                      NumMcs: NumMcs,
                                      codePrefix: codePrefix,
                                      moduleCode: moduleCode,
                                      moduleName: moduleName,
                                    });

                                    if (bool) {
                                      thisSemsemTotalMcUsedInCap += NumMcs;
                                      thisSemtotalMcUsedInCap += NumMcs;
                                      thisSemsemSum += modulePoints;
                                      thisSemtotalSum += modulePoints;
                                    }
                                    thisSemtotalMc += NumMcs;
                                    thisSemsemMc += NumMcs;
                                  }

                                  // Set codeObj & sorting
                                  const newcodeObj = [];
                                  for (
                                    let i = codeObj.fixed;
                                    i < codeObj.cat.length;
                                    i++
                                  ) {
                                    if (codeObj.cat[i].mcsTaken !== 0) {
                                      newcodeObj.push({
                                        name: codeObj.cat[i].name,
                                        mcsTaken: codeObj.cat[i].mcsTaken,
                                        numTaken: codeObj.cat[i].numTaken,
                                        mcsUsedInCap:
                                          codeObj.cat[i].mcsUsedInCap,
                                        points: codeObj.cat[i].points,
                                      });
                                    } else {
                                      delete codeObj[codeObj.cat[i].name];
                                    }
                                  }

                                  newcodeObj.sort((a, b) => {
                                    if (a.mcsTaken >= b.mcsTaken) {
                                      return -1;
                                    } else {
                                      return 1;
                                    }
                                  });
                                  // reassign keys and indexes
                                  for (let i = 0; i < newcodeObj.length; i++) {
                                    newcodeObj[i].key = codeObj.fixed + i + 1;
                                    codeObj[newcodeObj[i].name] =
                                      codeObj.fixed + i;
                                  }

                                  codeObj.cat = codeObj.cat
                                    .slice(0, codeObj.fixed)
                                    .concat(newcodeObj);

                                  newNotTaken.sort((a, b) => {
                                    if (a.code <= b.code) {
                                      return -1;
                                    } else {
                                      return 1;
                                    }
                                  });

                                  newTaken.sort((a, b) => {
                                    if (a.sem < b.sem) {
                                      return -1;
                                    } else if (a.sem === b.sem) {
                                      if (a.code < b.code) {
                                        return -1;
                                      } else {
                                        return 1;
                                      }
                                    } else {
                                      return 1;
                                    }
                                  });

                                  typeRef.set(typeObj);
                                  codeRef.set(codeObj);
                                  levelRef.set(levelObj);
                                  takenModulesRef.set(taken);
                                  recordsRef.update({
                                    notTaken: newNotTaken,
                                    taken: newTaken,
                                  });
                                  // end of for loop
                                  const newObjToInsert = {
                                    Semester: props.headerTitle,
                                    ModulesDetailsArray: newModulesDetailsArray,
                                    nameOfPlan: val.nameOfPlan,
                                  };
                                  usersModulesDetailsRef
                                    .get()
                                    .then((document) => {
                                      const val = document.data();
                                      const arr1 = val.usersModulesArray;
                                      const nextArr = [];
                                      const tempArr2 = [];
                                      let totalSum = 0;
                                      let totalMc = 0;
                                      let totalMcUsedInCap = 0;
                                      for (let k = 0; k < arr1.length; k++) {
                                        let semSum = 0;
                                        let semMc = 0;
                                        let semTotalMcUsedInCap = 0;
                                        if (
                                          arr1[k].Semester !== props.headerTitle
                                        ) {
                                          nextArr.push(arr1[k]);
                                          const refPoint =
                                            arr1[k].ModulesDetailsArray;
                                          for (
                                            let j = 0;
                                            j < refPoint.length;
                                            j++
                                          ) {
                                            const mc = refPoint[j].NumMcs;
                                            const points = GradeToPoint(
                                              refPoint[j].FinalGrade
                                            );
                                            if (
                                              lettersChecker(
                                                refPoint[j].FinalGrade
                                              )
                                            ) {
                                              semTotalMcUsedInCap += mc;
                                              totalMcUsedInCap += mc;
                                              semSum += mc * points;
                                              totalSum += mc * points;
                                            }
                                            totalMc += mc;
                                            semMc += mc;
                                          }
                                          tempArr2.push({
                                            SemestralCap: parseFloat(
                                              (
                                                semSum / semTotalMcUsedInCap
                                              ).toFixed(2)
                                            ),
                                            OverallCap: parseFloat(
                                              (
                                                totalSum / totalMcUsedInCap
                                              ).toFixed(2)
                                            ),
                                            Semester: arr1[k].Semester,
                                            SemestralMc: semMc,
                                            OverallMc: totalMc,
                                            MCcountedToCap: semTotalMcUsedInCap,
                                            TotalMcUsedInCap: totalMcUsedInCap,
                                          });
                                        } else {
                                          nextArr.push(newObjToInsert);
                                          semTotalMcUsedInCap += thisSemsemTotalMcUsedInCap;
                                          totalMcUsedInCap += thisSemtotalMcUsedInCap;
                                          semSum += thisSemsemSum;
                                          totalSum += thisSemtotalSum;
                                          totalMc += thisSemtotalMc;
                                          semMc += thisSemsemMc;
                                          tempArr2.push({
                                            SemestralCap: parseFloat(
                                              (
                                                semSum / semTotalMcUsedInCap
                                              ).toFixed(2)
                                            ),
                                            OverallCap: parseFloat(
                                              (
                                                totalSum / totalMcUsedInCap
                                              ).toFixed(2)
                                            ),
                                            Semester: props.headerTitle,
                                            SemestralMc: semMc,
                                            OverallMc: totalMc,
                                            MCcountedToCap: semTotalMcUsedInCap,
                                            TotalMcUsedInCap: totalMcUsedInCap,
                                          });
                                        }
                                      }
                                      const usersRef = FirebaseDB.firestore()
                                        .collection("users")
                                        .doc(userID);
                                      setselectedplansinfo(
                                        newSelectedPlansInfo
                                      );
                                      usersRef.update({
                                        CapArray: tempArr2,
                                        SelectedPlansInfo: newSelectedPlansInfo,
                                      });
                                      //deletion in usersModulesDetailsRef
                                      usersModulesDetailsRef.set({
                                        usersModulesArray: nextArr,
                                      });
                                      FirebaseDB.firestore()
                                        .collection("plansItself")
                                        .doc(
                                          userID.concat(
                                            "_",
                                            props.headerTitle,
                                            "_",
                                            currentPlanName
                                          )
                                        )
                                        .delete();
                                    });
                                })
                                .catch((error) => {});
                            } else {
                              // this means that no previous useInCap exist(no final grades)
                              newNotTaken = origNotTaken;
                              usersModulesDetailsRef
                                .get()
                                .then((document) => {
                                  const val = document.data();
                                  const arr1 = val.usersModulesArray;
                                  const nextArr = [];
                                  const tempArr2 = [];
                                  let totalSum = 0;
                                  let totalMc = 0;
                                  let totalMcUsedInCap = 0;
                                  for (let k = 0; k < arr1.length; k++) {
                                    let semSum = 0;
                                    let semMc = 0;
                                    let semTotalMcUsedInCap = 0;
                                    if (
                                      arr1[k].Semester !== props.headerTitle
                                    ) {
                                      nextArr.push(arr1[k]);
                                      const refPoint =
                                        arr1[k].ModulesDetailsArray;
                                      for (
                                        let j = 0;
                                        j < refPoint.length;
                                        j++
                                      ) {
                                        const mc = refPoint[j].NumMcs;
                                        const points = GradeToPoint(
                                          refPoint[j].FinalGrade
                                        );
                                        if (
                                          lettersChecker(refPoint[j].FinalGrade)
                                        ) {
                                          semTotalMcUsedInCap += mc;
                                          totalMcUsedInCap += mc;
                                          semSum += mc * points;
                                          totalSum += mc * points;
                                        }
                                        totalMc += mc;
                                        semMc += mc;
                                      }
                                      tempArr2.push({
                                        SemestralCap: parseFloat(
                                          (
                                            semSum / semTotalMcUsedInCap
                                          ).toFixed(2)
                                        ),
                                        OverallCap: parseFloat(
                                          (totalSum / totalMcUsedInCap).toFixed(
                                            2
                                          )
                                        ),
                                        Semester: arr1[k].Semester,
                                        SemestralMc: semMc,
                                        OverallMc: totalMc,
                                        MCcountedToCap: semTotalMcUsedInCap,
                                        TotalMcUsedInCap: totalMcUsedInCap,
                                      });
                                    }

                                    // deletion in usersRef
                                    const usersRef = FirebaseDB.firestore()
                                      .collection("users")
                                      .doc(userID);
                                    setselectedplansinfo(newSelectedPlansInfo);
                                    usersRef.update({
                                      CapArray: tempArr2,
                                      SelectedPlansInfo: newSelectedPlansInfo,
                                    });
                                    //deletion in usersModulesDetailsRef
                                    usersModulesDetailsRef.set({
                                      usersModulesArray: nextArr,
                                    });
                                    FirebaseDB.firestore()
                                      .collection("plansItself")
                                      .doc(
                                        userID.concat(
                                          "_",
                                          props.headerTitle,
                                          "_",
                                          currentPlanName
                                        )
                                      )
                                      .delete();
                                  }
                                  // Set codeObj & sorting
                                  const newcodeObj = [];
                                  for (
                                    let i = codeObj.fixed;
                                    i < codeObj.cat.length;
                                    i++
                                  ) {
                                    if (codeObj.cat[i].mcsTaken !== 0) {
                                      newcodeObj.push({
                                        name: codeObj.cat[i].name,
                                        mcsTaken: codeObj.cat[i].mcsTaken,
                                        numTaken: codeObj.cat[i].numTaken,
                                        mcsUsedInCap:
                                          codeObj.cat[i].mcsUsedInCap,
                                        points: codeObj.cat[i].points,
                                      });
                                    } else {
                                      delete codeObj[codeObj.cat[i].name];
                                    }
                                  }

                                  newcodeObj.sort((a, b) => {
                                    if (a.mcsTaken >= b.mcsTaken) {
                                      return -1;
                                    } else {
                                      return 1;
                                    }
                                  });
                                  // reassign keys and indexes
                                  for (let i = 0; i < newcodeObj.length; i++) {
                                    newcodeObj[i].key = codeObj.fixed + i + 1;
                                    codeObj[newcodeObj[i].name] =
                                      codeObj.fixed + i;
                                  }

                                  codeObj.cat = codeObj.cat
                                    .slice(0, codeObj.fixed)
                                    .concat(newcodeObj);

                                  newNotTaken.sort((a, b) => {
                                    if (a.code <= b.code) {
                                      return -1;
                                    } else {
                                      return 1;
                                    }
                                  });

                                  newTaken.sort((a, b) => {
                                    if (a.sem < b.sem) {
                                      return -1;
                                    } else if (a.sem === b.sem) {
                                      if (a.code < b.code) {
                                        return -1;
                                      } else {
                                        return 1;
                                      }
                                    } else {
                                      return 1;
                                    }
                                  });

                                  typeRef.set(typeObj);
                                  codeRef.set(codeObj);
                                  levelRef.set(levelObj);
                                  takenModulesRef.set(taken);
                                  recordsRef.update({
                                    notTaken: newNotTaken,
                                    taken: newTaken,
                                  });
                                })
                                .catch((error) => {});
                            }
                            // After else block
                          },
                        },
                      ],
                      { cancelable: false }
                    );
                  }
                }
              })
              .catch((error) => {});
          }
        }}
      >
        <Icon name="trash-2-outline" width={30} height={20} fill="#232323" />
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.overallContainer}>
      <View style={styles.header}>
        <ImageBackground
          style={styles.header}
          source={require("../../../../assets/HeaderBG.png")}
        >
          <View style={styles.arrowContainer}>
            <Ionicons
              name="md-arrow-round-back"
              size={25}
              style={{ color: "#3E3E3E", left: 30, bottom: 15 }}
              onPress={() => {
                // yearSem update here
                const userRef = FirebaseDB.firestore()
                  .collection("users")
                  .doc(userID);
                if (currentArr.length > 0) {
                  plansArrayRef.update({
                    selected: currentID,
                  });

                  userRef
                    .get()
                    .then((document) => {
                      const val = document.data();
                      const arr = val.SelectedPlansInfo;
                      let doIChange = true;
                      const currentPlanName =
                        currentArr[parseInt(currentID) - 1].nameOfPlan;
                      for (let i = 0; i < arr.length; i++) {
                        if (arr[i].Semester === props.headerTitle) {
                          if (
                            arr[i].useInCap ||
                            arr[i].nameOfPlan === currentPlanName
                          ) {
                            doIChange = false;
                          }
                          break;
                        }
                      }
                      if (doIChange) {
                        let tempArr = [];
                        for (let i = 0; i < arr.length; i++) {
                          if (arr[i].Semester === props.headerTitle) {
                            tempArr.push({
                              Cap: currentArr[parseInt(currentID) - 1].Cap,
                              McUsedInCap:
                                currentArr[parseInt(currentID) - 1]
                                  .MCsCountedToCap,
                              Semester: props.headerTitle,
                              nameOfPlan: currentPlanName,
                              useInCap: false,
                            });
                          } else {
                            tempArr.push(arr[i]);
                          }
                        }
                        userRef.update({
                          SelectedPlansInfo: tempArr,
                        });
                      }
                    })
                    .catch((error) => {});
                } else {
                  plansArrayRef.update({
                    selected: "-1",
                  });
                }
                navigation.goBack();
              }}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textStyling}>{props.headerTitle}</Text>
          </View>

          {showDustBin ? dustBin : emptySpace}
        </ImageBackground>
      </View>
      <View style={{ flex: 6, backgroundColor: "#f9f9f9", top: 5 }}>
        <FlatList
          ListEmptyComponent={
            <View style={{ flex: 1, backgroundColor: "#f9f9f9" }} />
          }
          showsVerticalScrollIndicator={false}
          data={currentArr}
          keyExtractor={(item) => item.key}
          extraData={selected}
          renderItem={({ item }) => (
            <RectInfoSelected
              id={item.key.toString()}
              selected={!!selected.get(item.key)}
              onSelect={onSelect}
              imageLink={(parseInt(item.key) - 1) % 4}
              idChange={(val) => setCurrentlyPressID(val)}
              nameOfPlan={item.nameOfPlan}
              SemestralCap={
                arrForRect.length === currentArr.length
                  ? arrForRect[parseInt(item.key) - 1].SemestralCap
                  : 0
              }
              OverallCap={
                arrForRect.length === currentArr.length
                  ? arrForRect[parseInt(item.key) - 1].OverallCap
                  : 0
              }
              MCs={
                arrForRect.length === currentArr.length
                  ? arrForRect[parseInt(item.key) - 1].MCs
                  : 0
              }
              PlannedCap={
                arrForRect.length === currentArr.length
                  ? arrForRect[parseInt(item.key) - 1].PlannedCap
                  : 0
              }
              PlannedOverallCap={
                arrForRect.length === currentArr.length
                  ? arrForRect[parseInt(item.key) - 1].PlannedOverallCap
                  : 0
              }
              useInCap={
                arrForRect.length === currentArr.length
                  ? arrForRect[parseInt(item.key) - 1].useInCap
                  : 0
              }
              LastUpdated={
                arrForRect.length === currentArr.length
                  ? arrForRect[parseInt(item.key) - 1].LastUpdated
                  : 0
              }
            />
          )}
        />
      </View>
      <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
        <View style={styles.btmPart}>
          <View style={{ flex: 1 }} />
          <View style={styles.btmMidPart}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.enterButton}
              onPress={() => {
                // come here later to solve the problem!
                if (currentArr.length === 0 || parseInt(currentID) - 1 < 0) {
                  alert("Please select or create a plan");
                } else {
                  if (currentArr.length > 0) {
                    const currentPlanName =
                      currentArr[parseInt(currentID) - 1].nameOfPlan;
                    const userRef = FirebaseDB.firestore()
                      .collection("users")
                      .doc(userID);
                    plansArrayRef.update({
                      selected: currentID,
                    });

                    userRef
                      .get()
                      .then((document) => {
                        const val = document.data();
                        const arr = val.SelectedPlansInfo;
                        let doIChange = true;

                        for (let i = 0; i < arr.length; i++) {
                          if (arr[i].Semester === props.headerTitle) {
                            if (
                              arr[i].useInCap ||
                              arr[i].nameOfPlan === currentPlanName
                            ) {
                              doIChange = false;
                            }
                            break;
                          }
                        }
                        if (doIChange) {
                          let tempArr = [];
                          for (let i = 0; i < arr.length; i++) {
                            if (arr[i].Semester === props.headerTitle) {
                              tempArr.push({
                                Cap: currentArr[parseInt(currentID) - 1].Cap,
                                McUsedInCap:
                                  currentArr[parseInt(currentID) - 1]
                                    .MCsCountedToCap,
                                Semester: props.headerTitle,
                                nameOfPlan: currentPlanName,
                                useInCap: false,
                              });
                            } else {
                              tempArr.push(arr[i]);
                            }
                          }
                          userRef.update({
                            SelectedPlansInfo: tempArr,
                          });
                        }
                      })
                      .catch((error) => {});
                  } else {
                    plansArrayRef.update({
                      selected: "-1",
                    });
                  }
                  const currentPlanName =
                    currentArr[parseInt(currentID) - 1].nameOfPlan;
                  const plansItselfRef = FirebaseDB.firestore()
                    .collection("plansItself")
                    .doc(
                      userID.concat(
                        "_",
                        props.headerTitle,
                        "_",
                        currentPlanName
                      )
                    );
                  const val = plansItselfRef
                    .get()
                    .then((document) => {
                      const info = document.data();
                      if (info !== undefined) {
                        const moduleInformations = info.planInfo;
                        const thisPlanName = info.nameOfPlan;
                        const amIfavourite = info.amIfavourite;
                        navigation.navigate("ViewPlan", {
                          item: [
                            thisPlanName,
                            docLoc,
                            size,
                            fromWhere,
                            moduleInformations,
                            amIfavourite,
                          ],
                        });
                      }
                    })
                    .catch((error) => {});
                }
              }}
            >
              <Text style={{ ...globalFontStyles.OSB_17, color: "white" }}>
                Enter
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.btmRightPart}
            activeOpacity={0.9}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Icon name="plus-circle" width={60} height={60} fill={"#FB5581"} />
          </TouchableOpacity>
        </View>
      </View>
      {PopOutBox()}
      {SuccessFulDeletion()}
    </View>
  );
};

export default Plans;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  boxStyle: {
    width: 0.9 * width,
    height: 0.22 * height,
    backgroundColor: "white",
    alignSelf: "center",
    margin: 15,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  boxDesign: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "center",
    alignItems: "flex-end",
    right: 0.07 * width,
    top: 0.015 * height,
  },
  btmPart: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "white",
  },
  btmMidPart: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    bottom: 10,
  },
  btmRightPart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    right: 0.03 * width,
    bottom: 10,
  },
  modalBox: {
    backgroundColor: "white",
    width: 0.7 * width,
    height: 0.17 * height,
    borderRadius: 30,
  },
  modalBox2: {
    backgroundColor: "#F4FFFC",
    width: 0.7 * width,
    height: 0.2 * height,
    borderRadius: 20,
  },
  popouttext: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  popoutheader: {
    ...globalFontStyles.OSB_13,
    color: "#232323",
  },
  modalHeaderQuestion: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    top: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#f2f2f2",
    height: 0.04 * height,
    width: 200,
  },
  flexOneShadowOne: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  flexOneCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  OSSBL20ColorBlack: {
    ...globalFontStyles.OSSB_14,
    left: 20,
  },
  enterButton: {
    height: 65,
    backgroundColor: "#FB5581",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    width: 220,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  header: {
    height: 0.11 * height,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 2,
  },
  textIntputContainerStyle: {
    width: 0.4 * width,
    height: 0.04 * height,
    borderWidth: 1,
    borderColor: "#D0CECE",
    bottom: 5,
  },
  textInputStyle: {
    width: 0.4 * width,
    height: 0.04 * height,
    left: 5,
  },
  alertTextStyle: {
    ...globalFontStyles.OSR_12,
    bottom: 4,
    color: "#cc0000",
  },
  holdingCancelAndConfirm: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: "#D0CECE",
    flexDirection: "row",
  },
  dustBinStyle: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  tempDustBinHolder: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    bottom: 10,
  },
  overallContainer: {
    flex: 1,
    minHeight: hp("100%"),
    backgroundColor: "#f9f9f9",
  },
  arrowContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  textContainer: {
    flex: 3,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  textStyling: {
    ...globalFontStyles.NB_20,
    color: "#3E3E3E",
    bottom: 15,
  },
  deletionTextAlertStyle: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
