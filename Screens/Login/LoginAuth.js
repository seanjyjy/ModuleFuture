import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TextInput,
  Alert,
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
          const userRef = FirebaseDB.firestore().collection("users");
          userRef
            .doc(uid)
            .get()
            .then((firestoreDocument) => {
              if (!firestoreDocument.exists) {
                setIsLoading(false);
                alert("No such account with this email exists");
              } else {
                setIsLoading(false);
                const user = firestoreDocument.data();
                navigation.navigate("Homepage", { user });
              }
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

  return (
    <View style={{ flex: 1 }}>
      <View style={globalStyles.header}>
        <MaterialCommunityIcons
          name="email"
          size={30}
          style={{ ...globalStyles.iconDesign, right: 13 }}
        />
        <TextInput
          placeholder="Email"
          onChangeText={(text) => setEmailValues(text)}
          placeholderTextColor="#7F8E9E"
          style={{ ...globalFontStyles.OSR_17, right: 10, flex: 1, top: 7 }}
        />
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
          onChangeText={(text) => setPasswordValues(text)}
          placeholderTextColor="#7F8E9E"
          style={{ ...globalFontStyles.OSR_17, right: 2, top: 7, flex: 1 }}
        />
      </View>
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
          height: "100%",
          top: 0.06 * height,
          right: 0.15 * width,
        }}
      >
        <SignInButton func={() => signIn()} isLoading={isLoading}>
          <Text style={{ ...globalFontStyles.OSSB_17, color: "white" }}>
            Sign In
          </Text>
        </SignInButton>
      </View>
    </View>
  );
};

export default LoginAuth;
