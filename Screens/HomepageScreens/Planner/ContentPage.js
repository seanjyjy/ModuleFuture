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
} from "react-native";
import { globalFontStyles } from "../../../Component/GlobalFont";
import Entypo from "react-native-vector-icons/Entypo";
import CardWallet from "../../../Component/CardWallet";
import FontisoIcon from "react-native-vector-icons/Fontisto";
import { Menu } from "../../../Data/CardList";
import FirebaseDB from "../../../FirebaseDB";
import { set } from "react-native-reanimated";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const ContentPage = (props) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const userInfo = FirebaseDB.firestore().collection("users");
  const userID = FirebaseDB.auth().currentUser.uid;
  const [userDetails, setUserDetails] = useState([]);
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

  const theArray = (val) => {
    const arr = [];
    for (let i = 0; i <= num(val); i++) {
      arr.push(Menu[i]);
    }
    arr.push(Menu[10]);
    return arr;
  };

  const [cardArray, setCardArray] = useState(
    theArray(props.extraData.expectedSemGrad)
  );

  const [y, setY] = useState(new Animated.Value(0));
  useEffect(() => {
    const unsub = userInfo.doc(userID).onSnapshot((document) => {
      const val = document.data().expectedSemGrad;
      setUserDetails(document.data());
      let tempArr = [];
      for (let i = 0; i <= num(val); i++) {
        tempArr.push(Menu[i]);
      }
      tempArr.push(Menu[10]);
      setCardArray(tempArr);
    });
    return () => unsub();
  }, [isFocused]);

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
              style={{ right: 0.05 * width, bottom: 0.02 * height }}
              onPress={() => {
                if (
                  props.extraData.favPlanArray &&
                  props.extraData.favPlanInfo
                ) {
                  const title = props.extraData.favPlanInfo[0];
                  const docLoc = props.extraData.favPlanInfo[1];
                  const size = props.extraData.favPlanInfo[2];
                  const fromWhere = props.extraData.favPlanInfo[3];
                  const dataArray = props.extraData.favPlanArray;
                  navigation.navigate("ViewPlan", {
                    item: [title, docLoc, size, fromWhere, dataArray],
                  });
                } else {
                  alert("You have not selected a favourite plan yet!");
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
                  usersDetails: userDetails,
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
              const plansArrayRef = FirebaseDB.firestore()
                .collection("plansArray")
                .doc(userID.concat("_", item.PageName));
              plansArrayRef
                .get()
                .then((document) => {
                  const val = document.data();
                  if (val !== undefined) {
                    const arr = val.yearSem;
                    navigation.navigate(item.PageName, { item: [userID, arr] });
                  } else {
                    plansArrayRef.set({ yearSem: [] });
                    navigation.navigate(item.PageName, { item: [userID, []] });
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
