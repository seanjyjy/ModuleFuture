import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Page from "./Page";
import Animated from "react-native-reanimated";
import Header from "../../../Component/Header";

const Planner = () => {
  const x = useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1 }}>
      <Header str={"Planner"} />
      <Page></Page>
    </View>
  );
};

export default Planner;

const styles = StyleSheet.create({});
