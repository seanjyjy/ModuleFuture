import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  Image,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { globalFontStyles } from "../../../../Component/GlobalFont";
import FontisoIcon from "react-native-vector-icons/Fontisto";
import { useSafeArea } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import FirebaseDB from "../../../../FirebaseDB";
import Tabs from "./Tabs";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

console.disableYellowBox = true;

const ViewPlan = ({ route }) => {
  const navigation = useNavigation();
  const usaBTM = useSafeArea().bottom;
  const heightToAdjust = usaBTM > 0 ? (usaBTM - 20) / 2 : 0;
  const [title, setTitle] = useState("");
  const [dataArray, setDataArray] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [docLoc, setDocLoc] = useState("");
  const [fromWhere, setFromWhere] = useState("");
  const [size, setSize] = useState("");
  const [favourite, setfavourite] = useState(false);
  const [semList, setSemList] = useState([]);
  const [userID, setUserID] = useState("");
  const [userRef, setUserRef] = useState("");
  const [usersDetails, setUsersDetails] = useState([]);
  const [arrToUse, setArrToUse] = useState([]);
  const [selectedplansinfo, setselectedplansinfo] = useState([]);
  const [gradSem, setGradSem] = useState("");
  const [currentSem, setCurrentSem] = useState("");
  useEffect(() => {
    if (route.params?.item) {
      setDocLoc(route.params?.item[1]);
      setDataArray(route.params?.item[4]);
      setSize(route.params?.item[2]);
      setFromWhere(route.params?.item[3]);
      setTitle(route.params?.item[0]);
      setfavourite(route.params?.item[5]);
      if (route.params?.item[1] && route.params?.item[3]) {
        setUserID(userIDextractor(route.params?.item[1]));
        setUserRef(
          FirebaseDB.firestore()
            .collection("users")
            .doc(userIDextractor(route.params?.item[1]))
        );
        const userRef = FirebaseDB.firestore()
          .collection("users")
          .doc(userIDextractor(route.params?.item[1]));
        userRef.onSnapshot((document) => {
          const val = document.data();
          setUsersDetails(val);
          const sem = val.expectedSemGrad;
          setGradSem(sem);
          let arrLength = 0;
          if (calculatorOfSem(sem) <= 5) {
            setSemList(semListY3S2);
            arrLength = 6;
          } else if (calculatorOfSem(sem) <= 7) {
            setSemList(semListY4S2);
            arrLength = 8;
          } else {
            setSemList(semListY5S2);
            arrLength = 10;
          }
          setselectedplansinfo(val.SelectedPlansInfo);
          setCurrentSem(findCurrentSem(val.yearOfMatri));
          const arrToUse = whatArrayOfInfoToDisplay(
            route.params?.item[3],
            arrLength
          );
          setArrToUse(arrToUse);
        });
      }
    }
  }, [route.params?.item]);

  const colorArray = [
    { top: "#fff2ab", btm: "#fff7d1", pin: "#EB0000" },
    { top: "#ffcce5", btm: "#ffe4f1", pin: "#EE82EE" },
    { top: "#cde9ff", btm: "#e2f1ff", pin: "#000080" },
    { top: "#e7cfff", btm: "#f2e6ff", pin: "#FF00FF" },
    { top: "#cbf1c4", btm: "#e4f9e0", pin: "brown" },
  ];

  const userIDextractor = (val) => {
    const len = val.length;
    const userID = val.substring(0, len - 5);
    return userID;
  };

  const totalSumTotalMc = (val, sem) => {
    let totalMCs = 0;
    let totalSum = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i].Semester === sem) {
        break;
      }
      totalMCs += val[i].McUsedInCap;
      totalSum += val[i].McUsedInCap * val[i].Cap;
    }
    return [totalSum, totalMCs];
  };

  const findCurrentSem = (yearOfMatri) => {
    let today = new Date();
    let getMonth = today.getMonth() + 1;
    let getYear = today.getFullYear();
    let numYear = getYear - yearOfMatri;
    let textToReturn = "";
    if (getMonth < 8) {
      //before august
      textToReturn += "Y" + numYear + "S2";
    } else {
      //during and after august consider start of sem as of 1st aug
      textToReturn += "Y" + (numYear + 1) + "S1";
    }
    return textToReturn;
  };

  const infoExtractor = async (
    docLoc,
    whatSem,
    SumMcArr,
    selectedplansinfo
  ) => {
    const docLocCurr = userIDextractor(docLoc).concat("_", whatSem);
    const plansArrayRef = FirebaseDB.firestore()
      .collection("plansArray")
      .doc(docLocCurr);

    let arrToPass = [];
    arrToPass[0] = userIDextractor(docLoc);
    arrToPass[4] = selectedplansinfo;
    await plansArrayRef
      .get()
      .then((document) => {
        const val = document.data();
        if (val !== undefined && SumMcArr !== undefined) {
          const arr = val.yearSem;
          const arrLength = arr.length;
          arrToPass[1] = arr;
          arrToPass[2] = arrLength.toString();
          let tempArr = [];
          for (let i = 0; i < arr.length; i++) {
            const newTotalMcs = SumMcArr[1] + arr[i].MCs;
            const newTotalSum = SumMcArr[0] + arr[i].MCs * arr[i].Cap;
            tempArr.push({
              SemestralCap: arr[i].useInCap ? arr[i].Cap : 0,
              OverallCap:
                newTotalMcs !== 0
                  ? parseFloat((newTotalSum / newTotalMcs).toFixed(2))
                  : 0,
              PlannedOverallCap:
                newTotalMcs !== 0
                  ? parseFloat((newTotalSum / newTotalMcs).toFixed(2))
                  : 0,
              PlannedCap: arr[i].useInCap ? 0 : arr[i].Cap,
              MCs: arr[i].MCs,
              LastUpdated: arr[i].LastUpdated,
              useInCap: arr[i].useInCap,
            });
          }
          arrToPass[3] = tempArr;
        } else {
          plansArrayRef.set({ yearSem: [], selected: "-1", ArrForRect: [] });
          arrToPass[1] = [];
          arrToPass[2] = "1";
          arrToPass[3] = [];
        }
      })
      .then((error) => {});
    return arrToPass;
  };

  const whatArrayOfInfoToDisplay = (val, arrLength) => {
    const num = calculatorOfSem(val);
    if (num === 0) {
      // represents the first year
      return [1, 2, 3];
    } else if (arrLength - 2 === num) {
      // represents the 2nd last year
      return [num + 1, num - 1, num - 2];
    } else if (arrLength - 1 === num) {
      // represents the last year
      return [num - 1, num - 2, num - 3];
    } else {
      return [num - 1, num + 1, num + 2];
    }
  };

  const semListY3S2 = ["Y1S1", "Y1S2", "Y2S1", "Y2S2", "Y3S1", "Y3S2"];
  const semListY4S2 = [...semListY3S2, "Y4S1", "Y4S2"];
  const semListY5S2 = [...semListY4S2, "Y5S1", "Y5S2"];
  const signOutUser = async () => {
    try {
      await FirebaseDB.auth().signOut();
    } catch (error) {}
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

  const HomeButton = (
    <Tabs
      icon={<MaterialIcon name="home-outline" size={28} color="#726F6F" />}
      text="Home"
      viewDesign={{ borderTopWidth: 1, borderColor: "#E2E2E2" }}
      iconStyle={{ right: 3 }}
      func={() => {
        setModalVisible(false);
        setTimeout(
          () => navigation.navigate("Content Page", { item: [] }),
          400
        );
      }}
    />
  );

  const SignOut = (
    <Tabs
      icon={<MaterialIcon size={25} name="logout" color="#726F6F" />}
      text="SignOut"
      viewDesign={{
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#E2E2E2",
      }}
      func={() => {
        setModalVisible(false);
        setTimeout(() => signOutUser(), 400);
      }}
    />
  );

  const SmartRecall = (dest) => (
    <Tabs
      icon={<MaterialIcon size={24} name="book-outline" color="#726F6F" />}
      text={dest}
      iconStyle={{ right: 3 }}
      wordStyle={{
        borderColor: "#E2E2E2",
        borderBottomWidth: 1,
      }}
      func={async () => {
        const arrToPass = await infoExtractor(
          docLoc,
          fromWhere,
          totalSumTotalMc(selectedplansinfo, fromWhere),
          selectedplansinfo
        );
        setModalVisible(false);
        setTimeout(
          () =>
            navigation.navigate(fromWhere, {
              item: arrToPass,
            }),
          400
        );
      }}
    />
  );

  const ProgressButton = (
    <Tabs
      icon={<EntypoIcon name="bar-graph" color="#726F6F" size={22} />}
      text="Progress"
      iconStyle={{ right: 3 }}
      wordStyle={{
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: "#E2E2E2",
      }}
      func={() => {
        setModalVisible(false);

        setTimeout(
          () =>
            navigation.navigate("ProgressPage", {
              usersDetails: usersDetails,
              from: "ViewPlan",
              userID: userID,
              gradSem: gradSem,
            }),
          400
        );
      }}
    />
  );

  const SmartRecall2 = (
    <Tabs
      icon={<MaterialIcon size={24} name="book-outline" color="#726F6F" />}
      text={semListY5S2[arrToUse[0]]}
      iconStyle={{ right: 3 }}
      wordStyle={{
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: "#E2E2E2",
      }}
      func={async () => {
        const arrToPass = await infoExtractor(
          docLoc,
          semListY5S2[arrToUse[0]],
          totalSumTotalMc(selectedplansinfo, semListY5S2[arrToUse[0]]),
          selectedplansinfo
        );
        setModalVisible(false);
        setTimeout(
          () =>
            navigation.navigate(semListY5S2[arrToUse[0]], {
              item: arrToPass,
            }),
          400
        );
      }}
    />
  );
  const SmartRecall3 = (
    <Tabs
      wordStyle={{
        borderBottomWidth: 1,
        borderColor: "#E2E2E2",
      }}
      icon={<MaterialIcon size={24} name="book-outline" color="#726F6F" />}
      text={semListY5S2[arrToUse[1]]}
      iconStyle={{ right: 3 }}
      func={async () => {
        const arrToPass = await infoExtractor(
          docLoc,
          semListY5S2[arrToUse[1]],
          totalSumTotalMc(selectedplansinfo, semListY5S2[arrToUse[1]]),
          selectedplansinfo
        );
        setModalVisible(false);
        setTimeout(
          () =>
            navigation.navigate(semListY5S2[arrToUse[1]], {
              item: arrToPass,
            }),
          400
        );
      }}
    />
  );

  const SmartRecall4 = (
    <Tabs
      icon={<MaterialIcon size={24} name="book-outline" color="#726F6F" />}
      text={semListY5S2[arrToUse[2]]}
      iconStyle={{ right: 3 }}
      viewDesign={{
        borderBottomWidth: 1,
        borderColor: "#E2E2E2",
      }}
      func={async () => {
        const arrToPass = await infoExtractor(
          docLoc,
          semListY5S2[arrToUse[2]],
          totalSumTotalMc(selectedplansinfo, semListY5S2[arrToUse[2]]),
          selectedplansinfo
        );
        setModalVisible(false);
        setTimeout(
          () =>
            navigation.navigate(semListY5S2[arrToUse[2]], {
              item: arrToPass,
            }),

          400
        );
      }}
    />
  );

  const customDrawer = () => {
    return (
      <Modal
        animationInTiming={250}
        animationOutTiming={400}
        isVisible={modalVisible}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        deviceHeight={height}
        deviceWidth={width}
        backdropOpacity={0.3}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.customDrawerContainer}>
          <View style={{ flex: 7 }}>
            {/* "Profile information portion" */}
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1 }} />
              <View style={styles.centerThree}>
                <Image
                  source={require("../../../../assets/ModuleFutureLogo1.png")}
                  style={{
                    ...styles.imageStylingForDrawer,
                    left: 0.02 * width,
                  }}
                />
              </View>
              <View style={styles.oneCenter}>
                <Text
                  style={{ ...globalFontStyles.NB_14, left: 0.015 * width }}
                >
                  {`Current Acad Sem: ${currentSem}`}
                </Text>
              </View>
            </View>
            {/* contains all the tabs */}
            <View style={{ flex: 3 }}>
              <View style={{ flex: 2 }}>
                {/* can be used to include more tabs here------- (2 more) if want more 
                then increase this flex and decrease the flex below*/}
                <View style={{ flex: 3 }}>
                  {HomeButton}
                  {ProgressButton}
                  {SmartRecall(fromWhere)}
                </View>
                <Text style={styles.alsoSee}>Also see</Text>
                <View style={{ flex: 3, top: 0.02 * height }}>
                  {SmartRecall2}
                  {SmartRecall3}
                  {SmartRecall4}
                </View>
                {/* ------------------------------------------ */}
              </View>
              <View style={{ flex: 1 }} />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            {SignOut}
            <View style={{ flex: 1 }} />
          </View>
        </View>
      </Modal>
    );
  };
  const loadData = async () => {
    userRef.get().then((document) => {
      const val = document.data();
      const favPlanInfo = val.favPlanInfo;
      if (favPlanInfo.length > 0) {
        const plansItselfRef2 = FirebaseDB.firestore()
          .collection("plansItself")
          .doc(favPlanInfo[1].concat("_", favPlanInfo[0]));
        plansItselfRef2.update({
          amIfavourite: false,
        });
      }
    });

    const plansItselfRef = FirebaseDB.firestore()
      .collection("plansItself")
      .doc(docLoc.concat("_", title));
    plansItselfRef.update({
      amIfavourite: true,
    });

    userRef.set(
      {
        favPlanInfo: [title, docLoc, size, fromWhere],
        favPlanArray: dataArray,
      },
      { merge: true }
    );
  };
  const unLoadData = async () => {
    const plansItselfRef = FirebaseDB.firestore()
      .collection("plansItself")
      .doc(docLoc.concat("_", title));
    plansItselfRef.update({
      amIfavourite: false,
    }),
      { merge: true };
    userRef.set(
      {
        favPlanInfo: [],
        favPlanArray: [],
      },
      { merge: true }
    );
  };
  const emptyHeart = (
    <FontisoIcon
      size={25}
      name="favorite"
      style={{ left: 0.02 * width, opacity: 0.3 }}
      color="#FFF8DC"
      onPress={() => {
        setfavourite(true);
        loadData();
      }}
    />
  );
  const filledheart = (
    <FontisoIcon
      size={25}
      name="favorite"
      style={{ left: 0.02 * width }}
      color="#FFF8DC"
      onPress={() => {
        setfavourite(false);
        unLoadData();
      }}
    />
  );
  const Header = () => {
    return (
      <>
        <View style={styles.headerDesign}>
          <View
            style={{
              ...styles.hundredCenter,
              flex: 1,
            }}
          >
            <FeatherIcon
              size={27}
              name="list"
              color="#232323"
              style={{ bottom: 7, right: 0.04 * width }}
              onPress={() => {
                setModalVisible(true);
                // activate the rest
              }}
            />
          </View>
          <View style={{ ...styles.hundredCenter, flex: 2 }}>
            <Text style={styles.headerText}>{title}</Text>
          </View>
          <View style={{ ...styles.hundredCenter, flex: 1 }}>
            <Text
              onPress={() => {
                navigation.navigate("AddPlan", {
                  item: [title, docLoc, size, fromWhere, dataArray],
                  from: "ViewPlan",
                });
              }}
              style={styles.editStyling}
            >
              Edit
            </Text>
          </View>
        </View>
        {customDrawer()}
      </>
    );
  };

  const StickyPad = (moduleCode, TargetGrade, FinalGrade, NumMcs, key) => {
    return (
      <View
        style={{
          ...styles.stickPadContainer,
          backgroundColor: colorArray[key % 5].btm,
        }}
      >
        <View
          style={{
            ...styles.oneCenter,
            backgroundColor: colorArray[key % 5].top,
          }}
        >
          <EntypoIcon
            name="pin"
            size={20}
            color={colorArray[key % 5].pin}
            style={{ left: 10, bottom: 5 }}
          />
        </View>
        <View style={{ flex: 5, flexDirection: "column" }}>
          <View
            style={{
              ...styles.twoStart,
              backgroundColor: colorArray[key % 5].btm,
            }}
          >
            <Text
              style={styles.left15NB154a4e5d}
            >{`Module: ${moduleCode}`}</Text>
          </View>
          <View
            style={{
              ...styles.twoStart,
              backgroundColor: colorArray[key % 5].btm,
            }}
          >
            <Text
              style={{ left: 15, ...globalFontStyles.NB_15, color: "#4a4e5d" }}
            >{`Target grade: ${TargetGrade}`}</Text>
          </View>
          {FinalGrade === "" ? (
            <></>
          ) : (
            <View
              style={{
                ...styles.twoStart,
                backgroundColor: colorArray[key % 5].btm,
              }}
            >
              <Text
                style={styles.left15NB154a4e5d}
              >{`Final grade: ${FinalGrade}`}</Text>
            </View>
          )}
          <View
            style={{
              ...styles.twoStart,
              backgroundColor: colorArray[key % 5].btm,
            }}
          >
            <Text
              style={{ left: 15, ...globalFontStyles.NB_15, color: "#4a4e5d" }}
            >{`MCs: ${NumMcs}`}</Text>
          </View>
          <View
            style={{
              ...styles.oneCenter,
              backgroundColor: colorArray[key % 5].btm,
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      {Header()}
      <View
        style={{ ...styles.oneCenter, backgroundColor: "transparent", top: 5 }}
      >
        <View
          style={{
            ...styles.container,
            bottom: heightToAdjust,
            overflow: "hidden",
          }}
        >
          <View style={styles.headerAtPlan}>
            <View style={styles.oneCenter}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ ...globalFontStyles.NB_24, color: "#FFF8DC" }}>
                  My Plans
                </Text>
                {favourite ? filledheart : emptyHeart}
              </View>
            </View>
            <View style={styles.lineAtPlan} />
          </View>

          <View style={{ flex: 12, flexDirection: "row" }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
              numColumns={2}
              data={dataArray}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) =>
                StickyPad(
                  item.moduleCode,
                  item.TargetGrade,
                  item.FinalGrade,
                  item.NumMcs,
                  parseInt(item.key)
                )
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ViewPlan;

const styles = StyleSheet.create({
  container: {
    height: 0.86 * height,
    width: 0.95 * width,
    borderRadius: 20,
    backgroundColor: "#DEB887",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  oneCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hundredCenter: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  headerText: {
    bottom: 10,
    ...globalFontStyles.NB_20,
    color: "#232323",
  },
  headerDesign: {
    height: 0.11 * height,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    shadowColor: "#333333",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderBottomWidth: 1,
    borderColor: "#DDDDDD",
  },
  lineAtPlan: {
    width: 0.85 * width,
    height: 0.002 * height,
    borderRadius: 60,
    backgroundColor: "#FFF8DC",
  },
  headerAtPlan: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  stickPadContainer: {
    width: width * 0.435,
    height: 0.2 * height,
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginVertical: 10,
    marginHorizontal: 0.02 * width,
  },
  twoStart: {
    flex: 2,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  drawer: {
    height: height,
  },
  avatar: {
    margin: 8,
  },
  centerThree: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  alsoSee: {
    ...globalFontStyles.NB_15,
    left: 0.11 * width,
    top: 0.01 * height,
  },
  editStyling: {
    bottom: 12,
    ...globalFontStyles.NB_14,
    color: "#007AFF",
    left: 15,
  },
  customDrawerContainer: {
    width: 0.6 * width,
    height: height,
    backgroundColor: "white",
    right: 0.1 * width,
  },
  left15NB154a4e5d: {
    left: 15,
    ...globalFontStyles.NB_15,
    color: "#4a4e5d",
  },
  imageStylingForDrawer: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    top: 20,
  },
});
