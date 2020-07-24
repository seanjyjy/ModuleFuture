import { Text, TextInput, View, Dimensions } from "react-native";
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
import { BarPasswordStrengthDisplay } from "react-native-password-strength-meter";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const temp = [
  {
    label: "Very Weak",
    labelColor: "#747373",
    activeBarColor: "#747373",
  },
  {
    label: "Weak",
    labelColor: "#FF0000",
    activeBarColor: "#FF0000",
  },
  {
    label: "Fair",
    labelColor: "#FF6C00",
    activeBarColor: "#FF6C00",
  },
  {
    label: "Good",
    labelColor: "#FCF069",
    activeBarColor: "#FCF069",
  },
  {
    label: "Strong",
    labelColor: "#07FFA0",
    activeBarColor: "#07FFA0",
  },
  {
    label: "Perfect",
    labelColor: "#FB5581",
    activeBarColor: "#FB5581",
  },
];

function hasLowerCase(str) {
  if (str !== undefined) {
    return str.toUpperCase() != str;
  }
}

function hasUpperCase(str) {
  if (str !== undefined) {
    return str.toLowerCase() != str;
  }
}

function hasNumber(myString) {
  if (myString !== undefined) {
    return /\d/.test(myString);
  }
}

function hasSpecialChar(str) {
  if (str !== undefined) {
    return /[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/g.test(str);
  }
}

//checks according to OWASP password policy
const reviewSchema = yup.object({
  name: yup.string().required(),
  password: yup
    .string()
    .required()
    .test(
      "testing password0",
      "Password should be more than 8 characters",
      (val) => {
        if (isString(val)) {
          return val.length >= 8;
        }
      }
    )
    .test(
      "testing password1",
      "Password should contain at least 1 Uppercase",
      (val) => hasUpperCase(val)
    )
    .test(
      "testing password2",
      "Password should contain at least 1 Lowercase",
      (val) => hasLowerCase(val)
    )
    .test(
      "testing password3",
      "Password should contain at least 1 number",
      (val) => hasNumber(val)
    )
    .test(
      "testing password4",
      "Password should contain at least 1 special character",
      (val) => hasSpecialChar(val)
    )
    .typeError(() => {}),
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
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <Formik
        initialValues={{ email: "", password: "", name: "" }}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          navigation.navigate("ChoosingOptions", { item: values });
          actions.resetForm();
        }}
      >
        {(props) => (
          <View>
            <View style={{ ...globalStyles.header }}>
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

            <View style={{ left: 30, top: 2 }}>
              <Text style={{ ...globalFontStyles.OSR_14, color: "#cc0000" }}>
                {props.touched.name && props.errors.name}
              </Text>
            </View>
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

            <View style={{ left: 30, top: 3 }}>
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
            <BarPasswordStrengthDisplay
              password={props.values.password}
              width={width - 80}
              wrapperStyle={{ left: 30 }}
              labelStyle={{ right: 50, top: 10, ...globalFontStyles.NBEB_14 }}
              barColor="#E9F2F7"
              levels={temp}
              minLength={8}
            />

            <View
              style={{
                top: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
