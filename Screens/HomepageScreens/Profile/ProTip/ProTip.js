import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import Header from "../../../../Component/Header";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { globalFontStyles } from "../../../../Component/GlobalFont";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const ProTip = () => {
  const navigation = useNavigation();

  const tutorialArray = [
    {
      title: "How to use planner I?",
      miniDescription:
        "This tutorial will highlight the usage of this planner, for more advance stuff, please view the rest of the tutorials.",
      key: "1",
      titleColor: "white",
      textColor: "white",
      requiredLink: require("../../../../assets/TutorialPic1.png"),
      StackName: "PlannerLessonStack",
      bgColor: "#1DDEAA",
      arrowColor: "white",
    },
    {
      title: "How to use planner II?",
      miniDescription:
        "This tutorial will highlight some useful functionalities of the planner!",
      key: "2",
      titleColor: "white",
      textColor: "white",
      requiredLink: require("../../../../assets/TutorialPic2.png"),
      StackName: "WhatIfStack",
      bgColor: "#757CFE",
      arrowColor: "white",
    },
    {
      title: "How to track progress?",
      miniDescription:
        "This tutorial will highlight the usage of progress page!",
      key: "3",
      titleColor: "white",
      textColor: "white",
      requiredLink: require("../../../../assets/TutorialPic2.png"),
      StackName: "ProgressLessonStack",
      bgColor: "#FE75C1",
      arrowColor: "white",
    },
  ];

  const cardMaker = (
    title,
    miniDescription,
    titleColor,
    textColor,
    ImageToUse,
    StackName,
    bgColor,
    arrowColor
  ) => {
    return (
      <TouchableOpacity
        style={{ ...styles.cardContainer, backgroundColor: bgColor }}
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate(StackName);
        }}
      >
        <View style={{ height: "100%", width: "57%" }}>
          <View style={{ height: 0.035 * height }} />
          <View style={styles.headerPos}>
            <Text style={{ ...styles.titleStyling, color: titleColor }}>
              {title}
            </Text>
          </View>
          <View style={{ flex: 5, paddingHorizontal: 10, bottom: 10 }}>
            <Text style={{ ...styles.textStyling, color: textColor }}>
              {miniDescription}
            </Text>
          </View>
        </View>
        <View style={{ height: "100%", width: "43%" }}>
          <View
            style={{
              flex: 2,
              width: "95%",
              top: 0.02 * height,
            }}
          >
            <ImageBackground source={ImageToUse} style={styles.cardDesign} />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="md-arrow-round-forward"
              size={20}
              style={{
                color: arrowColor,
                right: 0.075 * width,
                top: 0.015 * height,
              }}
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <Header
        str="Tutorials"
        leftChildren={
          <Ionicons
            name="md-arrow-round-back"
            size={25}
            style={{ color: "#232323" }}
            onPress={() => navigation.goBack()}
          />
        }
        rightChildren={<View />}
      />
      <View style={{ height: 10, width: "100%" }} />
      <View style={{ flex: 1 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          data={tutorialArray}
          keyExtractor={(item) => item.key.toString()}
          renderItem={({ item }) =>
            cardMaker(
              item.title,
              item.miniDescription,
              item.titleColor,
              item.textColor,
              item.requiredLink,
              item.StackName,
              item.bgColor,
              item.arrowColor
            )
          }
        />
      </View>
    </>
  );
};

export default ProTip;

const styles = StyleSheet.create({
  cardDesign: {
    resizeMode: "cover",
    flex: 1,
    height: "100%",
    width: "100%",
    top: 0.01 * height,
  },
  titleStyling: {
    ...globalFontStyles.NB_19,
    left: 10,
    letterSpacing: -1,
  },
  textStyling: {
    ...globalFontStyles.NSB_15,
    paddingHorizontal: 5,
    letterSpacing: -1,
  },
  cardContainer: {
    margin: 10,
    width: 0.94 * width,
    height: 0.25 * height,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    flexDirection: "row",
    borderRadius: 10,
  },
  headerPos: {
    flex: 2,
    justifyContent: "center",
    paddingHorizontal: 5,
  },
});
