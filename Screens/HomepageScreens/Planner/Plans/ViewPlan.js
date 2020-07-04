import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Animated,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import EntypoIcon from "react-native-vector-icons/Entypo";
import AntIcon from "react-native-vector-icons/AntDesign";
import { Avatar } from "@ui-kitten/components";
import { globalFontStyles } from "../../../../Component/GlobalFont";
import FontisoIcon from "react-native-vector-icons/Fontisto";
import { useSafeArea } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/FontAwesome";
import Modal from "react-native-modal";
import FirebaseDB from "../../../../FirebaseDB";
import Tabs from "./Tabs";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

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
  const [arr1, setarr1] = useState([]);
  const [arr2, setarr2] = useState([]);
  const [arr3, setarr3] = useState([]);
  const [arr4, setarr4] = useState([]);
  const [userID, setUserID] = useState("");
  const [userRef, setUserRef] = useState("");
  const [semList, setSemList] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [arrToUse, setArrToUse] = useState([]);
  useEffect(() => {
    if (route.params?.item) {
      setDocLoc(route.params?.item[1]);
      setDataArray(route.params?.item[4]);
      setSize(route.params?.item[2]);
      setFromWhere(route.params?.item[3]);
      setTitle(route.params?.item[0]);
      //whatsTheCurrentSem(docLoc);
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
        userRef
          .get()
          .then((document) => {
            const val = document.data();
            setUserDetails(val);
            const sem = val.expectedSemGrad;
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
            const arrToUse = whatArrayOfInfoToDisplay(
              route.params?.item[3],
              arrLength
            );
            setArrToUse(arrToUse);
            infoExtractor(
              route.params?.item[1],
              semList[calculatorOfSem(route.params?.item[3]) % 9],
              (val) => setarr1(val)
            );
            infoExtractor(
              route.params?.item[1],
              semListY5S2[arrToUse[0]],
              (val) => setarr2(val)
            );
            infoExtractor(
              route.params?.item[1],
              semListY5S2[arrToUse[1]],
              (val) => setarr3(val)
            );
            infoExtractor(
              route.params?.item[1],
              semListY5S2[arrToUse[2]],
              (val) => setarr4(val)
            );
          })
          .catch((error) => alert(error));
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

  const infoExtractor = (docLoc, whatSem, func) => {
    const docLocCurr = userIDextractor(docLoc).concat("_", whatSem);
    const plansArrayRef = FirebaseDB.firestore()
      .collection("plansArray")
      .doc(docLocCurr);
    plansArrayRef
      .get()
      .then((document) => {
        const val = document.data();
        if (val !== undefined) {
          const arr = val.yearSem;
          func(arr);
        } else {
          plansArrayRef.set({ yearSem: [] });
          func([]);
        }
      })
      .then((error) => {});
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
  // need to get current year and approximate time? in order to calculate current semester
  // const whatsTheCurrentSem = (val) => {
  //   const userID = userIDextractor(val);
  //   const userRef = FirebaseDB.firestore().collection("users").doc(userID);
  //   userRef
  //     .get((document) => {
  //       const val = document.data();
  //       const year = val.yearOfMatri;
  //     })
  //     .then((error) => alert(error));
  // };

  const semListY3S2 = ["Y1S1", "Y1S2", "Y2S1", "Y2S2", "Y3S1", "Y3S2"];
  const semListY4S2 = [...semListY3S2, "Y4S1", "Y4S2"];
  const semListY5S2 = [...semListY4S2, "Y5S1", "Y5S2"];
  const signOutUser = async () => {
    try {
      await FirebaseDB.auth().signOut();
    } catch (error) {
      alert(error);
    }
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
        setTimeout(() => navigation.navigate("Content Page"), 400);
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
      func={() => {
        setModalVisible(false);
        setTimeout(
          () =>
            navigation.navigate(fromWhere, {
              item: [userIDextractor(docLoc), arr1],
            }),
          400
        );
      }}
    />
  );
  const ProgressButon = (
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
              usersDetails: userDetails,
              from: "ViewPlan",
              userID: userID,
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
      func={() => {
        setModalVisible(false);
        setTimeout(
          () =>
            navigation.navigate(semListY5S2[arrToUse[0]], {
              item: [userIDextractor(docLoc), arr2],
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
      func={() => {
        setModalVisible(false);
        setTimeout(
          () =>
            navigation.navigate(semListY5S2[arrToUse[1]], {
              item: [userIDextractor(docLoc), arr3],
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
      func={() => {
        setModalVisible(false);
        setTimeout(
          () =>
            navigation.navigate(semListY5S2[arrToUse[2]], {
              item: [userIDextractor(docLoc), arr4],
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
        <View
          style={{
            width: 0.6 * width,
            height: height,
            backgroundColor: "white",
            right: 0.1 * width,
          }}
        >
          <View style={{ flex: 7 }}>
            {/* "Profile information portion" */}
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1 }} />
              <View
                style={{
                  flex: 2,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar
                  style={styles.avatar}
                  size="giant"
                  source={require("../../../../assets/JumpingMan.png")}
                />
              </View>
              <View style={styles.oneCenter}>
                <Text
                  style={{ ...globalFontStyles.NB_14, right: 0.045 * width }}
                >
                  Current Sem:
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
                  {ProgressButon}
                  {SmartRecall(fromWhere)}
                </View>
                <Text
                  style={{
                    ...globalFontStyles.NB_15,
                    left: 0.11 * width,
                    top: 0.01 * height,
                  }}
                >
                  Also see
                </Text>
                <View
                  style={{
                    flex: 3,
                    top: 0.02 * height,
                  }}
                >
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
    userRef.set(
      {
        favPlanInfo: [title, docLoc, size, fromWhere],
        favPlanArray: dataArray,
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
              style={{
                bottom: 12,
                ...globalFontStyles.NB_14,
                color: "#007AFF",
              }}
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
              style={{
                left: 15,
                ...globalFontStyles.NB_15,
                color: "#4a4e5d",
              }}
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
                style={{
                  left: 15,
                  ...globalFontStyles.NB_15,
                  color: "#4a4e5d",
                }}
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
      <View style={{ ...styles.oneCenter, backgroundColor: "transparent" }}>
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
    width: width,
    height: 0.11 * height,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.3,
    backgroundColor: "#f9f9f9",
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
});
