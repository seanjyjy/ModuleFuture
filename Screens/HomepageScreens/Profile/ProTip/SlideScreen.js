import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ScreenPic from "./ScreenPic";
import Header from "../../../../Component/Header";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const SlideScreen = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <Header
        str={title}
        leftChildren={
          <Ionicons
            name="md-arrow-round-back"
            size={25}
            style={{ color: "#232323" }}
            onPress={() => navigation.goBack()}
          />
        }
      />
      <View
        style={{
          height: 0.67 * height,
          width: "100%",
          borderBottomWidth: 1,
          borderColor: "#DDDDDD",
        }}
      >
        <ScrollView
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
        >
          <ScreenPic imageLink={require("../../../../assets/y1s1.png")} />
          <ScreenPic imageLink={require("../../../../assets/y1s2.png")} />
          <ScreenPic imageLink={require("../../../../assets/y2s1.png")} />
        </ScrollView>
      </View>
      <View style={{ flex: 1 }} />
    </View>
  );
};
export default SlideScreen;
const styles = StyleSheet.create({});
