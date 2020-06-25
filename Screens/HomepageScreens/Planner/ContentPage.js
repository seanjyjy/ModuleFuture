import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { globalFontStyles } from "../../../Component/GlobalFont";
import Y1S1 from "./Plans/Y1S1";
import Y1S2 from "./Plans/Y1S2";
import Y2S1 from "./Plans/Y2S1";
import Y2S2 from "./Plans/Y2S2";
import Y3S1 from "./Plans/Y3S1";
import Y3S2 from "./Plans/Y3S2";
import Y4S1 from "./Plans/Y4S1";
import Y4S2 from "./Plans/Y4S2";
import { useNavigation } from "@react-navigation/native";
import SimpleIcon from "react-native-vector-icons/SimpleLineIcons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ContentPage = (props) => {
  const colors = [
    "#FFB584",
    "#FF6F66",
    "#C6E198",
    "#6CD5AF",
    "#8F9ED5",
    "#CE6F73",
    "#241161",
    "#6c2386",
  ];

  const iconY1S1 = (
    <Image
      style={styles.imageStyle}
      source={require("../../../assets/y1s1.png")}
    />
  );
  const iconY1S2 = (
    <Image
      style={styles.imageStyle}
      source={require("../../../assets/y1s2v1.png")}
    />
  );
  const iconY2S1 = (
    <Image
      style={styles.imageStyle}
      source={require("../../../assets/y2s1.png")}
    />
  );
  const iconY2S2 = (
    <Image
      style={styles.imageStyle}
      source={require("../../../assets/y2s2.png")}
    />
  );
  const iconY3S1 = (
    <Image
      style={styles.imageStyle}
      source={require("../../../assets/y3s1.png")}
    />
  );
  const iconY3S2 = (
    <Image
      style={styles.imageStyle}
      source={require("../../../assets/y3s2.png")}
    />
  );
  const iconY4S1 = (
    <Image
      style={styles.imageStyle}
      source={require("../../../assets/y4s1.png")}
    />
  );
  const iconY4S2 = (
    <Image
      style={styles.imageStyle}
      source={require("../../../assets/y4s2.png")}
    />
  );

  const imagesArray = [
    iconY1S1,
    iconY1S2,
    iconY2S1,
    iconY2S2,
    iconY3S1,
    iconY3S2,
    iconY4S1,
    iconY4S2,
  ];

  const navigation = useNavigation();
  const holders = (sem, key, PageName) => {
    return (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate(PageName);
        }}
      >
        <View style={{ flex: 3, padding: 20 }}>{imagesArray[key - 1]}</View>
        <View
          style={{ ...styles.textDesign, backgroundColor: colors[key - 1] }}
        >
          <Text style={{ ...globalFontStyles.NB_20, color: "#F4F4F4" }}>
            {sem}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const [menu, setMenu] = useState([
    { venue: <Y1S1 />, key: 1, name: "Year 1 - Sem 1", PageName: "Y1S1" },
    { venue: <Y1S2 />, key: 2, name: "Year 1 - Sem 2", PageName: "Y1S2" },
    { venue: <Y2S1 />, key: 3, name: "Year 2 - Sem 1", PageName: "Y2S1" },
    { venue: <Y2S2 />, key: 4, name: "Year 2 - Sem 2", PageName: "Y2S2" },
    { venue: <Y3S1 />, key: 5, name: "Year 3 - Sem 1", PageName: "Y3S1" },
    { venue: <Y3S2 />, key: 6, name: "Year 3 - Sem 2", PageName: "Y3S2" },
    { venue: <Y4S1 />, key: 7, name: "Year 4 - Sem 1", PageName: "Y4S1" },
    { venue: <Y4S2 />, key: 8, name: "Year 4 - Sem 2", PageName: "Y4S2" },
  ]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <View
          style={{
            flex: 5,
            justifyContent: "flex-end",
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              ...globalFontStyles.OSB_34,
              color: "#272727",
              left: 30,
              bottom: 10,
            }}
          >
            Home
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
            <SimpleIcon
              name="graph"
              color="#484848"
              size={30}
              style={{ top: 8 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ height: 5, width: "100%" }} />
      <View style={{ flex: 1, position: "relative", marginBottom: 60 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          keyExtractor={(item) => item.key.toString()}
          data={menu}
          renderItem={({ item }) => holders(item.name, item.key, item.PageName)}
        />
      </View>
    </View>
  );
};

export default ContentPage;

const styles = StyleSheet.create({
  container: {
    width: (width - 40) / 2,
    height: (width - 40) / 2 + 10,
    marginVertical: 12,
    marginHorizontal: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
    flexDirection: "column",
    backgroundColor: "white",
  },
  imageStyle: {
    flex: 1,
    resizeMode: "contain",
  },
  textDesign: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    top: 1,
  },
  header: {
    height: 100,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#F9F9F9",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.18,
    // shadowRadius: 1.0,
    // elevation: 2,
    elevation: 5,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.1,
  },
});
