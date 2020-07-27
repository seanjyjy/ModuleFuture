import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableOpacity,
} from "react-native";
import Header from "../../../Component/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { globalFontStyles } from "../../../Component/GlobalFont";
import FeatherIcon from "react-native-vector-icons/Feather";
import SignInButton from "../../../Component/SignInButton";
import FirebaseDB from "../../../FirebaseDB";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const EmailVerification = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [didIVerified, setDidIVerified] = useState();
  useEffect(() => {
    if (FirebaseDB.auth().currentUser) {
      const user = FirebaseDB.auth().currentUser;
      setDidIVerified(user.emailVerified);
    }
  }, [isFocused]);
  const signOutUser = async () => {
    try {
      await FirebaseDB.auth().signOut();
    } catch (error) {
      alert(error);
    }
  };
  // if upgrading the plan then can do something liddat :(
  //   let actionCodeSettings = {
  //     url:
  //       "https://orbital-modulefuture.firebaseapp.com/?email=" +
  //       FirebaseDB.auth().currentUser.email,
  //     iOS: {
  //       bundleId: "com.nus-orbital-moduleFuture",
  //     },
  //     android: {
  //       packageName: "com.ModuleFuture",
  //       installApp: true,
  //       minimumVersion: "12",
  //     },
  //     dynamicLinkDomain: "modulefuture.page.link",
  //     handleCodeInApp: true,
  //   };

  const verifyEmail = () => {
    const user = FirebaseDB.auth().currentUser;
    user
      .sendEmailVerification()
      .then((doc) => {
        Alert.alert(
          "Verification email has been send to " + user.email,
          "Please follow the instruction in the email. You will be required to re-login",
          [
            {
              text: "Confirm",
              onPress: () => signOutUser(),
            },
          ],
          { cancelable: false }
        );
      })
      .catch((error) => {});
  };
  const verified = () => {
    return (
      <View style={styles.centerAroundOne}>
        <FeatherIcon
          name="check-circle"
          size={100}
          style={{ color: "#4AE8AB" }}
        />
        <Text style={styles.topTextDesign}>Email Verified</Text>
        <Text style={styles.ThanksDesign}>
          Thank you for verifying your email !
        </Text>
      </View>
    );
  };

  const notVerified = () => {
    return (
      <View
        style={{
          width: 0.9 * width,
          height: 0.6 * height,
          backgroundColor: "white",
          alignSelf: "center",
          top: 20,
          borderRadius: 20,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
        }}
      >
        <FeatherIcon
          name="x-circle"
          size={100}
          style={{ color: "#FF6C7D", top: 10, alignSelf: "center" }}
        />
        <Text style={{ ...styles.topTextDesign }}>Email Not Verified</Text>

        <View style={{ flex: 2 }}>
          <View style={styles.textholder}>
            <Text
              style={{
                ...globalFontStyles.NBEB_24,
                color: "#232323",
                top: 10,
              }}
            >
              Verify your email address
            </Text>
            <Text style={{ ...styles.textStyling, bottom: 0.04 * height }}>
              {
                "Please click the button below to confirm \n          and verify your email address"
              }
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <SignInButton func={() => verifyEmail()}>
              <Text style={{ ...globalFontStyles.OSSB_17, color: "white" }}>
                VERIFY EMAIL
              </Text>
            </SignInButton>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <Header
        str={"Email"}
        leftChildren={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile", {
                EmailVerification: didIVerified,
              });
            }}
            activeOpacity={0.9}
            style={styles.backArrowEasyClicking}
          >
            <Ionicons
              name="md-arrow-round-back"
              size={25}
              style={{ color: "#232323" }}
            />
          </TouchableOpacity>
        }
        rightChildren={<View />}
      />
      <View style={{ flex: 1 }}>
        {didIVerified ? verified() : notVerified()}
      </View>
    </View>
  );
};

export default EmailVerification;

const styles = StyleSheet.create({
  topTextDesign: {
    ...globalFontStyles.NBEB_24,
    color: "#232323",
    alignSelf: "center",
    top: 10,
  },
  centerAroundOne: {
    justifyContent: "space-around",
    alignItems: "center",
    width: 0.9 * width,
    height: 0.35 * height,
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    top: 20,
  },
  ThanksDesign: {
    ...globalFontStyles.NB_13,
    color: "#333333",
    alignSelf: "center",
  },
  containerDesign: {
    width: "90%",
    alignSelf: "center",
    top: 0.03 * height,
    borderRadius: 10,
    backgroundColor: "white",
    overflow: "hidden",
  },

  centerOne: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textholder: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
  },
  textStyling: {
    alignSelf: "center",
    ...globalFontStyles.NSB_14,
    color: "#333333",
  },
  backArrowEasyClicking: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
