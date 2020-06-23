import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { CommonActions } from "@react-navigation/native";
import { globalFontStyles } from "../../../Component/GlobalFont";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ProgressPageSettings = ({ navigation, route }) => {
  //const [NumInterval, setNumInterval] = useState(4);
  const [totalMCs, setTotalMCs] = useState(160);
  const [TargetCAP, setTargetCAP] = useState(5);

  //const navigation = useNavigation();

  const questions = (questions, displays, key) => {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={styles.questionLeft}>
          <Text style={{ ...globalFontStyles.OSSB_15, left: 20 }}>
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

  return (
    <>
      {/* ----------------------------------------------------------------- HIGHLIGHT--------------------------------------------------------------------------- */}
      <View style={styles.topPortion}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(CommonActions.goBack())}
          activeOpacity={0.9}
          style={styles.headerLeft}
        >
          <Text style={{ ...globalFontStyles.OSR_17, color: "#0F0B0B" }}>
            Cancel
          </Text>
        </TouchableOpacity>
        <View style={styles.headerMiddle}>
          <Text style={{ ...globalFontStyles.OSSB_19, color: "#5D5151" }}>
            Options
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ProgressPage", {
              items: [NumInterval, totalMCs, TargetCAP],
            });
          }}
          activeOpacity={0.9}
          style={styles.headerRight}
        >
          <Text style={{ ...globalFontStyles.OSB_17, color: "#4787D9" }}>
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
    height: 100,
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
    height: 180,
    borderBottomWidth: 0.7,
    borderColor: "#B5B5B5",
  },
  questionRight: {
    height: "100%",
    width: width - 160,
    justifyContent: "center",
    alignItems: "flex-start",
    borderColor: "#B5B5B5",
  },
  questionLeft: {
    height: "100%",
    width: 160,
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
