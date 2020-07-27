import React, { useState, useEffect } from "react";
import { Text, View, Dimensions } from "react-native";
import Header from "../../../Component/Header";
import LogoutButton from "../../../Component/LogoutButton";
import ProfileButton0 from "../../../Component/ProfileButton0";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import FirebaseDB from "../../../FirebaseDB";
import { globalFontStyles } from "../../../Component/GlobalFont";

const width = Dimensions.get("window").width;

const Profile = (props) => {
  const navigation = useNavigation();
  const graduation = () => navigation.navigate("Graduation", { sem: gradSem });
  const EmailVerification = () => navigation.navigate("EmailVerification");
  const CreditPage = () => navigation.navigate("Credit");
  const ProTip = () => navigation.navigate("ProTip");
  const [gradSem, setGradSem] = useState(props.extraData.expectedSemGrad);
  const year = props.extraData.yearOfMatri;
  const course1 = props.extraData.course;
  const email = props.extraData.email;

  const isFocused = useIsFocused();

  useEffect(() => {
    if (props.route.params?.grad) setGradSem(props.route.params?.grad);
  }, [isFocused]);

  const signOutUser = async () => {
    try {
      await FirebaseDB.auth().signOut();
    } catch (error) {}
  };

  const CourseOf = (props) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 20,
          width: "100%",
        }}
      >
        <Text
          style={{
            ...globalFontStyles.OSSB_15,
            color: "#232323",
            width: "25%",
          }}
        >
          {props.left}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            ...globalFontStyles.OSR_14,
            color: "#2D405699",
            width: "75%",
            textAlign: "right",
            right: 0.05 * width,
          }}
        >
          {props.right}
        </Text>
      </View>
    );
  };

  const YearOf = (props) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 20,
          width: "100%",
        }}
      >
        <Text
          style={{
            ...globalFontStyles.OSSB_15,
            color: "#232323",
          }}
        >
          {props.left}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            ...globalFontStyles.OSR_14,
            color: "#2D405699",
            right: 0.05 * width,
          }}
        >
          {props.right}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header str={"Profile"} />
      <View
        style={{
          width: "89%",
          alignSelf: "center",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <CourseOf left={"Course"} right={course1} />
        <YearOf left={"Year of Matriculation"} right={year} />
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
        <ProfileButton0
          left="Pro-tip tutorial"
          transition={() => ProTip()}
          right={""}
        />
        <ProfileButton0
          left={"About"}
          transition={() => CreditPage()}
          right={""}
        />
        <LogoutButton func={() => signOutUser()} />
      </View>
    </View>
  );
};

export default Profile;
