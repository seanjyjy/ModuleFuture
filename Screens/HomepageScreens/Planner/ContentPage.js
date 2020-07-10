import React, { useState, useEffect, useLayoutEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  ImageBackground,
  Alert,
} from "react-native";
import { globalFontStyles } from "../../../Component/GlobalFont";
import Entypo from "react-native-vector-icons/Entypo";
import CardWallet from "../../../Component/CardWallet";
import FontisoIcon from "react-native-vector-icons/Fontisto";
import { Menu } from "../../../Data/CardList";
import FirebaseDB from "../../../FirebaseDB";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const ContentPage = (props) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const userInfo = FirebaseDB.firestore().collection("users");
  const userID = FirebaseDB.auth().currentUser.uid;
  const [usersDetails, setUsersDetails] = useState([]);

  const [title, setTitle] = useState("");
  const [docLoc, setDocLoc] = useState("");
  const [size, setSize] = useState(0);
  const [fromWhere, setFromWhere] = useState("");
  const [dataArray, setDataArray] = useState([]);
  const [favPlanArray, setFavPlanArray] = useState([]);
  const [favPlanInfo, setFavPlanInfo] = useState([]);
  const [cardArray, setCardArray] = useState([]);
  const num = (val) => {
    return val === "Y3S1"
      ? 4
      : val === "Y3S2"
      ? 5
      : val === "Y4S1"
      ? 6
      : val === "Y4S2"
      ? 7
      : val === "Y5S1"
      ? 8
      : 9;
  };

  const [y, setY] = useState(new Animated.Value(0));

  useEffect(() => {
    //if (props.route?.params !== undefined) {
    const unsub = userInfo.doc(userID).onSnapshot((document) => {
      const data = document.data();
      const val = data.expectedSemGrad;
      setUsersDetails(data);
      if (data.favPlanArray.length > 0 && data.favPlanInfo.length > 0) {
        setFavPlanArray(data.favPlanArray);
        setFavPlanInfo(data.favPlanInfo);
        setTitle(data.favPlanInfo[0]);
        setDocLoc(data.favPlanInfo[1]);
        setSize(data.favPlanInfo[2]);
        setFromWhere(data.favPlanInfo[3]);
        setDataArray(data.favPlanArray);
      } else {
        setFavPlanArray([]);
        setFavPlanInfo([]);
      }
      let tempArr = [];
      for (let i = 0; i <= num(val); i++) {
        tempArr.push(Menu[i]);
      }
      tempArr.push(Menu[10]);
      setCardArray(tempArr);
    });
    return () => unsub();
    // } else {
    //   if (
    //     props.extraData.favPlanArray.length > 0 &&
    //     props.extraData.favPlanInfo.length > 0
    //   ) {
    //     setFavPlanArray(props.extraData.favPlanArray);
    //     setFavPlanInfo(props.extraData.favPlanInfo);
    //     setTitle(props.extraData.favPlanInfo[0]);
    //     setDocLoc(props.extraData.favPlanInfo[1]);
    //     setSize(props.extraData.favPlanInfo[2]);
    //     setFromWhere(props.extraData.favPlanInfo[3]);
    //     setDataArray(props.extraData.favPlanArray);
    //   }
    //   setUsersDetails(props.extraData);
    //   setCardArray(theArray(props.extraData.expectedSemGrad));
    // }
  }, []);

  const onScroll = Animated.event(
    [
      {
        nativeEvent: { contentOffset: { y } },
      },
    ],
    { useNativeDriver: true }
  );
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <ImageBackground
          style={styles.header}
          source={require("../../../assets/HeaderBG.png")}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <FontisoIcon
              name="favorite"
              size={22}
              color="#A5A0A0"
              style={{ right: 0.05 * width, bottom: 0.018 * height }}
              onPress={() => {
                if (favPlanArray.length > 0 && favPlanInfo.length > 0) {
                  navigation.navigate("ViewPlan", {
                    item: [title, docLoc, size, fromWhere, dataArray, true],
                  });
                } else {
                  Alert.alert(
                    "Oops",
                    "You have not selected a favourite plan yet!",
                    [{ text: "Cancel", onPress: () => {} }],
                    { cancelable: false }
                  );
                }
              }}
            />
          </View>
          <View
            style={{
              flex: 2,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                ...globalFontStyles.NB_28,
                color: "#FB5581",
                bottom: 5,
                left: 3,
              }}
            >
              Planner
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ProgressPage", {
                  usersDetails: usersDetails,
                  from: "ContentPage",
                  userID: userID,
                });
              }}
              style={{ width: 50, height: 50 }}
            >
              <Entypo
                name="bar-graph"
                color="#A5A0A0"
                size={25}
                style={{ left: 25, top: 0.015 * height }}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          height: 5,
          width: "100%",
          backgroundColor: "#f9f9f9",
        }}
      />

      <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
        <AnimatedFlatList
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          bounces={false}
          data={cardArray}
          keyExtractor={(item) => item.key.toString()}
          renderItem={({ item }) => {
            return CardWallet(y, item.key.toString(), item.card, () => {
              const arr = usersDetails.SelectedPlansInfo;
              let totalMCs = 0;
              let totalSum = 0;
              for (let i = 0; i < arr.length; i++) {
                if (arr[i].Semester === item.PageName) {
                  break;
                }
                totalMCs += arr[i].McUsedInCap;
                totalSum += arr[i].McUsedInCap * arr[i].Cap;
              }
              const plansArrayRef = FirebaseDB.firestore()
                .collection("plansArray")
                .doc(userID.concat("_", item.PageName));
              plansArrayRef
                .get()
                .then((document) => {
                  const val = document.data();
                  if (val !== undefined) {
                    const arr = val.yearSem;
                    const selected = val.selected;
                    let infoForNextPage = [];
                    for (let i = 0; i < arr.length; i++) {
                      const newTotalMcs = totalMCs + arr[i].MCs;
                      const newTotalSum = totalSum + arr[i].MCs * arr[i].Cap;
                      infoForNextPage.push({
                        SemestralCap: arr[i].useInCap ? arr[i].Cap : 0,
                        OverallCap: parseFloat(
                          (newTotalSum / newTotalMcs).toFixed(2)
                        ),
                        PlannedOverallCap: parseFloat(
                          (newTotalSum / newTotalMcs).toFixed(2)
                        ),
                        PlannedCap: arr[i].useInCap ? 0 : arr[i].Cap,
                        MCs: arr[i].MCs,
                        LastUpdated: arr[i].LastUpdated,
                        useInCap: arr[i].useInCap,
                      });
                    }
                    return navigation.navigate(item.PageName, {
                      item: [userID, arr, selected, infoForNextPage],
                    });
                  } else {
                    plansArrayRef.set({ yearSem: [], selected: "-1" });
                    return navigation.navigate(item.PageName, {
                      item: [userID, [], "-1", []],
                    });
                  }
                })
                .catch((error) => alert(error));
            });
          }}
          {...{ onScroll }}
        />
      </View>
    </View>
  );
};

export default ContentPage;

const styles = StyleSheet.create({
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
});
