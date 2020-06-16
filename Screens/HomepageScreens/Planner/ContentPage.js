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
import { useSafeArea } from "react-native-safe-area-context";
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

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ContentPage = () => {
  const semButton = (sem) => {
    return (
      <TouchableOpacity
        style={{ ...styles.touchStyle, marginVertical: 20 }}
        activeOpacity={0.9}
      >
        <View style={{ ...styles.viewStyle }}>
          {sideColor()}
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

  const sideColor = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            width: 60,
            height: 0.085 * height,
            borderRadius: 20,
            backgroundColor: "#FF6161",
            elevation: 1,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
          }}
        ></View>
        <View
          style={{
            width: 40,
            height: 0.085 * height,
            backgroundColor: "#FF6161",
            right: 40,
            elevation: 1,
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
    <View style={{ flex: 1 }}>
      <Header
        str={"Planner"}
        leftChildren={<View />}
        rightChildren={<View />}
      />
      <Page year={"Content Page"}>
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FlatList
            data={menu}
            renderItem={({ item }) => semButton(item.name)}
          />
        </View>
      </Page>
    </View>
  );
};

export default ContentPage;

const styles = StyleSheet.create({
  viewStyle: {
    height: 0.085 * height,
    borderRadius: 20,
    width: 0.8 * width,
    backgroundColor: "white",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  touchStyle: {
    height: 0.085 * height,
    borderRadius: 20,
    width: 0.8 * width,
    flexDirection: "row",
  },
});
