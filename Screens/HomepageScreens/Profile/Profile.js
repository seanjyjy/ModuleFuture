import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Header from "../../../Component/Header";
import LogoutButton from "../../../Component/LogoutButton";
import ProfileButton0 from "../../../Component/ProfileButton0";
import FirebaseDB from "../../../FirebaseDB";
import { database } from "firebase";

const Profile = ({ navigation, route }) => {
  const course = () => navigation.navigate("Course", { course1: course1 });
  const focus = () => navigation.navigate("Focus", { fa: focusArea });
  const graduation = () => navigation.navigate("Graduation", { sem: gradSem });

  const [course1, setCourse] = useState("");
  const [gradSem, setGradSem] = useState("");
  const [focusArea, setFocusArea] = useState("None");
  const [year, setYear] = useState("");

  const userInfo = FirebaseDB.firestore().collection("users");
  const user = FirebaseDB.auth().currentUser.uid;

  const getFocusAreas = (data) => {
    if (data === undefined) {
      return "none";
    } else if (data.length > 1) {
      let s;
      for (let i = 0; i < data.length - 1; i++) {
        s += data[i] + ", ";
      }
      s += data[data.length - 1];
      return s;
    } else {
      return data[0];
    }
  };

  useEffect(() => {
    if (route.params?.semester) {
      setGradSem(route.params?.semester);
    } else if (route.params?.course) {
      setCourse(route.params?.course);
    } else if (route.params?.focusArea) {
      setFocusArea(route.params?.focusArea);
    } else {
      userInfo
        .doc(user)
        .get()
        .then((document) => {
          setCourse(document.data().course);
          setGradSem(document.data().expectedSemGrad);
          setFocusArea(getFocusAreas(document.data().focusArea));
        })
        .catch((error) => alert(error));
    }
  });

  const signOutUser = async () => {
    try {
      await FirebaseDB.auth().signOut();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header str={"Profile"} leftChildren={null} rightChildren={null} />
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <ProfileButton0
          left={"Course"}
          transition={() => course()}
          right={course1}
        />
        <ProfileButton0
          left={"Focus Area"}
          transition={() => focus()}
          right={focusArea}
        />
        <ProfileButton0
          left={"Expected Graduation Sem"}
          transition={() => graduation()}
          right={gradSem}
        />
        <View style={{ alignItems: "center" }}>
          <LogoutButton func={() => signOutUser()} />
        </View>
      </View>
    </View>
  );
};

export default Profile;
