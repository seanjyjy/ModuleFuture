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
import { useIsFocused } from "@react-navigation/native";
import Header from "../../../../Component/Header";
import Icons from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import { Icon } from "react-native-eva-icons";
import { globalFontStyles } from "../../../../Component/GlobalFont";
import Modal from "react-native-modalbox";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import FirebaseDB from "../../../../FirebaseDB";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ImageSet = [
  require("../../../../assets/plan1.png"),
  require("../../../../assets/plan2.png"),
  require("../../../../assets/plan3.png"),
  require("../../../../assets/plan4.png"),
];

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
                  ? `Semestral Cap: ${SemestralCap === 0 ? "-" : SemestralCap}`
                  : `Planned Cap: ${PlannedCap === 0 ? "-" : PlannedCap}`}
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
                  ? `Overall Cap: ${OverallCap === 0 ? "-" : OverallCap}`
                  : `Planned Overall Cap: ${
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
                {/* {`Last Updated: ${LastUpdated}`} */}
                {LastUpdated}
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
  const [size, setSize] = useState(props.data[1].length);
  const [showDustBin, setShowDustBin] = useState(true);
  const [alertText, setAlertText] = useState(false);
  const [alertText1, setAlertText1] = useState(false);
  const [arrForRect, setArrForRect] = useState(info[3]);
  const [selectedplansinfo, setselectedplansinfo] = useState(info[4]);

  const fb = FirebaseDB.firestore();
  const [Types, setTypes] = useState({});
  const [Codes, setCodes] = useState({});
  const [Levels, setLevels] = useState({});
  const [records, setRecords] = useState({});
  const [taken, setTaken] = useState({});

  const typeRef = fb.collection("typeArray").doc(userID);
  const codeRef = fb.collection("codeArray").doc(userID);
  const levelRef = fb.collection("levelArray").doc(userID);
  const recordsRef = fb.collection("records").doc(userID);
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
            setselectedplansinfo(val.SelectedPlansInfo);
            setShowDustBin(true);
          } else {
            //addition occurs
            setArrForRect(props.data[3]);
            setSelected(new Map().set(selected, true));
            setCurrentArr(props.data[1]);
            setCurrentID(props.data[2]);
            setShowDustBin(true);
            setselectedplansinfo(props.data[4]);
          }
          setSize(arr.length);
          if (val.selected === "-1") {
            setShowDustBin(false);
          } else {
            setShowDustBin(true);
          }
          if (arr.length === 0) {
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
      (error) => alert(error)
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

  // const calcTime = (dateInStr) => {
  //   let today = new Date();
  //   const utc = today.getTime() + today.getTimezoneOffset() * 60000;
  //   let offset = 8;
  //   let nd = new Date(utc + 3600000 * offset);
  //   let date = nd.toLocaleString("en-SG", {
  //     timeZone: "Asia/Singapore",
  //     hour12: true,
  //   });
  //   const todayDateArray = dateExtractor(date);
  //   const previousDateArray = dateExtractor(dateInStr);
  //   if (todayDateArray[0] == previousDateArray[0]) {
  //     return previousDateArray[1];
  //   } else if () {

  //   } else {
  //     return previousDateArray[0];
  //   }
  // };
  // const dateExtractor = (str) => {
  //   let tempStr = "";
  //   let timeStr = "";
  //   let tempStart = true;
  //   let timeStart = false;
  //   for (let i = 0; i < str.length; i++) {
  //     if (str.charAt(i) === ",") {
  //       tempStart = false;
  //     }
  //     if (tempStart) {
  //       tempStr += str.charAt(i);
  //     }
  //     if (timeStart) {
  //       timeStr += str.charAt(i);
  //     }
  //     if (str.charAt(i) === " ") {
  //       timeStart = true;
  //     }
  //   }
  //   return [tempStr, timeStr];
  // };

  // const isYesturday = (str1, str2) => {
  //   let oneDayBefore = false;
  //   let sameMonth = false;
  //   if (str1.length !== str2.length) {
  //     return false
  //   } else {

  //   }
  // }

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

                            usersModulesDetailsRef
                              .get()
                              .then((document) => {
                                console.log("Phase 0");
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
                                  if (arr1[k].Semester !== props.headerTitle) {
                                    nextArr.push(arr1[k]);
                                    const refPoint =
                                      arr1[k].ModulesDetailsArray;
                                    for (let j = 0; j < refPoint.length; j++) {
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
                                        (semSum / semTotalMcUsedInCap).toFixed(
                                          2
                                        )
                                      ),
                                      OverallCap: parseFloat(
                                        (totalSum / totalMcUsedInCap).toFixed(2)
                                      ),
                                      Semester: arr1[k].Semester,
                                      SemestralMc: semMc,
                                      OverallMc: totalMc,
                                      MCcountedToCap: semTotalMcUsedInCap,
                                      TotalMcUsedInCap: totalMcUsedInCap,
                                    });
                                  }
                                  semMc = 0;
                                  semSum = 0;
                                }

                                // Updating for records / focus area

                                const origTaken = records.taken;
                                const origNotTaken = records.notTaken;
                                const toInclude = new Set(records.mapping);
                                const newTaken = [];
                                console.log("Phase 1");
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

                                    if (toInclude.has(origTaken[i].type)) {
                                      origNotTaken.push({
                                        name: origTaken[i].name,
                                        type: origTaken[i].type,
                                        code: origTaken[i].code,
                                        level: origTaken[i].level,
                                        codePrefix: origTaken[i].codePrefix,
                                        numMcs: origTaken[i].numMcs,
                                      });
                                    }
                                    console.log("Phase 2");
                                    const indexType = Types[type];
                                    const indexCode = Codes[codePrefix];
                                    const indexLevel = Levels[level.toString()];
                                    if (grade !== "CU") {
                                      Types.cat[indexType].mcsTaken -= numMcs;
                                      Types.cat[indexType].numTaken -= 1;
                                      Codes.cat[indexCode].mcsTaken -= numMcs;
                                      Codes.cat[indexCode].numTaken -= 1;
                                      Levels.cat[indexLevel].mcsTaken -= numMcs;
                                      Levels.cat[indexLevel].numTaken -= 1;
                                    }
                                    if (bool) {
                                      Types.cat[
                                        indexType
                                      ].mcsUsedInCap -= numMcs;
                                      Codes.cat[
                                        indexCode
                                      ].mcsUsedInCap -= numMcs;
                                      Levels.cat[
                                        indexLevel
                                      ].mcsUsedInCap -= numMcs;

                                      Types.cat[
                                        indexType
                                      ].points -= modulePoints;
                                      Levels.cat[
                                        indexLevel
                                      ].points -= modulePoints;
                                      Codes.cat[
                                        indexCode
                                      ].points -= modulePoints;
                                    }
                                    delete taken[code];
                                  } else {
                                    newTaken.push(origTaken[i]);
                                  }
                                }
                                console.log("Phase 3");

                                let codeObj = Codes;
                                const newCodes = [];
                                for (
                                  let i = codeObj.fixed;
                                  i < codeObj.cat.length;
                                  i++
                                ) {
                                  if (codeObj.cat[i].mcsTaken !== 0) {
                                    newCodes.push({
                                      name: codeObj.cat[i].name,
                                      mcsTaken: codeObj.cat[i].mcsTaken,
                                      numTaken: codeObj.cat[i].numTaken,
                                      mcsUsedInCap: codeObj.cat[i].mcsUsedInCap,
                                      points: codeObj.cat[i].points,
                                    });
                                  } else {
                                    delete codeObj[codeObj.cat[i].name];
                                  }
                                }
                                console.log("Phase 4");
                                newCodes.sort((a, b) => {
                                  if (a.mcsTaken >= b.mcsTaken) {
                                    return -1;
                                  } else {
                                    return 1;
                                  }
                                });
                                // reassign keys and indexes
                                for (let i = 0; i < newCodes.length; i++) {
                                  newCodes[i].key = codeObj.fixed + i + 1;
                                  codeObj[newCodes[i].name] = codeObj.fixed + i;
                                }

                                codeObj.cat = codeObj.cat
                                  .slice(0, codeObj.fixed)
                                  .concat(newCodes);

                                origNotTaken.sort((a, b) => {
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

                                console.log("Phase 5");
                                typeRef.set(Types);
                                codeRef.set(codeObj);
                                levelRef.set(Levels);
                                takenModulesRef.set(taken);
                                recordsRef.update({
                                  notTaken: origNotTaken,
                                  taken: newTaken,
                                });

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
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                          },
                        },
                      ],
                      { cancelable: false }
                    );
                  }
                }
              })
              .catch((error) => alert(error));
          }
        }}
      >
        <Icon name="trash-2-outline" width={30} height={20} fill="#232323" />
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={{ flex: 1, minHeight: hp("100%") }}>
      <View style={styles.header}>
        <ImageBackground
          style={styles.header}
          source={require("../../../../assets/HeaderBG.png")}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "flex-start",
            }}
          >
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
          <View
            style={{
              flex: 3,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                ...globalFontStyles.NB_20,
                color: "#3E3E3E",
                bottom: 15,
              }}
            >
              {props.headerTitle}
            </Text>
          </View>

          {showDustBin ? dustBin : emptySpace}
        </ImageBackground>
      </View>
      <View style={{ flex: 6, backgroundColor: "#f9f9f9" }}>
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
      <View style={styles.btmPart}>
        <View style={{ flex: 1 }} />
        <View style={styles.btmMidPart}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.enterButton}
            onPress={() => {
              // come here later to solve the problem!

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

              if (currentArr.length === 0 || parseInt(currentID) - 1 < 0) {
                alert("Please select or create a plan");
              } else {
                const currentPlanName =
                  currentArr[parseInt(currentID) - 1].nameOfPlan;
                const plansItselfRef = FirebaseDB.firestore()
                  .collection("plansItself")
                  .doc(
                    userID.concat("_", props.headerTitle, "_", currentPlanName)
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
      {PopOutBox()}
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
});
