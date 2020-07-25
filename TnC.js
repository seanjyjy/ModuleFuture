import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { globalFontStyles } from "./Component/GlobalFont";
import SignInButton from "./Component/SignInButton";

const TnC = (props) => {
  const navigation = useNavigation();
  let fromWhere = props.route.params?.fromWhere;
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.crossContainer}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="cross" size={25} style={{ bottom: 15, right: 10 }} />
        </TouchableOpacity>
        <View style={{ flex: 4 }} />
      </View>
      <View
        style={{
          alignSelf: "center",
          flex: 8,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
          backgroundColor: "white",
          borderRadius: 20,
          bottom: 20,
          marginVertical: 20,
        }}
      >
        <View
          style={{
            height: "100%",
            width: "95%",
            backgroundColor: "white",
            alignSelf: "center",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              ...styles.centerOneWithShadow,
              borderBottomWidth: 1,
              borderColor: "#DDDEDE",
            }}
          >
            <Text style={{ ...globalFontStyles.OSSB_19, color: "#333333" }}>
              Terms and Conditions
            </Text>
          </View>
          <View style={styles.centerPortion}>
            <ScrollView
              style={{
                marginHorizontal: 15,
              }}
            >
              <Text style={styles.biggerWords}>
                Welcome to our mobile app. If you continue to browse and use
                this app, you are agreeing to comply with and be bound by the
                following terms and conditions of use, which together with our
                privacy policy govern ModuleFuture’s relationship with you in
                relation to this app. If you disagree with any part of these
                terms and conditions, please do not use our app.
              </Text>
              <Text style={styles.biggerWords}>
                Our team consists of two person working on their holiday Orbital
                Project. Any bugs or inaccuracy could be raised to the
                developers of this app.
              </Text>
              <Text style={styles.smallerWords}>
                {"\u2022"} The content of the app is for your general
                information and use only. It is subject to change without
                notice.
              </Text>
              <Text style={styles.smallerWords}>
                {"\u2022"} This app uses your data for your tracking and the
                displays of your milestones. We will not use or sell your data
                to anyone without permission.
              </Text>
              <Text style={styles.smallerWords}>
                {"\u2022"} We do not provide any guarantee as to the accuracy,
                performance of the information and materials found or offered on
                this app for any particular purpose. You acknowledge that such
                information and materials may contain inaccuracies or errors and
                we expressly exclude liability for any such inaccuracies or
                errors.
              </Text>
              <Text style={styles.smallerWords}>
                {"\u2022"} Your use of any information or materials on this
                website is entirely at your own risk, for which we shall not be
                liable. It shall be your own responsibility to ensure that any
                products, services or information available through this website
                meet your specific requirements.
              </Text>
              <Text style={styles.smallerWords}>
                {"\u2022"} All trademarks reproduced in this website, which are
                not the property of, or licensed to the operator, are
                acknowledged on the app. Unauthorised use of this app may give
                rise to a claim for damages and/or be a criminal offence.
              </Text>
              <Text style={styles.smallerWords}>
                {"\u2022"} From time to time, this app may also include links to
                other websites. These links are provided for your convenience to
                provide further information. They do not signify that we endorse
                the website(s). We have no responsibility for the content of the
                linked website(s).
              </Text>
            </ScrollView>
          </View>
          <View style={styles.centerOneWithShadow}>
            {fromWhere === "ChoosingOptions" ? (
              <SignInButton
                func={() => {
                  navigation.navigate(fromWhere, { TnCSTATUS: true });
                }}
              >
                <Text style={{ ...globalFontStyles.OSSB_17, color: "white" }}>
                  Accept & Continue
                </Text>
              </SignInButton>
            ) : (
              <View />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
export default TnC;
const styles = StyleSheet.create({
  crossContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  centerOneWithShadow: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 3,
    backgroundColor: "white",
  },
  centerPortion: {
    flex: 5,
    backgroundColor: "#f9f9f9",
  },
  biggerWords: {
    marginTop: 10,
    ...globalFontStyles.NSB_13,
  },
  smallerWords: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
    ...globalFontStyles.NSB_11,
  },
});
