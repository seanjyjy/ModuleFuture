import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { globalFontStyles } from "../../../Component/GlobalFont";
import FirebaseDB from "../../../FirebaseDB";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

console.disableYellowBox = true;

const ProgressPageSettings = ({ navigation, route }) => {
  const userID = route.params?.userID;
  const [totalMCs, setTotalMCs] = useState(160);
  const [TargetCAP, setTargetCAP] = useState(5);

  const questions = (questions, displays, key) => {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={styles.questionLeft}>
          <Text style={{ ...globalFontStyles.NB_15, left: 20 }}>
            {questions}
          </Text>
        </View>
        <View
          style={{
            ...styles.questionRight,
            borderBottomWidth: key === 2 ? 0 : 0.7,
          }}
        >
          <TextInput
            keyboardType="numeric"
            onChangeText={(val) => {
              if (key === 1) {
                setTotalMCs(val);
              } else {
                setTargetCAP(val);
              }
            }}
            placeholder={displays}
            style={{ height: 40, width: 200, left: 15 }}
          />
        </View>
      </View>
    );
  };

  const checkValidInput = (val) => {
    let isnum = /^\d+$/.test(val);
    return isnum;
  };

  return (
    <>
      {/* ----------------------------------------------------------------- HIGHLIGHT--------------------------------------------------------------------------- */}
      <View style={styles.topPortion}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.9}
          style={styles.headerLeft}
        >
          <Text style={{ ...globalFontStyles.NB_14, color: "#232323" }}>
            Cancel
          </Text>
        </TouchableOpacity>
        <View style={styles.headerMiddle}>
          <Text style={{ ...globalFontStyles.NB_17, color: "#232323" }}>
            Options
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (
              !checkValidInput(TargetCAP) ||
              TargetCAP <= 0 ||
              TargetCAP > 5
            ) {
              Alert.alert(
                "Warning",
                `Invalid value of ${TargetCAP} inputted into target CAP. It should be more than 0 and less than 5`,
                [{ text: "Cancel", onPress: () => {} }],
                { cancelable: false }
              );
            } else if (!checkValidInput(totalMCs) || totalMCs <= 0) {
              Alert.alert(
                "Warning",
                `Invalid value of ${totalMCs} inputted into total MCs`,
                [{ text: "Cancel", onPress: () => {} }],
                { cancelable: false }
              );
            } else {
              const usersRef = FirebaseDB.firestore()
                .collection("users")
                .doc(userID);
              usersRef.update({
                totalMCs: parseInt(totalMCs),
                TargetCAP: parseFloat(parseFloat(TargetCAP).toFixed(2)),
              });
              navigation.navigate("ProgressPage", {
                items: [totalMCs, TargetCAP],
                from: "ProgressPageSettings",
              });
            }
          }}
          activeOpacity={0.9}
          style={styles.headerRight}
        >
          <Text style={{ ...globalFontStyles.NB_14, color: "#007AFF" }}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
      {/* ----------------------------------------------------------------- BOTTOM --------------------------------------------------------------------------- */}
      <View style={styles.btmPortion}>
        {questions("Total MCs", "160", 1)}
        {questions("Target CAP", "0-5", 2)}
      </View>
    </>
  );
};

export default ProgressPageSettings;

const styles = StyleSheet.create({
  topPortion: {
    height: 0.11 * height,
    flexDirection: "row",
    borderBottomWidth: 0.7,
    borderColor: "#B5B5B5",
    backgroundColor: "#F7F7F7",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  btmPortion: {
    height: 130,
    borderBottomWidth: 0.7,
    borderColor: "#B5B5B5",
  },
  questionRight: {
    height: "100%",
    width: width,
    justifyContent: "center",
    alignItems: "flex-start",
    borderColor: "#B5B5B5",
  },
  questionLeft: {
    height: "100%",
    width: 120,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerLeft: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    bottom: 13,
  },
  headerMiddle: {
    flex: 4,
    justifyContent: "flex-end",
    alignItems: "center",
    bottom: 13,
  },
  headerRight: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    bottom: 13,
  },
});
