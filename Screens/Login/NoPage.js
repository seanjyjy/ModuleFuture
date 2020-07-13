import { Text, TextInput, View } from "react-native";
import { globalFontStyles } from "../../Component/GlobalFont";
import { globalStyles } from "../../Component/GlobalStyle";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Formik, isString } from "formik";
import * as yup from "yup";
import SignInButton from "../../Component/SignInButton";
import FirebaseDB from "../../FirebaseDB";
const reviewSchema = yup.object({
  name: yup.string().required(),
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
  email: yup
    .string()
    .required()
    .email("Invalid email")
    .test("check if email is in use", "Email has been registered", (val) => {
      const emailRegex = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
      let isValidEmail = emailRegex.test(val);
      if (isValidEmail) {
        return FirebaseDB.auth()
          .fetchSignInMethodsForEmail(val.toLowerCase())
          .then((array) => array.length === 0)
          .catch((error) => alert(error));
      }
      return true;
    }),
});

const NoPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <Formik
        initialValues={{ email: "", password: "", name: "" }}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          navigation.navigate("DetailsCollection", { item: values });
          actions.resetForm();
        }}
      >
        {(props) => (
          <View>
            <View style={globalStyles.header}>
              <MaterialCommunityIcons
                name="email"
                size={27}
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

            <View style={{ left: 30 }}>
              <Text style={{ ...globalFontStyles.OSR_14, color: "#cc0000" }}>
                {props.touched.email && props.errors.email}
              </Text>
            </View>

            <View style={{ ...globalStyles.header, bottom: 1 }}>
              <Ionicons
                name="ios-lock"
                size={30}
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

            <View style={{ left: 30 }}>
              <Text style={{ ...globalFontStyles.OSR_14, color: "#cc0000" }}>
                {props.touched.password && props.errors.password}
              </Text>
            </View>

            <View style={{ ...globalStyles.header, top: 2 }}>
              <MaterialCommunityIcons
                name="account"
                size={30}
                style={{ ...globalStyles.iconDesign, right: 13 }}
              />
              <TextInput
                placeholder="Name"
                placeholderTextColor="#7F8E9E"
                onChangeText={props.handleChange("name")}
                value={props.values.username}
                style={{
                  ...globalFontStyles.OSR_17,
                  right: 10,
                  flex: 1,
                  top: 7,
                }}
              />
            </View>

            <View style={{ left: 30, top: 3 }}>
              <Text style={{ ...globalFontStyles.OSR_14, color: "#cc0000" }}>
                {props.touched.name && props.errors.name}
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
