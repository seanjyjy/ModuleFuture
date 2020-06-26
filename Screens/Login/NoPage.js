import { Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import { globalFontStyles } from "../../Component/GlobalFont";
import { globalStyles } from "../../Component/GlobalStyle";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Formik, isString } from "formik";
import * as yup from "yup";
import FirebaseDB from "../../FirebaseDB";
import SignInButton from "../../Component/SignInButton";
const reviewSchema = yup.object({
  username: yup
    .string()
    .required()
    .test(
      "testing username",
      "Username should be within 6 - 16 characters",
      (val) => {
        if (isString(val)) {
          return val.length >= 6 && val.length <= 16;
        }
      }
    ),
  password: yup
    .string()
    .required()
    .test(
      "testing password",
      "Password should be within 6 - 16 characters",
      (val) => {
        if (isString(val)) {
          return val.length >= 6 && val.length <= 16;
        }
      }
    ),
  email: yup.string().required().email("Invalid email"),
});

const NoPage = () => {
  const [isLoading, setIsLoading] = useState("");
  const handleData = (values) => {
    try {
      setIsLoading(true);
      FirebaseDB.auth()
        .createUserWithEmailAndPassword(values.email, values.password)
        .then((response) => {
          const uid = response.user.uid;
          const data = {
            id: uid,
            username: values.username,
            password: values.password,
            email: values.email,
          };
          const userRef = FirebaseDB.firestore().collection("users");
          userRef
            .doc(uid)
            .set(data)
            .then(() => {
              setIsLoading(false);
              navigation.navigate("DetailsCollection", { user: data });
            })
            .catch((error) => {
              setIsLoading(false);
              alert(error);
            });
        })
        .catch((error) => {
          setIsLoading(false);
          alert(error);
        });
    } catch (error) {
      setIsLoading(false);
      alert(error);
    }
  };

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <Formik
        initialValues={{ username: "", password: "", email: "" }}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          handleData(values);
          actions.resetForm();
        }}
      >
        {(props) => (
          <View>
            <View style={globalStyles.header}>
              <MaterialCommunityIcons
                name="account"
                size={30}
                style={{ ...globalStyles.iconDesign, right: 13 }}
              />
              <TextInput
                placeholder="Username"
                placeholderTextColor="#7F8E9E"
                onChangeText={props.handleChange("username")}
                value={props.values.username}
                style={{
                  ...globalFontStyles.OSR_17,
                  right: 10,
                  flex: 1,
                  top: 7,
                }}
              />
            </View>

            <View style={{ left: 30 }}>
              <Text style={{ ...globalFontStyles.OSR_14, color: "#cc0000" }}>
                {props.touched.username && props.errors.username}
              </Text>
            </View>

            <View style={{ ...globalStyles.header, top: 10 }}>
              <Ionicons
                name="ios-lock"
                size={34}
                style={{ ...globalStyles.iconDesign, right: 10 }}
              />
              <TextInput
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="#7F8E9E"
                onChangeText={props.handleChange("password")}
                value={props.values.password}
                style={{
                  ...globalFontStyles.OSR_17,
                  right: 2,
                  top: 7,
                  flex: 1,
                }}
              />
            </View>

            <View style={{ left: 30, top: 10 }}>
              <Text style={{ ...globalFontStyles.OSR_14, color: "#cc0000" }}>
                {props.touched.password && props.errors.password}
              </Text>
            </View>

            <View style={{ ...globalStyles.header, top: 25 }}>
              <MaterialCommunityIcons
                name="email"
                size={30}
                style={{ ...globalStyles.iconDesign, right: 13 }}
              />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#7F8E9E"
                onChangeText={props.handleChange("email")}
                value={props.values.email}
                style={{
                  ...globalFontStyles.OSR_17,
                  right: 8,
                  flex: 1,
                  top: 7,
                }}
              />
            </View>

            <View style={{ left: 30, top: 30 }}>
              <Text style={{ ...globalFontStyles.OSR_14, color: "#cc0000" }}>
                {props.touched.email && props.errors.email}
              </Text>
            </View>

            <View style={{ top: 50, left: 25 }}>
              <SignInButton func={props.handleSubmit} isLoading={isLoading}>
                <Text style={{ ...globalFontStyles.OSSB_17, color: "white" }}>
                  Continue
                </Text>
              </SignInButton>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default NoPage;
