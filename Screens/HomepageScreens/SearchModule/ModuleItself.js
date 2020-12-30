import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { globalFontStyles } from "../../../Component/GlobalFont";
import { globalStyles } from "../../../Component/GlobalStyle";
import Header from "../../../Component/Header";
import ModuleWorkloadInformation from "../AddModule/ModuleWorkloadInformation";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeArea } from "react-native-safe-area-context";

const width = Dimensions.get("window").width;
const ModuleItself = ({ navigation, route }) => {
  const crossIcon = (
    <Entypo size={20} name="cross" style={{ color: "#FF6C7D" }} />
  );
  const tickIcon = (
    <Entypo size={18} name="check" style={{ color: "#4AE8AB", left: 1 }} />
  );

  const setSem = (array) => {
    if (array) {
      const arrOfBoolean = [false, false, false, false];
      for (let i = 0; i < array.length; i++) {
        arrOfBoolean[array[i] - 1] = true;
      }
      return arrOfBoolean;
    }
  };

  const holders = (item) => {
    const mc = item.MC;
    const suOptions = item.suOption;
    let description = item.description;
    if (description) {
      description = description.replace(/(\r\n|\n|\r)/gm, " ");
      description = description.replace(/  +/g, " ");
    }

    const semData = setSem(item.Semester);
    const workLoad = item.workLoad;
    const preclusion = item.preclusion;
    const prereq = item.prerequisite;
    let sum = 0;
    let realsum = 0;
    if (workLoad) {
      for (let i = 0; i < workLoad.length; i++) {
        sum += Math.ceil(workLoad[i]);
        realsum += workLoad[i];
      }
    }
    return (
      <View>
        <View style={{ ...styles.container }}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                width: "78%",
              }}
            >
              <Text
                style={{
                  ...globalFontStyles.OSB_17,
                  color: "#232323",
                  marginBottom: 10,
                }}
              >
                {item.code}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  ...globalFontStyles.OSSB_14,
                  color: "#232323",
                  marginBottom: 18,
                }}
              >
                {item.title}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  marginBottom: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 15,
                  }}
                >
                  <Text style={{ ...styles.suTextStyle, marginRight: 2 }}>
                    SU availability
                  </Text>
                  {suOptions ? tickIcon : crossIcon}
                </View>
                <View
                  style={{
                    borderLeftWidth: 1,
                    borderLeftColor: "black",
                    marginRight: 15,
                  }}
                />
                <Text
                  style={{
                    alignSelf: "center",
                    ...globalFontStyles.OSSB_14,
                    color: "#2A4F74",
                  }}
                >{`MCs : ${mc}`}</Text>
              </View>
            </View>
            <View style={{ width: "22%", alignItems: "flex-end" }}>
              {sidetab("Sem 1", semData[0])}
              {sidetab("Sem 2", semData[1])}
              {sidetab("ST I", semData[2])}
              {sidetab("ST II", semData[3])}
            </View>
          </View>
          <View style={{ paddingRight: 18 }}>
            {headAndBody("Module Details", description)}
            {headAndBody("Preclusion", preclusion)}
            {headAndBody("Prerequisites", prereq)}
            {workLoad ? workloaddisplays(workLoad, realsum) : null}
          </View>
        </View>
        <TouchableOpacity
          style={{
            ...globalStyles.buttonDesign,
            alignSelf: "center",
            width: 160,
            height: 60,
            marginBottom: useSafeArea().bottom > 0 ? useSafeArea().bottom : 20,
          }}
          activeOpacity={0.875}
          onPress={() => {
            const modName = item.title.replace(/\s+/g, "-").toLowerCase();
            const webLink = `https://nusmods.com/modules/${item.code}/${modName}`;
            Linking.openURL(webLink);
          }}
        >
          <Text style={{ ...globalFontStyles.OSSB_13, color: "white" }}>
            View on NUSMods
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const headAndBody = (title, body) =>
    body ? (
      <>
        <Text
          style={{
            color: "#3B6EA2",
            ...globalFontStyles.OSB_15,
            marginBottom: 8,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: "#3B6EA2",
            ...globalFontStyles.OSSB_13,
            marginBottom: 25,
          }}
        >
          {body}
        </Text>
      </>
    ) : null;

  const sidetab = (sem, bool) => (
    <View
      style={{
        ...styles.sideTab,
        backgroundColor: bool ? "#FF6B6B" : "#DCDCDC",
      }}
    >
      <Text style={{ ...globalFontStyles.OSSB_13, color: "white" }}>{sem}</Text>
    </View>
  );
  const workloaddisplays = (array, sum) => {
    const colorArray = ["#F49097", "#DFB2F4", "#5467CE", "#5491CE", "#55D6C2"];
    const titleArray = ["Lec", "Tut", "Lab", "Proj", "Prep"];
    const arrayToMake = [];
    for (let i = 0; i < array.length; i++) {
      let val = array[i];
      for (let j = 0; j < Math.ceil(array[i]); j++) {
        if (j === 0) {
          arrayToMake.push({
            color: colorArray[i],
            title: titleArray[i],
            value: val >= 1 ? 1 : val.toFixed(1),
          });
        } else {
          arrayToMake.push({
            color: colorArray[i],
            title: "",
            value: val >= 1 ? 1 : val.toFixed(1),
          });
        }
        val -= 1;
      }
    }
    let showSum = sum;
    if (isNaN(showSum)) {
      showSum = showSum.toString().substring(1);
    }
    if (array) {
      return (
        <View style={{ flex: 1, bottom: 7 }}>
          <Text
            style={styles.workloadStyling}
          >{`Workload: ${showSum} hrs`}</Text>
          <View
            style={{
              flex: 1,
              width: width * 0.9 - 20,
              top: 5,
            }}
          >
            <ModuleWorkloadInformation arrayToMake={arrayToMake} />
          </View>
        </View>
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        str={"Module Info"}
        leftChildren={
          <Ionicons
            name={"md-arrow-round-back"}
            size={25}
            style={{ color: "#232323" }}
            onPress={() => {
              navigation.goBack();
            }}
          />
        }
        rightChildren={null}
      />
      <ScrollView>{holders(route.params?.item)}</ScrollView>
    </View>
  );
};

export default ModuleItself;

const styles = StyleSheet.create({
  suTextStyle: {
    ...globalFontStyles.OSSB_14,
    color: "#2A4F74",
  },
  container: {
    paddingLeft: 18,
    marginVertical: 15,
    flex: 1,
  },
  sideTab: {
    width: 65,
    height: 35,
    marginBottom: 0.5,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
