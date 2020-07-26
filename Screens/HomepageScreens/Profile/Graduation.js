import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Header from "../../../Component/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import FirebaseDB from "../../../FirebaseDB";
import { Pressed, NotPressed } from "./Buttons";

const Graduation = ({ navigation, route }) => {
  const arr = ["Y3S1", "Y3S2", "Y4S1", "Y4S2", "Y5S1", "Y5S2"];

  useEffect(() => {
    change(route.params?.sem);
  }, [currentYear]);

  const notPressed = (str) => (
    <NotPressed text={`${str}`} transition={() => change(`${str}`)} />
  );
  const pressed = (str) => (
    <Pressed text={`${str}`} transition={() => change(`${str}`)} />
  );

  let current = -1;

  const userInfo = FirebaseDB.firestore().collection("users");
  const user = FirebaseDB.auth().currentUser.uid;

  const [Y3S1, set1] = useState(notPressed("Y3S1"));
  const [Y3S2, set2] = useState(notPressed("Y3S2"));
  const [Y4S1, set3] = useState(notPressed("Y4S1"));
  const [Y4S2, set4] = useState(notPressed("Y4S2"));
  const [Y5S1, set5] = useState(notPressed("Y5S1"));
  const [Y5S2, set6] = useState(notPressed("Y5S2"));
  const [currentYear, setYear] = useState(3);

  const deSelect = (current) => {
    if (current === 0) {
      set1(notPressed("Y3S1"));
    } else if (current === 1) {
      set2(notPressed("Y3S2"));
    } else if (current === 2) {
      set3(notPressed("Y4S1"));
    } else if (current === 3) {
      set4(notPressed("Y4S2"));
    } else if (current === 4) {
      set5(notPressed("Y5S1"));
    } else if (current === 5) {
      set6(notPressed("Y5S2"));
    }
  };

  const change = (props) => {
    if (props === "Y3S1" && current !== 0) {
      set1(pressed("Y3S1"));
      deSelect(current);
      current = 0;
      setYear(current);
    } else if (props === "Y3S2" && current !== 1) {
      set2(pressed("Y3S2"));
      deSelect(current);
      current = 1;
      setYear(current);
    } else if (props === "Y4S1" && current !== 2) {
      set3(pressed("Y4S1"));
      deSelect(current);
      current = 2;
      setYear(current);
    } else if (props === "Y4S2" && current !== 3) {
      set4(pressed("Y4S2"));
      deSelect(current);
      current = 3;
      setYear(current);
    } else if (props === "Y5S1" && current !== 4) {
      set5(pressed("Y5S1"));
      deSelect(current);
      current = 4;
      setYear(current);
    } else if (props === "Y5S2" && current !== 5) {
      set6(pressed("Y5S2"));
      deSelect(current);
      current = 5;
      setYear(current);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        str={"Graduation Semester"}
        leftChildren={
          <Ionicons
            name="md-arrow-round-back"
            size={25}
            style={{ color: "#232323" }}
            onPress={() => {
              userInfo
                .doc(user)
                .update({
                  expectedSemGrad: arr[currentYear],
                })
                .catch((error) => null);
              navigation.navigate("Profile", { grad: arr[currentYear] });
            }}
          />
        }
        rightChildren={<View />}
      />
      <View style={{ paddingLeft: 20, paddingRight: 25 }}>
        {Y3S1}
        {Y3S2}
        {Y4S1}
        {Y4S2}
        {Y5S1}
        {Y5S2}
      </View>
    </View>
  );
};

export default Graduation;
