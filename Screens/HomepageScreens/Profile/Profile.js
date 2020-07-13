import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Header from "../../../Component/Header";
import LogoutButton from "../../../Component/LogoutButton";
import ProfileButton0 from "../../../Component/ProfileButton0";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import FirebaseDB from "../../../FirebaseDB";

const Profile = (props) => {
  const navigation = useNavigation();
  const yearTransition = () => navigation.navigate("Year", { year: year });
  const graduation = () => navigation.navigate("Graduation", { sem: gradSem });
  const EmailVerification = () => navigation.navigate("EmailVerification");

  const [gradSem, setGradSem] = useState(props.extraData.expectedSemGrad);
  const [year, setYear] = useState(props.extraData.yearOfMatri);
  const course1 = props.extraData.course;
  const email = props.extraData.email;

  const isFocused = useIsFocused();

  useEffect(() => {
    if (props.route.params?.grad) setGradSem(props.route.params?.grad);
    if (props.route.params?.year) setYear(props.route.params?.year);
  }, [isFocused]);

  const signOutUser = async () => {
    try {
      await FirebaseDB.auth().signOut();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header str={"Profile"} />
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <ProfileButton0
          left={"Course"}
          transition={() => null}
          right={course1}
        />
        <ProfileButton0
          left={"Year of Matriculation"}
          transition={() => yearTransition()}
          right={year}
        />
        <ProfileButton0
          left={"Expected Graduation Sem"}
          transition={() => graduation()}
          right={gradSem}
        />
        <ProfileButton0
          left={"Email"}
          transition={() => EmailVerification()}
          right={email}
        />
        <View style={{ alignItems: "center" }}>
          <LogoutButton func={() => signOutUser()} />
        </View>
      </View>
    </View>
  );
};

export default Profile;
