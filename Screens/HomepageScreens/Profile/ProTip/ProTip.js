import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
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
      title: "How to use the planner?",
      miniDescription:
        "This short tutorial will teach you how to use this planner app, for more advance stuff, please view the rest of the tutorials",
      key: "1",
      titleColor: "#232323",
      textColor: "#232323",
      requiredLink: require("../../../../assets/marbleBG.png"),
    },
  ];

  const cardMaker = (
    title,
    miniDescription,
    titleColor,
    textColor,
    ImageToUse
  ) => {
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate("PlannerLessonStack");
        }}
      >
        <ImageBackground style={styles.cardDesign} source={ImageToUse}>
          <View style={{ height: 10 }} />
          <View style={styles.headerPos}>
            <Text style={{ ...styles.titleStyling, color: titleColor }}>
              {title}
            </Text>
          </View>
          <View style={{ flex: 5, paddingHorizontal: 10 }}>
            <Text style={{ ...styles.textStyling, color: textColor }}>
              {miniDescription}
            </Text>
          </View>
        </ImageBackground>
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
      <View style={{ height: 20, width: "100%" }} />
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
              item.requiredLink
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
    width: 0.9 * width,
    height: 0.2 * height,
    alignSelf: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleStyling: {
    ...globalFontStyles.NBEB_24,
    left: 10,
  },
  textStyling: { ...globalFontStyles.NSB_15, left: 10 },
  cardContainer: {
    width: 0.95 * width,
    height: 0.2 * height,
    alignSelf: "center",
  },
  headerPos: { flex: 2, justifyContent: "center", paddingHorizontal: 10 },
});
