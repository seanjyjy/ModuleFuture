import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { globalFontStyles } from "../../../../Component/GlobalFont";
import { MenuItem, OverflowMenu } from "@ui-kitten/components";
import { useSafeArea } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-eva-icons";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ViewPlan = ({ route }) => {
  const navigation = useNavigation();
  const usaBTM = useSafeArea().bottom;
  const heightToAdjust = usaBTM > 0 ? (usaBTM - 20) / 2 : 0;
  const title = route.params?.item[0];
  const [dataArray, setDataArray] = useState([]);
  useEffect(() => {
    if (route.params?.item[1]) {
      const arrayOfModules = route.params?.item[1];
      const tempArr = [];
      for (var i = 0; i < arrayOfModules.length; i++) {
        tempArr.push({
          moduleName: arrayOfModules[i].moduleName,
          TargetGrade: arrayOfModules[i].TargetGrade,
          NumMcs: "4",
          key: parseInt(arrayOfModules[i].key),
        });
      }
      setDataArray(tempArr);
    }
  }, [route.params?.item[0], route.params?.item[1]]);
  // const demoArray = [
  //   { moduleName: "CS1101S", TargetGrade: "A", NumMcs: "4", index: 0 },
  //   { moduleName: "CS1231S", TargetGrade: "A", NumMcs: "4", index: 1 },
  //   { moduleName: "MA1101R", TargetGrade: "A-", NumMcs: "4", index: 2 },
  //   { moduleName: "MA1521", TargetGrade: "B+", NumMcs: "4", index: 3 },
  //   { moduleName: "GES1021", TargetGrade: "B", NumMcs: "4", index: 4 },
  //   { moduleName: "GER1000H", TargetGrade: "B-", NumMcs: "4", index: 5 },
  //   { moduleName: "ST1131", TargetGrade: "C+", NumMcs: "4", index: 6 },
  // ];
  const colorArray = [
    { top: "#fff2ab", btm: "#fff7d1", pin: "#EB0000" },
    { top: "#ffcce5", btm: "#ffe4f1", pin: "#EE82EE" },
    { top: "#cde9ff", btm: "#e2f1ff", pin: "#000080" },
    { top: "#e7cfff", btm: "#f2e6ff", pin: "#FF00FF" },
    { top: "#cbf1c4", btm: "#e4f9e0", pin: "brown" },
  ];
  //list-outline
  const MenuIcon = () => (
    <Icon
      fill="#232323"
      width={30}
      height={30}
      name="list-outline"
      onPress={toggleMenu}
      style={{ right: 15, bottom: 10 }}
    />
  );
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const [menuVisible, setMenuVisible] = useState(false);
  const dropDownList = () => {
    return (
      <OverflowMenu
        visible={menuVisible}
        anchor={MenuIcon}
        onBackdropPress={toggleMenu}
        style={{ right: 15, bottom: 10 }}
      >
        <MenuItem
          title={"Home"}
          onPress={() => {
            toggleMenu();
            navigation.navigate("Content Page");
          }}
          activeOpacity={0.9}
        />
        <MenuItem
          title={"Plans"}
          onPress={() => {
            toggleMenu();
            navigation.navigate(route.params?.item[2].toString());
          }}
          activeOpacity={0.9}
        />
        <MenuItem
          title={"Edit"}
          onPress={() => {
            toggleMenu();
            console.log("LOL");
          }}
          activeOpacity={0.9}
        />
      </OverflowMenu>
    );
  };
  const Header = () => {
    return (
      <View style={styles.headerDesign}>
        <View style={{ ...styles.hundredCenter, flex: 1 }}>
          {dropDownList()}
        </View>
        <View style={{ ...styles.hundredCenter, flex: 2 }}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
        <View style={{ ...styles.hundredCenter, flex: 1 }}>
          <Text
            style={{ bottom: 12, ...globalFontStyles.NB_14, color: "#007AFF" }}
          >
            Submit
          </Text>
        </View>
      </View>
    );
  };

  const StickyPad = (moduleName, TargetGrade, NumMcs, key) => {
    return (
      <View
        style={{
          ...styles.stickPadContainer,
          backgroundColor: colorArray[key % 5].btm,
        }}
      >
        <View
          style={{
            ...styles.oneCenter,
            backgroundColor: colorArray[key % 5].top,
          }}
        >
          <EntypoIcon
            name="pin"
            size={20}
            color={colorArray[key % 5].pin}
            style={{ left: 10, bottom: 5 }}
          />
        </View>
        <View style={{ flex: 5, flexDirection: "column" }}>
          <View
            style={{
              ...styles.twoStart,
              backgroundColor: colorArray[key % 5].btm,
            }}
          >
            <Text
              style={{
                left: 15,
                ...globalFontStyles.NB_15,
                color: "#4a4e5d",
              }}
            >{`Module: ${moduleName}`}</Text>
          </View>
          <View
            style={{
              ...styles.twoStart,
              backgroundColor: colorArray[key % 5].btm,
            }}
          >
            <Text
              style={{ left: 15, ...globalFontStyles.NB_15, color: "#4a4e5d" }}
            >{`Target grade: ${TargetGrade}`}</Text>
          </View>
          <View
            style={{
              ...styles.twoStart,
              backgroundColor: colorArray[key % 5].btm,
            }}
          >
            <Text
              style={{ left: 15, ...globalFontStyles.NB_15, color: "#4a4e5d" }}
            >{`MCs: ${NumMcs}`}</Text>
          </View>
          <View
            style={{
              ...styles.oneCenter,
              backgroundColor: colorArray[key % 5].btm,
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      {Header()}
      <View style={{ ...styles.oneCenter, backgroundColor: "transparent" }}>
        <View
          style={{
            ...styles.container,
            bottom: heightToAdjust,
            overflow: "hidden",
          }}
        >
          <View style={styles.headerAtPlan}>
            <Text style={{ ...globalFontStyles.NB_24, color: "#FFF8DC" }}>
              My Plans
            </Text>
            <View style={styles.lineAtPlan} />
          </View>

          <View style={{ flex: 12, flexDirection: "row" }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
              numColumns={2}
              data={dataArray}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) =>
                StickyPad(
                  item.moduleName,
                  item.TargetGrade,
                  item.NumMcs,
                  item.key
                )
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ViewPlan;

const styles = StyleSheet.create({
  container: {
    height: 0.86 * height,
    width: 0.95 * width,
    borderRadius: 20,
    backgroundColor: "#DEB887",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  oneCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hundredCenter: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  headerText: {
    bottom: 10,
    ...globalFontStyles.NB_20,
    color: "#232323",
  },
  headerDesign: {
    width: width,
    height: 0.11 * height,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.3,
    backgroundColor: "#f9f9f9",
  },
  lineAtPlan: {
    width: 0.85 * width,
    height: 0.002 * height,
    borderRadius: 60,
    backgroundColor: "#FFF8DC",
  },
  headerAtPlan: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  stickPadContainer: {
    width: width * 0.435,
    height: 0.2 * height,
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginVertical: 10,
    marginHorizontal: 0.02 * width,
  },
  twoStart: {
    flex: 2,
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
