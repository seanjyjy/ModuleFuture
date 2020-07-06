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
  const deleteItem = (modName) => {
    setData((newData) => {
      return newData.filter((todo) => todo.moduleName !== modName);
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
          title: receivedArr[i].title,
          TargetGrade: "",
          NumMcs: receivedArr[i].MC,
          FinalGrade: "",
        });
        keyTobe++;
      }
      setData(tempArr);
    }
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
    let truth = true;
    for (let i = 0; i < val.length; i++) {
      if (val[i].FinalGrade === "") {
        truth = false;
        break;
      }
    }
    return truth;
  };

  const TargetGradesFilled = (val) => {
    let truth = true;
    for (let i = 0; i < val.length; i++) {
      if (val[i].TargetGrade === "") {
        truth = false;
        break;
      }
    }
    return truth;
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

  const nextPage = () => {
    if (FinalGradesEntered(data)) {
      let semCap = 0;
      const usersModulesDetailsRef = FirebaseDB.firestore()
        .collection("usersModulesDetails")
        .doc(userIDextractor(docLoc));
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
          for (let i = 0; i < data.length; i++) {
            modulesDetailsArray.push({
              moduleCode: data[i].moduleCode,
              moduleName: data[i].title,
              FinalGrade: data[i].FinalGrade,
              NumMcs: data[i].NumMcs,
            });
            semSum += data[i].NumMcs * GradeToPoint(data[i].FinalGrade);
            if (data[i].FinalGrade !== "S") {
              semMc += data[i].NumMcs;
            }
          }
          semCap = parseFloat((semSum / semMc).toFixed(2));
          let totalSum = 0;
          let totalMc = 0;
          let pushed = false;
          let tempArr = [];
          const usersRef = FirebaseDB.firestore()
            .collection("users")
            .doc(userIDextractor(docLoc));
          let thisSemSum = 0;
          let thisSemMC = 0;
          if (val !== undefined) {
            let arr = val.usersModulesArray;
            arr = insertionSort(arr);
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].Semester === fromWhere) {
                pushed = true;
                totalSum += semSum;
                totalMc += semMc;
                thisSemMC += semMc;
                thisSemSum += semSum;
              } else {
                for (let j = 0; j < arr[i].ModulesDetailsArray.length; j++) {
                  const mc = arr[i].ModulesDetailsArray[j].NumMcs;
                  const points = GradeToPoint(
                    arr[i].ModulesDetailsArray[j].FinalGrade
                  );
                  thisSemMC += mc;
                  thisSemSum += mc * points;
                  totalSum += mc * points;
                  totalMc += mc;
                }
              }
              tempArr.push({
                SemestralCap: parseFloat((thisSemSum / thisSemMC).toFixed(2)),
                OverallCap: parseFloat((totalSum / totalMc).toFixed(2)),
                Semester: arr[i].Semester,
                SemestralMc: semMc,
                OverallMc: totalMc,
              });
              thisSemMC = 0;
              thisSemSum = 0;
            }
            if (!pushed) {
              totalSum += semSum;
              totalMc += semMc;
              tempArr.push({
                SemestralCap: semCap,
                OverallCap: parseFloat((totalSum / totalMc).toFixed(2)),
                Semester: fromWhere,
                SemestralMc: semMc,
                OverallMc: totalMc,
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
                    SemestralCap: semCap,
                    OverallCap: parseFloat((semSum / semMc).toFixed(2)),
                    Semester: fromWhere,
                    SemestralMc: semMc,
                    OverallMc: semMc,
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
    }

    const plansArrayRef = FirebaseDB.firestore()
      .collection("plansArray")
      .doc(docLoc);
    plansArrayRef.update({
      yearSem: FirebaseDB.firestore.FieldValue.arrayUnion({
        key: (size + 1).toString(),
        nameOfPlan: planNameValue,
      }),
    });

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
            alert("Please choose some modules into your plans");
          } else if (!TargetGradesFilled(data)) {
            alert("Please fill in your target grades to advance");
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
                    nextPage();
                  },
                },
              ],
              { cancelable: false }
            );
          } else {
            nextPage();
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
      <AnimatedBottomBar translateY={translateY}></AnimatedBottomBar>
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
