import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Header from "../../../Component/Header";
import LogoutButton from "../../../Component/LogoutButton";
import ProfileButton0 from "../../../Component/ProfileButton0";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import FirebaseDB from "../../../FirebaseDB";
import { CS2019Mapping } from "../../../Data/Types";

const Profile = (props) => {
  const navigation = useNavigation();
  const course = () => navigation.navigate("Course", { course1: course1 });
  const yearTransition = () => navigation.navigate("Year", { year: year });
  const graduation = () => navigation.navigate("Graduation", { sem: gradSem });

  const [course1, setCourse] = useState(props.extraData.course);
  const [gradSem, setGradSem] = useState(props.extraData.expectedSemGrad);
  const [year, setYear] = useState(props.extraData.yearOfMatri);
  const email = props.extraData.email;

  const isFocused = useIsFocused();

  useEffect(() => {
    if (props.route.params?.course) setCourse(props.route.params?.course);
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

  const arr = [];
  const mapping = [
    "Foundation",
    "IT Professionalism",
    "Mathematics and Sciences",
    "Breadth and Depth",
  ];

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
          transition={() => {
            // for (let i = 0; i < CS2019Mapping.length; i++) {
            //   for (let j = 0; j < CS2019Mapping[i].length; j++) {
            //     let k = 0;
            //     const type = mapping[i];
            //     for (; CS2019Mapping[i][j][k] !== " "; k++) {}
            //     const str = CS2019Mapping[i][j].substring(0, k);
            //     const news = "`" + str + "`" + ": " + "`" + type + "`,";
            //     console.log(news);
            //   }
            // }
            course();
          }}
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
        <ProfileButton0 left={"Email"} transition={() => null} right={email} />
        <View style={{ alignItems: "center" }}>
          <LogoutButton func={() => signOutUser()} />
        </View>
      </View>
    </View>
  );
};

export default Profile;
