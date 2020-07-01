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
