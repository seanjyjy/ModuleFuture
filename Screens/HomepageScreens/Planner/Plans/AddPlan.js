import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  FlatList,
  ImageBackground,
  Alert,
  ToastAndroid,
} from "react-native";
import { globalFontStyles } from "../../../../Component/GlobalFont";
import AnimatedBottomBar from "./AnimatedBottomBar";
import ModuleTemplate from "./ModuleTemplate";
import { useNavigation } from "@react-navigation/native";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FirebaseDB from "../../../../FirebaseDB";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const AddPlan = ({ route }) => {
  const [planNameValue, setPlanName] = useState("Plan 1");
  const [size, setSize] = useState(0);
  const [docLoc, setDocLoc] = useState("");
  const [data, setData] = useState([]);
  const [fromWhere, setFromWhere] = useState("");
  const [block, setBlock] = useState("true");
  const [moduleMapping, setModuleMapping] = useState({});
  const [Types, setTypes] = useState({});
  const [Codes, setCodes] = useState({});
  const [Levels, setLevels] = useState({});
  const [records, setRecords] = useState({});

  const fb = FirebaseDB.firestore();
  const userID = FirebaseDB.auth().currentUser.uid;
  const typeRef = fb.collection("typeArray").doc(userID);
  const codeRef = fb.collection("codeArray").doc(userID);
  const levelRef = fb.collection("levelArray").doc(userID);
  const recordsRef = fb.collection("records").doc(userID);
  const moduleMappingRef = fb.collection("modulesMapping").doc(userID);

  const deleteItem = (moduleCode) => {
    setData((newData) => {
      return newData.filter((todo) => todo.moduleCode !== moduleCode);
    });
  };

  useEffect(() => {
    if (route.params?.item && route.params?.from !== "AddModule") {
      setPlanName(route.params?.item[0]);
      setSize(route.params?.item[2]);
      setDocLoc(route.params?.item[1]);
      setFromWhere(route.params?.item[3]);
      if (route.params?.item[4]) setData(route.params?.item[4]);
    }
    if (route.params?.modDetails && route.params?.from === "AddModule") {
      const tempArr = [];
      for (let i = 0; i < data.length; i++) {
        tempArr.push(data[i]);
      }
      let keyTobe = data.length;
      const receivedArr = route.params?.modDetails;
      for (let i = 0; i < receivedArr.length; i++) {
        tempArr.push({
          key: keyTobe.toString(),
          clash: false,
          moduleCode: receivedArr[i].code,
          name: receivedArr[i].name,
          codePrefix: receivedArr[i].codePrefix,
          Level: receivedArr[i].Level,
          suOption: receivedArr[i].suOption,
          NumMcs: receivedArr[i].MC,
          TargetGrade: "",
          FinalGrade: "",
        });
        keyTobe++;
      }
      setData(tempArr);
    }
    moduleMappingRef.onSnapshot((document) => {
      setModuleMapping(document.data());
    });
    recordsRef.onSnapshot((document) => {
      setRecords(document.data());
    });
    typeRef.onSnapshot((document) => {
      setTypes(document.data());
    });
    codeRef.onSnapshot((document) => {
      setCodes(document.data());
    });
    levelRef.onSnapshot((document) => {
      setLevels(document.data());
    });
  }, [route.params.item[4], route.params?.modDetails, route.params?.from]);

  const navigation = useNavigation();
  const userIDextractor = (val) => {
    const len = val.length;
    const userID = docLoc.substring(0, len - 5);
    return userID;
  };
  const checkMcs = (arr) => {
    let num = 0;
    for (let i = 0; i < arr.length; i++) {
      num += parseInt(arr[i].NumMcs);
    }
    return num < 18;
  };

  const FinalGradesEntered = (val) => {
    for (let i = 0; i < val.length; i++) {
      if (val[i].FinalGrade === "") {
        return false;
      }
    }
    return true;
  };

  const haveAPastHistory = async (docLoc) => {
    const plansArrayRef = FirebaseDB.firestore()
      .collection("plansArray")
      .doc(docLoc);
    let isThereAPast = false;
    let name = "";
    await plansArrayRef
      .get()
      .then((document) => {
        const val = document.data();
        const arr = val.yearSem;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].useInCap && arr[i].nameOfPlan !== planNameValue) {
            name = arr[i].nameOfPlan;
            isThereAPast = true;
            break;
          }
        }
      })
      .catch((error) => {});
    return [isThereAPast, name, yearExtractor(docLoc)];
  };

  const TargetGradesFilled = (val) => {
    for (let i = 0; i < val.length; i++) {
      if (val[i].TargetGrade === "") {
        return false;
      }
    }
    return true;
  };

  const yearExtractor = (val) => {
    const len = val.length;
    return val.substring(len - 4);
  };

  const searchSem = (val) => {
    if (val === "Y1S2") {
      return "Y1S1";
    } else if (val === "Y2S1") {
      return "Y1S2";
    } else if (val === "Y2S2") {
      return "Y2S1";
    } else if (val === "Y3S1") {
      return "Y2S2";
    } else if (val === "Y3S2") {
      return "Y3S1";
    } else if (val === "Y4S1") {
      return "Y3S2";
    } else if (val === "Y4S2") {
      return "Y4S1";
    } else if (val === "Y5S1") {
      return "Y4S2";
    } else {
      return "Y5S1";
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
  const calculatorOfSem = (val) => {
    if (val === "Y1S1") {
      return 0;
    } else if (val === "Y1S2") {
      return 1;
    } else if (val === "Y2S1") {
      return 2;
    } else if (val === "Y2S2") {
      return 3;
    } else if (val === "Y3S1") {
      return 4;
    } else if (val === "Y3S2") {
      return 5;
    } else if (val === "Y4S1") {
      return 6;
    } else if (val === "Y4S2") {
      return 7;
    } else if (val === "Y5S1") {
      return 8;
    } else {
      return 9;
    }
  };

  const insertionSort = (arr) => {
    for (let i = 1; i < arr.length; i++) {
      let j = i - 1;
      let tmp = arr[i];
      let tmpValue = calculatorOfSem(tmp.Semester);
      while (j >= 0 && calculatorOfSem(arr[j].Semester) > tmpValue) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = tmp;
    }
    return arr;
  };

  const lettersChecker = (val) => {
    if (val !== "S" && val !== "CS" && val !== "CU") {
      return true;
    } else {
      return false;
    }
  };
  const isThisExtraAlert = (name, year) => {
    // You have entered the final grades for this semester before. Inputting final grades in this plan
    //will overwrite the final grades in the ${other plan}. Proceed?
    Alert.alert(
      "Warning",
      "You have entered the Final Grades for this semester before, are you sure you want to overwrite it?" +
        "\n" +
        ` You can choose to delete or edit ${name}'s final grade in semester ${year}`,
      [
        { text: "Cancel", onPress: () => {} },
        { text: "Continue", onPress: () => nextPage() },
      ],
      { cancelable: false }
    );
  };
  const firstChecks = async () => {
    const temp = await haveAPastHistory(docLoc);
    if (temp[0] && FinalGradesEntered(data)) {
      isThisExtraAlert(temp[1], temp[2]);
    } else {
      nextPage();
    }
  };
  const nextPage = () => {
    if (FinalGradesEntered(data)) {
      let semCap = 0;

      const origTaken = records.taken;
      const origNotTaken = records.notTaken;
      const toInclude = new Set(records.mapping);
      const newTaken = [];
      const newNotTaken = [];

      const newSet = new Set();
      data.forEach((x) => newSet.add(x.moduleCode));

      // Remove from taken
      for (let i = 0; i < origTaken.length; i++) {
        if (origTaken[i].sem === fromWhere) {
          const numMcs = origTaken[i].numMcs;
          const codePrefix = origTaken[i].codePrefix;
          const type = origTaken[i].type;
          const level = origTaken[i].level;
          const code = origTaken[i].code;
          const grade = origTaken[i].grade;
          const modulePoints = numMcs * GradeToPoint(grade);
          const bool = lettersChecker(grade);

          // Deleted from original plan
          if (!newSet.has(code)) {
            if (toInclude.has(type)) {
              newNotTaken.push({
                name: origTaken[i].name,
                type: type,
                code: code,
                level: level,
                codePrefix: codePrefix,
                numMcs: numMcs,
              });
            }
          }
          // Adjusting CAP and num taken
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
            Types.cat[indexType].mcsUsedInCap -= numMcs;
            Codes.cat[indexCode].mcsUsedInCap -= numMcs;
            Levels.cat[indexLevel].mcsUsedInCap -= numMcs;

            Types.cat[indexType].points -= modulePoints;
            Levels.cat[indexLevel].points -= modulePoints;
            Codes.cat[indexCode].points -= modulePoints;
          }
        } else {
          newTaken.push(origTaken[i]);
        }
      }
      // Remove from not taken
      for (let i = 0; i < origNotTaken.length; i++) {
        if (!newSet.has(origNotTaken[i].code)) {
          newNotTaken.push(origNotTaken[i]);
        }
      }

      // -----------------UPDATING USERS MODULES DETAILS HERE && USERS CAP ARRAY -------------------------------------------------
      const usersModulesDetailsRef = FirebaseDB.firestore()
        .collection("usersModulesDetails")
        .doc(userID);
      usersModulesDetailsRef
        .get()
        .then((document) => {
          const val = document.data();
          if (val === undefined) {
            usersModulesDetailsRef.set({ usersModulesArray: [] });
          }
          const modulesDetailsArray = [];
          let semSum = 0;
          let semMc = 0;
          let semTotalMc = 0;
          let typeObj = Types;
          let codeObj = Codes;
          let levelObj = Levels;
          for (let i = 0; i < data.length; i++) {
            const moduleCode = data[i].moduleCode;
            const moduleName = data[i].name;
            const FinalGrade = data[i].FinalGrade;
            const NumMcs = data[i].NumMcs;
            const Level = data[i].Level;
            const codePrefix = data[i].codePrefix;
            const modulePoints = NumMcs * GradeToPoint(FinalGrade);
            const bool = lettersChecker(FinalGrade);

            // Check if moduleType exists
            const moduleType = "";
            // Finding type
            if (moduleMapping[moduleCode] !== undefined) {
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
              const len = typeObj.cat.length;
              // TODO: Add in Residential Colleges for ULR!
              if (
                codePrefix.length === 3 &&
                codePrefix.substring(0, 2) === "GE" &&
                typeObj.cat[len - 1].mcsTaken < typeObj.cat[len - 1].mcsRequired
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
                taken: [],
                notTaken: [],
              });
            }

            // Check if it is a new level
            if (levelObj[Level.toString()] === undefined) {
              levelObj[Level.toString()] = levelObj.cat.length;
              levelObj.cat.push({
                name: Level.toString() + "s",
                context: Level,
                key: levelObj.cat.length + 1,
                mcsTaken: 0,
                numTaken: 0,
                mcsUsedInCap: 0,
                points: 0,
                taken: [],
                notTaken: [],
              });
            }
            const indexType = typeObj[moduleType];
            const indexCode = codeObj[codePrefix];
            const indexLevel = levelObj[Level.toString()];

            if (FinalGrade !== "CU") {
              typeObj.cat[indexType].mcsTaken += NumMcs;
              typeObj.cat[indexType].numTaken += 1;
              codeObj.cat[indexCode].mcsTaken += NumMcs;
              codeObj.cat[indexCode].numTaken += 1;
              levelObj.cat[indexLevel].mcsTaken += NumMcs;
              levelObj.cat[indexLevel].numTaken += 1;
            }
            if (bool) {
              typeObj.cat[indexType].mcsUsedInCap += NumMcs;
              codeObj.cat[indexCode].mcsUsedInCap += NumMcs;
              levelObj.cat[indexLevel].mcsUsedInCap += NumMcs;

              typeObj.cat[indexType].points += modulePoints;
              codeObj.cat[indexCode].points += modulePoints;
              levelObj.cat[indexLevel].points += modulePoints;
            }
            newTaken.push({
              name: moduleName,
              code: moduleCode,
              type: moduleType,
              grade: FinalGrade,
              level: Level,
              codePrefix: codePrefix,
              taken: true,
              numMcs: NumMcs,
              sem: fromWhere,
            });

            modulesDetailsArray.push({
              moduleCode: moduleCode,
              moduleName: moduleName,
              FinalGrade: FinalGrade,
              NumMcs: NumMcs,
              Level: Level,
              codePrefix: codePrefix,
              // type: moduleType,
            });
            semSum += modulePoints;
            if (bool) {
              semMc += NumMcs;
            }
            if (FinalGrade !== "CU") {
              semTotalMc += NumMcs;
            }
          }
          // End of for loop for data array
          // Remove any codes / levels if needed??
          // Sort codes array according to mcs Taken (done)
          const newCodes = [];
          for (let i = codeObj.fixed; i < codeObj.cat.length; i++) {
            if (codeObj.cat[i].mcsTaken !== 0) {
              newCodes.push({
                name: codeObj.cat[i].name,
                mcsTaken: codeObj.cat[i].mcsTaken,
                numTaken: codeObj.cat[i].numTaken,
                mcsUsedInCap: codeObj.cat[i].mcsUsedInCap,
                points: codeObj.cat[i].points,
                taken: [],
                notTaken: [],
              });
            } else {
              delete codeObj[codeObj.cat[i].name];
              needSorting = true;
            }
          }
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

          codeObj.cat = codeObj.cat.slice(0, codeObj.fixed).concat(newCodes);

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

          const batch = fb.batch();
          batch.set(typeRef, typeObj);
          batch.set(codeRef, codeObj);
          batch.set(levelRef, levelObj);
          batch.update(recordsRef, {
            notTaken: newNotTaken,
            taken: newTaken,
          });

          batch.commit();

          semCap = parseFloat((semSum / semMc).toFixed(2));
          let totalSum = 0; // total CAP SUM
          let totalMc = 0; // total MC
          let totalMcUsedInCap = 0; // MC that are used in overall calculation
          let pushed = false;
          let tempArr = [];
          const usersRef = FirebaseDB.firestore()
            .collection("users")
            .doc(userID);

          let thisSemSum = 0;
          let thisSemMc = 0;
          let thisSemMcUsedInCap = 0;
          if (val !== undefined) {
            let arr = val.usersModulesArray;
            let DontexistBeforeInOldArray = true;
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].Semester === fromWhere) {
                DontexistBeforeInOldArray = false;
                break;
              }
            }
            if (DontexistBeforeInOldArray) {
              arr.push({ Semester: fromWhere });
            }
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].Semester === fromWhere) {
                pushed = true;
                totalSum += semSum;
                thisSemSum += semSum;

                totalMc += semTotalMc;
                thisSemMc += semTotalMc;

                totalMcUsedInCap += semMc;
                thisSemMcUsedInCap += semMc;
              } else {
                for (let j = 0; j < arr[i].ModulesDetailsArray.length; j++) {
                  const mc = arr[i].ModulesDetailsArray[j].NumMcs;
                  const points = GradeToPoint(
                    arr[i].ModulesDetailsArray[j].FinalGrade
                  );
                  if (
                    lettersChecker(arr[i].ModulesDetailsArray[j].FinalGrade)
                  ) {
                    thisSemSum += mc * points;
                    totalSum += mc * points;
                    totalMcUsedInCap += mc;
                    thisSemMcUsedInCap += mc;
                  }
                  if (arr[i].ModulesDetailsArray[j].FinalGrade !== "CU") {
                    thisSemMc += mc;
                    totalMc += mc;
                  }
                }
              }
              tempArr.push({
                Semester: arr[i].Semester,

                SemestralCap: parseFloat(
                  (thisSemSum / thisSemMcUsedInCap).toFixed(2)
                ),
                OverallCap:
                  totalMcUsedInCap !== 0
                    ? parseFloat((totalSum / totalMcUsedInCap).toFixed(2))
                    : 0,

                SemestralMc: thisSemMc,
                OverallMc: totalMc,
                TotalMcUsedInCap: totalMcUsedInCap,
                MCcountedToCap: thisSemMcUsedInCap,
              });
              // RESET THE IMPORTANT VALUES
              thisSemMc = 0;
              thisSemSum = 0;
              thisSemMcUsedInCap = 0;
            }
            if (!pushed) {
              totalSum += semSum;
              totalMc += semTotalMc;
              totalMcUsedInCap += semMc;
              tempArr.push({
                Semester: fromWhere,

                SemestralCap: semCap,
                OverallCap:
                  totalMcUsedInCap !== 0
                    ? parseFloat((totalSum / totalMcUsedInCap).toFixed(2))
                    : 0,

                SemestralMc: semTotalMc, // semester total MC
                OverallMc: totalMc, // overall total MC
                TotalMcUsedInCap: totalMcUsedInCap, //mc that is counted in overall
                MCcountedToCap: semMc, // mc that is counted in cap
              });
            }
            usersRef.update({
              CapArray: tempArr,
            });
          } else {
            usersRef.set(
              {
                CapArray: [
                  {
                    Semester: fromWhere,

                    SemestralCap: semCap,
                    OverallCap:
                      semMC !== 0 ? parseFloat((semSum / semMc).toFixed(2)) : 0,

                    SemestralMc: semTotalMc,
                    OverallMc: semTotalMc,
                    OverallMcCountedToCap: semMc,
                    MCcountedToCap: semMc,
                  },
                ],
              },
              { merge: true }
            );
          }

          if (val !== undefined) {
            const tempArr2 = [];
            let pushed = false;
            for (let i = 0; i < val.usersModulesArray.length; i++) {
              if (val.usersModulesArray[i].Semester !== fromWhere) {
                tempArr2.push(val.usersModulesArray[i]);
              } else {
                tempArr2.push({
                  Semester: fromWhere,
                  ModulesDetailsArray: modulesDetailsArray,
                });
                pushed = true;
              }
            }
            if (!pushed) {
              tempArr2.push({
                Semester: fromWhere,
                ModulesDetailsArray: modulesDetailsArray,
              });
            }
            usersModulesDetailsRef.set({
              usersModulesArray: tempArr2,
            });
          } else {
            usersModulesDetailsRef.set({
              usersModulesArray: [
                {
                  Semester: fromWhere,
                  ModulesDetailsArray: modulesDetailsArray,
                },
              ],
            });
          }
        })
        .catch((error) => {});
      // -----------------UPDATING PLANS ARRAY WITH FINAL GRADE-------------------------------------------------

      let thisPlanSum1 = 0;
      let thisPlanMc1 = 0;
      let thisPlanMcUsedInCap1 = 0;

      let Plannedcap = 0; // the users planned cap for the semester
      let longdpcap = 0;
      for (let i = 0; i < data.length; i++) {
        thisPlanSum1 += data[i].NumMcs * GradeToPoint(data[i].FinalGrade);
        if (lettersChecker(data[i].FinalGrade)) {
          thisPlanMcUsedInCap1 += data[i].NumMcs;
        }
        if (data[i].FinalGrade !== "CU") {
          thisPlanMc1 += data[i].NumMcs;
        }
      }
      const plansArrayRef = FirebaseDB.firestore()
        .collection("plansArray")
        .doc(docLoc);

      Plannedcap =
        thisPlanMcUsedInCap1 !== 0
          ? parseFloat((thisPlanSum1 / thisPlanMcUsedInCap1).toFixed(2))
          : 0;
      longdpcap =
        thisPlanMcUsedInCap1 !== 0 ? thisPlanSum1 / thisPlanMcUsedInCap1 : 0;
      const userRef = FirebaseDB.firestore()
        .collection("users")
        .doc(userIDextractor(docLoc));

      userRef.get().then((document) => {
        const val = document.data();
        let arr = val.SelectedPlansInfo;
        let dontExistBefore = true;
        let pushed = false;
        let tempArr = [];
        const newObjToPush = {
          Semester: yearExtractor(docLoc),
          Cap: Plannedcap,
          McUsedInCap: thisPlanMcUsedInCap1,
          useInCap: true,
          nameOfPlan: planNameValue,
        };
        if (arr.length > 0) {
          const toCompareYear = yearExtractor(docLoc);
          for (let i = 0; i < arr.length; i++) {
            if (toCompareYear === arr[i].Semester) {
              dontExistBefore = false;
              break;
            }
          }

          if (dontExistBefore) {
            arr.push(newObjToPush);
          }
          arr = insertionSort(arr);

          for (let i = 0; i < arr.length; i++) {
            if (toCompareYear === arr[i].Semester) {
              pushed = true;
              tempArr.push(newObjToPush);
            } else {
              tempArr.push(arr[i]);
            }
          }
          if (!pushed) {
            tempArr.push(newObjToPush);
          }
          userRef.update({ SelectedPlansInfo: tempArr });
        } else {
          userRef.update({ SelectedPlansInfo: [newObjToPush] });
        }
      });

      plansArrayRef
        .get()
        .then((document) => {
          const val = document.data();
          const arr = val.yearSem;
          const thisPlanLength = arr.length;
          const arr2 = val.ArrForRect;
          if (arr.length > 0) {
            let pushed = false;
            const newPlansArr = [];
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].nameOfPlan === planNameValue) {
                newPlansArr.push({
                  key: (i + 1).toString(),
                  nameOfPlan: planNameValue,
                  useInCap: true,
                  Cap: Plannedcap,
                  MCs: thisPlanMc1,
                  MCsCountedToCap: thisPlanMcUsedInCap1,
                  LastUpdated: 0,
                  LONGDPCAP: longdpcap,
                });
                pushed = true;
              } else {
                newPlansArr.push(arr[i]);
              }
            }
            if (!pushed) {
              newPlansArr.push({
                key: (arr.length + 1).toString(),
                nameOfPlan: planNameValue,
                useInCap: true,
                Cap: Plannedcap,
                MCs: thisPlanMc1,
                MCsCountedToCap: thisPlanMcUsedInCap1,
                LastUpdated: 0,
                LONGDPCAP: longdpcap,
              });
            }
            plansArrayRef.set({
              yearSem: newPlansArr,
              selected: (thisPlanLength + 1).toString(),
              ArrForRect: arr2,
            });
          } else {
            plansArrayRef.set({
              yearSem: [
                {
                  key: "1",
                  nameOfPlan: planNameValue,
                  useInCap: true,
                  Cap: Plannedcap,
                  MCs: thisPlanMc1,
                  MCsCountedToCap: thisPlanMcUsedInCap1,
                  LastUpdated: 0,
                  LONGDPCAP: longdpcap,
                },
              ],
              selected: "1",
              ArrForRect: arr2,
            });
          }
        })
        .catch((error) => {});
    } else {
      // -----------------UPDATING PLANS ARRAY when no FINAL GRADE -------------------------------------------------

      let thisPlanSum = 0;
      let thisPlanMc = 0;
      let thisPlanMcUsedInCap = 0;

      let Plannedcap = 0;
      let longdpcap = 0;
      for (let i = 0; i < data.length; i++) {
        thisPlanSum += data[i].NumMcs * GradeToPoint(data[i].TargetGrade);
        if (lettersChecker(data[i].TargetGrade)) {
          thisPlanMcUsedInCap += data[i].NumMcs;
        }
        if (data[i].TargetGrade !== "CU") {
          thisPlanMc += data[i].NumMcs;
        }
      }

      Plannedcap =
        thisPlanMcUsedInCap !== 0
          ? parseFloat((thisPlanSum / thisPlanMcUsedInCap).toFixed(2))
          : 0;
      longdpcap =
        thisPlanMcUsedInCao !== 0 ? thisPlanSum / thisPlanMcUsedInCap : 0;
      const userRef = FirebaseDB.firestore()
        .collection("users")
        .doc(userIDextractor(docLoc));

      userRef.get().then((document) => {
        const val = document.data();
        let arr = val.SelectedPlansInfo;
        let dontExistBefore = true;
        let doIchangeCurrentArr = false;
        let pushed = false;
        let tempArr = [];
        const newObjToPush = {
          Semester: yearExtractor(docLoc),
          Cap: Plannedcap,
          McUsedInCap: thisPlanMcUsedInCap,
          useInCap: false,
          nameOfPlan: planNameValue,
        };
        if (arr.length > 0) {
          const toCompareYear = yearExtractor(docLoc);
          for (let i = 0; i < arr.length; i++) {
            if (toCompareYear === arr[i].Semester) {
              dontExistBefore = false;
              if (!arr[i].useInCap) {
                doIchangeCurrentArr = true;
              }
              break;
            }
          }

          if (dontExistBefore) {
            arr.push(newObjToPush);
          }
          arr = insertionSort(arr);

          for (let i = 0; i < arr.length; i++) {
            if (toCompareYear === arr[i].Semester) {
              if (doIchangeCurrentArr) {
                tempArr.push(newObjToPush);
              } else {
                tempArr.push(arr[i]);
              }
              pushed = true;
            } else {
              tempArr.push(arr[i]);
            }
          }
          if (!pushed) {
            tempArr.push(newObjToPush);
          }
          userRef.update({ SelectedPlansInfo: tempArr });
        } else {
          userRef.update({ SelectedPlansInfo: [newObjToPush] });
        }
      });

      const plansArrayRef = FirebaseDB.firestore()
        .collection("plansArray")
        .doc(docLoc);

      plansArrayRef
        .get()
        .then((document) => {
          const val = document.data();
          const arr = val.yearSem;
          const arr2 = val.ArrForRect;
          const thisPlanLength = arr.length;
          if (arr.length > 0) {
            let pushed = false;
            const newPlansArr = [];
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].nameOfPlan === planNameValue) {
                newPlansArr.push({
                  key: (i + 1).toString(),
                  nameOfPlan: planNameValue,
                  useInCap: false,
                  Cap: Plannedcap,
                  MCs: thisPlanMc,
                  MCsCountedToCap: thisPlanMcUsedInCap,
                  LastUpdated: 0,
                  LONGDPCAP: longdpcap,
                });
                pushed = true;
              } else {
                newPlansArr.push(arr[i]);
              }
            }
            if (!pushed) {
              newPlansArr.push({
                key: (arr.length + 1).toString(),
                nameOfPlan: planNameValue,
                useInCap: false,
                Cap: Plannedcap,
                MCs: thisPlanMc,
                MCsCountedToCap: thisPlanMcUsedInCap,
                LastUpdated: 0,
                LONGDPCAP: longdpcap,
              });
            }
            plansArrayRef.set({
              yearSem: newPlansArr,
              selected: (thisPlanLength + 1).toString(),
              ArrForRect: arr2,
            });
          } else {
            plansArrayRef.set({
              yearSem: [
                {
                  key: "1",
                  nameOfPlan: planNameValue,
                  useInCap: false,
                  Cap: Plannedcap,
                  MCs: thisPlanMc,
                  MCsCountedToCap: thisPlanMcUsedInCap,
                  LastUpdated: 0,
                  LONGDPCAP: longdpcap,
                },
              ],
              selected: "1",
              ArrForRect: arr2,
            });
          }
        })
        .catch((error) => {});
    }
    // -----------------UPDATING PLANSitself array-------------------------------------------------
    const plansItself = FirebaseDB.firestore()
      .collection("plansItself")
      .doc(docLoc.concat("_", planNameValue));
    plansItself.set({
      nameOfPlan: planNameValue,
      planInfo: data,
      fromWhere: fromWhere,
      amIfavourite: false,
    });

    // ----------------figure out how to reset the data!--------------------------------------------------------------------------------
    const newArr = data.map((x) => x);
    setData([]);
    return navigation.navigate("ViewPlan", {
      item: [planNameValue, docLoc, size, fromWhere, newArr, false],
    });
  };

  const Header = () => (
    <View style={styles.headerDesign}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.flexOneCenterFlexEnd}
        activeOpacity={0.9}
      >
        <Text
          style={{ bottom: 10, ...globalFontStyles.NB_14, color: "#232323" }}
        >
          Cancel
        </Text>
      </TouchableOpacity>
      <View style={{ ...styles.flexThreeCenterFlexEnd }}>
        <Text
          style={{ bottom: 10, ...globalFontStyles.NB_20, color: "#232323" }}
        >
          {planNameValue}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          if (data.length === 0) {
            Alert.alert(
              "Notice",
              "You haven't added any modules into your plan",
              [{ text: "Cancel", onPress: () => {} }],
              { cancelable: false }
            );
            // alert("Please add some modules into your plans");
            // } else if (!TargetGradesFilled(data)) {
            //   alert("Please fill in your target grades to advance");
          } else if (checkMcs(data) && block) {
            Alert.alert(
              "Warning",
              "You need a minimum of 18 MCs per semester! \n If you're sure, press Continue to advance",
              [
                { text: "Cancel", onPress: () => {} },
                {
                  text: "Continue",
                  onPress: () => {
                    setBlock("false");
                    //nextPage();
                    firstChecks();
                  },
                },
              ],
              { cancelable: false }
            );
          } else {
            firstChecks();
            //nextPage();
          }
        }}
        style={styles.flexOneCenterFlexEnd}
        activeOpacity={0.9}
      >
        <Text
          style={{ bottom: 10, ...globalFontStyles.NB_14, color: "#007AFF" }}
        >
          Done
        </Text>
      </TouchableOpacity>
    </View>
  );

  let transition = new Animated.Value(0);
  let translateY = transition.interpolate({
    inputRange: [0, 1],
    outputRange: [-60, 300],
    extrapolate: "clamp",
  });

  return (
    <>
      {Header()}
      <View style={styles.container}>
        <FlatList
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          data={data}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <ModuleTemplate dataObj={item} deleteMethod={deleteItem} />
          )}
          onScroll={(event) => {
            transition.setValue(event.nativeEvent.contentOffset.y);
          }}
        />
      </View>
      <AnimatedBottomBar
        translateY={translateY}
        dataArray={data}
      ></AnimatedBottomBar>
    </>
  );
};

export default AddPlan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  headerDesign: {
    height: 0.11 * height,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderBottomWidth: 1,
    borderColor: "#DDDDDD",
  },
  flexOneCenterFlexEnd: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  flexThreeCenterFlexEnd: {
    flex: 3,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
