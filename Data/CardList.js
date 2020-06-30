import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import {
  Y1S1,
  Y1S2,
  Y2S1,
  Y2S2,
  Y3S1,
  Y3S2,
  Y4S1,
  Y4S2,
  Y5S1,
  Y5S2,
} from "../Screens/HomepageScreens/Planner/Plans/ContentPlan";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const ratio = 228 / 362;

const CARD_HEIGHT = width * 0.8 * ratio;
const styles = StyleSheet.create({
  card: {
    width: width * 0.8,
    height: CARD_HEIGHT,
  },
});
const card1 = (
  <Image source={require("../assets/y1s1.png")} style={styles.card} />
);
const card2 = (
  <Image source={require("../assets/y1s2.png")} style={styles.card} />
);
const card3 = (
  <Image source={require("../assets/y2s1.png")} style={styles.card} />
);
const card4 = (
  <Image source={require("../assets/y2s2.png")} style={styles.card} />
);
const card5 = (
  <Image source={require("../assets/y3s1.png")} style={styles.card} />
);
const card6 = (
  <Image source={require("../assets/y3s2.png")} style={styles.card} />
);
const card7 = (
  <Image source={require("../assets/y4s1.png")} style={styles.card} />
);
const card8 = (
  <Image source={require("../assets/y4s2.png")} style={styles.card} />
);
const card9 = (
  <Image source={require("../assets/y5s1.png")} style={styles.card} />
);
const card10 = (
  <Image source={require("../assets/y5s2.png")} style={styles.card} />
);
const card11 = <View style={{ width: 0.8 * width, height: 100 }}></View>;

export let Menu = [
  {
    venue: <Y1S1 />,
    key: 1,
    name: "Year 1 - Sem 1",
    PageName: "Y1S1",
    card: card1,
  },
  {
    venue: <Y1S2 />,
    key: 2,
    name: "Year 1 - Sem 2",
    PageName: "Y1S2",
    card: card2,
  },
  {
    venue: <Y2S1 />,
    key: 3,
    name: "Year 2 - Sem 1",
    PageName: "Y2S1",
    card: card3,
  },
  {
    venue: <Y2S2 />,
    key: 4,
    name: "Year 2 - Sem 2",
    PageName: "Y2S2",
    card: card4,
  },
  {
    venue: <Y3S1 />,
    key: 5,
    name: "Year 3 - Sem 1",
    PageName: "Y3S1",
    card: card5,
  },
  {
    venue: <Y3S2 />,
    key: 6,
    name: "Year 3 - Sem 2",
    PageName: "Y3S2",
    card: card6,
  },
  {
    venue: <Y4S1 />,
    key: 7,
    name: "Year 4 - Sem 1",
    PageName: "Y4S1",
    card: card7,
  },
  {
    venue: <Y4S2 />,
    key: 8,
    name: "Year 4 - Sem 2",
    PageName: "Y4S2",
    card: card8,
  },
  {
    venue: <Y5S1 />,
    key: 9,
    name: "Year 5 - Sem 1",
    PageName: "Y5S1",
    card: card9,
  },
  {
    venue: <Y5S2 />,
    key: 10,
    name: "Year 5 - Sem 2",
    PageName: "Y5S2",
    card: card10,
  },
  { venue: {}, key: 11, name: "", PageName: "Content Page", card: card11 },
];
