import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FirebaseDB from "../../FirebaseDB";
import Background from "../Backgrounds/Background";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import { globalFontStyles } from "../../Component/GlobalFont";
import { globalStyles } from "../../Component/GlobalStyle";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SignInButton from "../../Component/SignInButton";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const ForgetPW = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [textToShow, setTextToShow] = useState("");
  const forgotPassword = () => {
    FirebaseDB.auth()
      .sendPasswordResetEmail(email)
      .then((user) => {
        Alert.alert(
          "Reset email has been sent to " + email + ".",
          "Please follow the instructions in the email.",
          [
            {
              text: "Confirm",
              onPress: () => navigation.goBack(),
              style: "cancel",
            },
          ],
          { cancelable: false }
        );
        setShowAlert(false);
        setTextToShow("");
      })
      .catch((error) => {
        if (error.code.toString() === "auth/invalid-email") {
          setTextToShow("Invalid email!", "Please enter a valid email!");
        }
        if (error.code.toString() === "auth/user-not-found") {
          setTextToShow(
            "Email not registered!",
            "Please enter a registered email!"
          );
        }
        setShowAlert(true);
      });
  };

  return (
    <Background>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Ionicons
            name="md-arrow-round-back"
            size={25}
            style={{ color: "#3E3E3E", left: 30, bottom: 10 }}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={{ flex: 3 }} />
      </View>
      <View style={{ flex: 9 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.centerOne}>
            <Fontisto name="locked" size={80} style={{ color: "#232323" }} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 2, bottom: 0.06 * height }}>
              <View style={styles.centerOne}>
                <Text style={{ ...globalFontStyles.NBEB_34, color: "#232323" }}>
                  FORGET
                </Text>
              </View>
              <View style={styles.centerOne}>
                <Text style={{ ...globalFontStyles.NBEB_34, color: "#232323" }}>
                  PASSWORD
                </Text>
              </View>
            </View>
            <View style={{ ...styles.centerThree }}>
              <Text style={{ ...globalFontStyles.NR_14, color: "#333333" }}>
                Please provide the account's email that you wish
              </Text>
              <Text style={{ ...globalFontStyles.NR_14, color: "#333333" }}>
                to reset your password!
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ ...globalStyles.header, bottom: 0.1 * height }}>
            <MaterialCommunityIcons
              name="email"
              size={27}
              style={{ ...globalStyles.iconDesign, right: 13 }}
            />
            <TextInput
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor="#7F8E9E"
              style={{ ...globalFontStyles.OSR_17, right: 8, flex: 1, top: 7 }}
            />
          </View>
          <View style={{ bottom: 0.095 * height, left: 40 }}>
            {showAlert ? (
              <View style={{ height: 0.03 * height }}>
                <Text style={{ ...globalFontStyles.OSR_14, color: "#cc0000" }}>
                  {textToShow}
                </Text>
              </View>
            ) : (
              <View style={{ height: 0.03 * height }} />
            )}
          </View>
          <View style={styles.buttonPos}>
            <SignInButton func={() => forgotPassword()}>
              <Text style={{ ...globalFontStyles.OSSB_17, color: "white" }}>
                Reset
              </Text>
            </SignInButton>
          </View>
        </View>
      </View>
    </Background>
  );
};

export default ForgetPW;

const styles = StyleSheet.create({
  centerOne: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centerThree: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    bottom: 0.05 * height,
  },
  buttonPos: {
    justifyContent: "center",
    alignItems: "center",
    bottom: 0.06 * height,
  },
});
