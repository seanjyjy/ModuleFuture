import React, { useState, useEffect } from "react";
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
import { useNavigation } from "@react-navigation/native";
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
import { Menu } from "../../../Data/CardList";
import FirebaseDB from "../../../FirebaseDB";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ContentPage = (props) => {
  const navigation = useNavigation();
  const [cardArray, setCardArray] = useState([]);
  const [arrToPass, setArrToPass] = useState([]);
  const userInfo = FirebaseDB.firestore().collection("users");
  const userID = FirebaseDB.auth().currentUser.uid;
  useEffect(() => {
    userInfo
      .doc(userID)
      .get()
      .then((document) => {
        const val = document.data().expectedSemGrad;
        var tempArr = [];
        for (var i = 0; i <= num(val); i++) {
          tempArr.push(Menu[i]);
        }
        tempArr.push(Menu[10]);
        setCardArray(tempArr);
      })
      .catch((error) => alert(error));
  }, [userID]);
  //   const plansArrayRef = FirebaseDB.firestore()
  //   .collection("plansArray")
  //   .doc(userID.concat("_", item.PageName));
  // plansArrayRef
  //   .get()
  //   .then((document) => {
  //     const val = document.data();
  //     if (val !== undefined) {
  //       const arr = val.yearSem;
  //       setArrToPass(arr);
  //       //navigation.navigate(item.PageName, { item: [userID, arr] });
  //     } else {
  //       plansArrayRef.set({ yearSem: [] });
  //       setArrToPass([]);
  //       //navigation.navigate(item.PageName, { item: [userID, []] });
  //     }
  //   })
  //   .catch((error) => alert(error));
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

  const y = new Animated.Value(0);
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
              flex: 5,
              justifyContent: "flex-end",
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{
                ...globalFontStyles.NB_34,
                color: "#FB5581",
                left: 30,
                bottom: 5,
              }}
            >
              Planner
            </Text>
          </View>

          <View
            style={{
              flex: 2,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ProgressPage");
              }}
              style={{ width: 50, height: 50 }}
            >
              <Entypo
                name="bar-graph"
                //color="#918989"
                color="#A5A0A0"
                size={30}
                style={{ left: 25, top: 8 }}
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
          // or no bgColor
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
                    //setArrToPass(arr);
                    navigation.navigate(item.PageName, { item: [userID, arr] });
                  } else {
                    plansArrayRef.set({ yearSem: [] });
                    //setArrToPass([]);
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
