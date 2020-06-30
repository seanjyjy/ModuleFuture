import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Header from "../../../Component/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import FirebaseDB from "../../../FirebaseDB";
import { Pressed, NotPressed } from "./Buttons";

const Year = ({ navigation, route }) => {
  useEffect(() => {
    change(route.params?.year);
  }, [currentYear]);

  const userInfo = FirebaseDB.firestore().collection("users");
  const user = FirebaseDB.auth().currentUser.uid;

  const notPressed = (str) => (
    <NotPressed text={`${str}`} transition={() => change(`${str}`)} />
  );
  const pressed = (str) => (
    <Pressed text={`${str}`} transition={() => change(`${str}`)} />
  );

  let current = -1;
  const arr = ["2016", "2017", "2018", "2019", "2020"];

  const [CS, setCS] = useState(notPressed("2016"));
  const [BA, setBA] = useState(notPressed("2017"));
  const [IS, setIS] = useState(notPressed("2018"));
  const [InfoSec, setInfoSec] = useState(notPressed("2019"));
  const [CEG, setCEG] = useState(notPressed("2020"));
  const [currentYear, setYear] = useState(3);

  const deSelect = (current) => {
    if (current === 0) {
      setCS(notPressed("2016"));
    } else if (current === 1) {
      setBA(notPressed("2017"));
    } else if (current === 2) {
      setIS(notPressed("2018"));
    } else if (current === 3) {
      setInfoSec(notPressed("2019"));
    } else if (current === 4) {
      setCEG(notPressed("2020"));
    }
  };

  const change = (props) => {
    if (props === "2016" && current !== 0) {
      setCS(pressed("2016"));
      deSelect(current);
      current = 0;
      setYear(current);
    } else if (props === "2017" && current !== 1) {
      setBA(pressed("2017"));
      deSelect(current);
      current = 1;
      setYear(current);
    } else if (props === "2018" && current !== 2) {
      setIS(pressed("2018"));
      deSelect(current);
      current = 2;
      setYear(current);
    } else if (props === "2019" && current !== 3) {
      setInfoSec(pressed("2019"));
      deSelect(current);
      current = 3;
      setYear(current);
    } else if (props === "2020" && current !== 4) {
      setCEG(pressed("2020"));
      deSelect(current);
      current = 4;
      setYear(current);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        str={"Year"}
        leftChildren={
          <Ionicons
            name="md-arrow-round-back"
            size={25}
            style={{ color: "#232323" }}
            onPress={() => {
              userInfo
                .doc(user)
                .update({
                  yearOfMatri: arr[currentYear],
                })
                .catch((error) => alert(error));
              navigation.navigate("Profile", {});
            }}
          />
        }
        rightChildren={<View />}
      />
      <View style={{ paddingLeft: 20, paddingRight: 25 }}>
        {CS}
        {BA}
        {IS}
        {InfoSec}
        {CEG}
      </View>
    </View>
  );
};

export default Year;
