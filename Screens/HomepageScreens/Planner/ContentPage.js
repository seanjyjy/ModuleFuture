import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { globalFontStyles } from "../../../Component/GlobalFont";
import Page from "./Page";
import Header from "../../../Component/Header";
import Y1S1 from "./Plans/Y1S1";
import Y1S2 from "./Plans/Y1S2";
import Y2S1 from "./Plans/Y2S1";
import Y2S2 from "./Plans/Y2S2";
import Y3S1 from "./Plans/Y3S1";
import Y3S2 from "./Plans/Y3S2";
import Y4S1 from "./Plans/Y4S1";
import Y4S2 from "./Plans/Y4S2";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ContentPage = () => {
  const navigation = useNavigation();
  const semButton = (sem) => {
    let state = true;
    return (
      <TouchableOpacity
        style={{ ...styles.touchStyle, marginVertical: 20 }}
        activeOpacity={0.9}
        onPress={() => navigation.navigate(sem.toString())}
      >
        <View style={{ ...styles.viewStyle }}>
          {sideColor(state)}
          <View
            style={{
              width: "42%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ ...globalFontStyles.OSB_17, color: "#303030" }}>
              {sem}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const sideColor = (state) => {
    return (
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            width: 60,
            height: 0.08 * height,
            borderRadius: 20,
            backgroundColor: state ? "#FF6161" : "#61FF86",
            elevation: 2,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
          }}
        ></View>
        <View
          style={{
            width: 40,
            height: 0.08 * height,
            backgroundColor: state ? "#FF6161" : "#61FF86",
            right: 40,
            elevation: 2,
            shadowColor: "#000",
            shadowOffset: {
              width: 2,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
          }}
        />
      </View>
    );
  };

  const [menu, setMenu] = useState([
    { venue: <Y1S1 />, key: "1", name: "Y1S1" },
    { venue: <Y1S2 />, key: "2", name: "Y1S2" },
    { venue: <Y2S1 />, key: "3", name: "Y2S1" },
    { venue: <Y2S2 />, key: "4", name: "Y2S2" },
    { venue: <Y3S1 />, key: "5", name: "Y3S1" },
    { venue: <Y3S2 />, key: "6", name: "Y3S2" },
    { venue: <Y4S1 />, key: "7", name: "Y4S1" },
    { venue: <Y4S2 />, key: "8", name: "Y4S2" },
  ]);

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Header
        str={"Planner"}
        leftChildren={<View />}
        rightChildren={<View />}
      />
      <Page year={"Content Page"}>
        <View
          style={{
            width: "100%",
            height: "97%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FlatList
            data={menu}
            renderItem={({ item }) => semButton(item.name)}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Page>
    </View>
  );
};

export default ContentPage;

const styles = StyleSheet.create({
  viewStyle: {
    height: 0.08 * height,
    borderRadius: 20,
    width: 0.8 * width,
    backgroundColor: "white",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "#F9F9F9",
  },
  touchStyle: {
    height: 0.08 * height,
    borderRadius: 20,
    width: 0.8 * width,
    flexDirection: "row",
  },
});
