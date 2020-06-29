import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Header from "../../../Component/Header";
import LogoutButton from "../../../Component/LogoutButton";
import ProfileButton0 from "../../../Component/ProfileButton0";
import FirebaseDB from "../../../FirebaseDB";

const Profile = ({ navigation, route }) => {
  const course = () => navigation.navigate("Course", { course1: course1 });
  const focus = () => navigation.navigate("Focus");
  const graduation = () => navigation.navigate("Graduation", { sem: gradSem });

  const [course1, setCourse] = useState("");
  const [gradSem, setGradSem] = useState("");
  const [year, setYear] = useState("");

  const userInfo = FirebaseDB.firestore().collection("users");
  const user = FirebaseDB.auth().currentUser.uid;
  useEffect(() => {
    if (route.params?.semester) {
      setGradSem(route.params?.semester);
    } else if (route.params?.course) {
      setCourse(route.params?.course);
    } else {
      userInfo
        .doc(user)
        .get()
        .then((document) => {
          setCourse(document.data().course);
          setGradSem(document.data().expectedSemGrad);
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
          right={"None"}
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
