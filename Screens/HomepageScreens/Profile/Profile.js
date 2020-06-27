import React from "react";
import { View } from "react-native";
import Header from "../../../Component/Header";
import LogoutButton from "../../../Component/LogoutButton";
import ProfileButton0 from "../../../Component/ProfileButton0";
import FirebaseDB from "../../../FirebaseDB";

const Profile = ({ navigation }) => {
  const course = () => navigation.navigate("Course");
  const focus = () => navigation.navigate("Focus");
  const graduation = () => navigation.navigate("Graduation");
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
          right={"Computer Science"}
        />
        <ProfileButton0
          left={"Focus Area"}
          transition={() => focus()}
          right={"None"}
        />
        <ProfileButton0
          left={"Expected Graduation Sem"}
          transition={() => graduation()}
          right={"Y4S2"}
        />
        <View style={{ alignItems: "center" }}>
          <LogoutButton func={() => signOutUser()} />
        </View>
      </View>
    </View>
  );
};

export default Profile;
