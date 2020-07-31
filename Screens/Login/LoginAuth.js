import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import SignInButton from "../../Component/SignInButton";
import { globalStyles } from "../../Component/GlobalStyle";
import { globalFontStyles } from "../../Component/GlobalFont";
import { useNavigation } from "@react-navigation/native";
import FirebaseDB from "../../FirebaseDB";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const LoginAuth = () => {
  const navigation = useNavigation();
  const [emailValues, setEmailValues] = useState("");
  const [passwordValues, setPasswordValues] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const signIn = () => {
    try {
      setIsLoading(true);
      FirebaseDB.auth()
        .signInWithEmailAndPassword(emailValues, passwordValues)
        .then((response) => {
          const uid = response.user.uid;
          const userRef = FirebaseDB.firestore().collection("users").doc(uid);
          userRef
            .get()
            .then((firestoreDocument) => {
              if (!firestoreDocument.exists) {
                setIsLoading(false);
                alert("No such account with this email exists");
              } else {
                setIsLoading(false);
                const user = firestoreDocument.data();
                const oldpw = user.password;
                if (oldpw !== passwordValues) {
                  userRef.update({
                    password: passwordValues,
                  });
                }
              }
            })
            .catch((error) => {
              alert(error);
              setIsLoading(false);
            });
        })
        .catch((error) => {
          alert(error);
          setIsLoading(false);
        });
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={globalStyles.header}>
        <MaterialCommunityIcons
          name="email"
          size={27}
          style={{ ...globalStyles.iconDesign, right: 13 }}
        />
        <TextInput
          placeholder="Email"
          onChangeText={(text) => setEmailValues(text)}
          placeholderTextColor="#7F8E9E"
          style={{ ...globalFontStyles.OSR_17, right: 8, flex: 1, top: 7 }}
        />
      </View>
      <View style={{ ...globalStyles.header, top: 13 }}>
        <Ionicons
          name="ios-lock"
          size={30}
          style={{ ...globalStyles.iconDesign, right: 10 }}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          onChangeText={(text) => setPasswordValues(text)}
          placeholderTextColor="#7F8E9E"
          style={{ ...globalFontStyles.OSR_17, right: 2, top: 7, flex: 1 }}
        />
      </View>
      <View style={{ ...styles.bottomDesign }}>
        <View style={{ top: 0.05 * height }}>
          <SignInButton func={() => signIn()} isLoading={isLoading}>
            <Text style={{ ...globalFontStyles.OSSB_17, color: "white" }}>
              Sign In
            </Text>
          </SignInButton>
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          style={{
            top: 0.05 * height,
            left: 0.02 * width,
            width: "40%",
            height: "10%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("ForgetPassword")}
        >
          <Text
            style={{
              ...globalFontStyles.NB_14,
              color: "#7F8E9E",
              right: 0.01 * width,
            }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginAuth;

const styles = StyleSheet.create({
  hundred: {
    width: "100%",
    height: "100%,",
  },
  bottomDesign: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
