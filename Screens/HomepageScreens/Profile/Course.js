import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Header from "../../../Component/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import FirebaseDB from "../../../FirebaseDB";
import { Pressed, NotPressed } from "./Buttons";

const Course = ({ navigation, route }) => {
  useEffect(() => {
    change(route.params?.course1);
  }, [currentCourse]);

  const userInfo = FirebaseDB.firestore().collection("users");
  const user = FirebaseDB.auth().currentUser.uid;

  const notPressed = (str) => (
    <NotPressed text={`${str}`} transition={() => change(`${str}`)} />
  );
  const pressed = (str) => (
    <Pressed text={`${str}`} transition={() => change(`${str}`)} />
  );

  let current = -1;
  const arr = [
    "Computer Science",
    "Business Analytics",
    "Information Systems",
    "Information Security",
    "Computer Engineering",
  ];

  const [CS, setCS] = useState(notPressed("Computer Science"));
  const [BA, setBA] = useState(notPressed("Business Analytics"));
  const [IS, setIS] = useState(notPressed("Information Systems"));
  const [InfoSec, setInfoSec] = useState(notPressed("Information Security"));
  const [CEG, setCEG] = useState(notPressed("Computer Engineering"));
  const [currentCourse, setCourse] = useState(3);

  const deSelect = (current) => {
    if (current === 0) {
      setCS(notPressed("Computer Science"));
    } else if (current === 1) {
      setBA(notPressed("Business Analytics"));
    } else if (current === 2) {
      setIS(notPressed("Information Systems"));
    } else if (current === 3) {
      setInfoSec(notPressed("Information Security"));
    } else if (current === 4) {
      setCEG(notPressed("Computer Engineering"));
    }
  };

  const change = (props) => {
    if (props === "Computer Science" && current !== 0) {
      setCS(pressed("Computer Science"));
      deSelect(current);
      current = 0;
      setCourse(current);
    } else if (props === "Business Analytics" && current !== 1) {
      setBA(pressed("Business Analytics"));
      deSelect(current);
      current = 1;
      setCourse(current);
    } else if (props === "Information Systems" && current !== 2) {
      setIS(pressed("Information Systems"));
      deSelect(current);
      current = 2;
      setCourse(current);
    } else if (props === "Information Security" && current !== 3) {
      setInfoSec(pressed("Information Security"));
      deSelect(current);
      current = 3;
      setCourse(current);
    } else if (props === "Computer Engineering" && current !== 4) {
      setCEG(pressed("Computer Engineering"));
      deSelect(current);
      current = 4;
      setCourse(current);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        str={"Course"}
        leftChildren={
          <Ionicons
            name="md-arrow-round-back"
            size={25}
            style={{ color: "#232323" }}
            onPress={() => {
              userInfo
                .doc(user)
                .update({
                  course: arr[currentCourse],
                })
                .catch((error) => alert(error));
              navigation.navigate("Profile", { course: arr[currentCourse] });
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

export default Course;
