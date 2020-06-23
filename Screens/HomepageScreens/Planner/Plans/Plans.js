import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../../../../Component/Header";
import Icons from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import { Icon } from "react-native-eva-icons";
import { globalFontStyles } from "../../../../Component/GlobalFont";
import SignInButton from "../../../../Component/SignInButton";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").width;
const colorArray = [
  ["#ffafb0", "#ee9ca7"],
  ["#ffafbd", "#ffc3a0"],
  ["#ffb88c", "#de6262"],
  ["#eb3349", "#f45c43"],
  ["#dd5e89", "#f7bb97"],
];
function RectInfoSelected({ id, selected, onSelect, colorStyle, navChange }) {
  return (
    <TouchableOpacity
      style={styles.boxStyle}
      activeOpacity={0.9}
      onPress={() => {
        onSelect(id);
        navChange();
      }}
    >
      <LinearGradient style={{ flex: 1, borderRadius: 30 }} colors={colorStyle}>
        <View style={styles.boxDesign}>
          <Text style={{ ...globalFontStyles.OSR_12, color: "white" }}>
            {selected ? "Current" : ""}
          </Text>
        </View>
        <View style={{ flex: 7 }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                ...globalFontStyles.OSSB_19,
                left: 20,
                color: "white",
              }}
            >
              Plan 1
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                ...globalFontStyles.OSSB_14,
                left: 20,
                color: "white",
              }}
            >
              Semester Cap:
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                ...globalFontStyles.OSSB_14,
                left: 20,
                color: "white",
              }}
            >
              Overall Cap:
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                ...globalFontStyles.OSSB_14,
                left: 20,
                color: "white",
              }}
            >
              MCs:
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                ...globalFontStyles.OSSB_14,
                left: 20,
                color: "white",
              }}
            >
              Last Updated:
            </Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const Plans = (props) => {
  const navigation = useNavigation();
  const [selected, setSelected] = React.useState(new Map());

  const onSelect = React.useCallback(
    (key) => {
      const newSelected = new Map();
      newSelected.set(key, !selected.get(key));
      setSelected(newSelected);
    },
    [selected]
  );

  const data = [
    { key: "1", value: true },
    { key: "2", value: false },
    { key: "3", value: false },
    { key: "4", value: false },
  ]; // demo

  const plansArray = []; // this is the arrays of plan
  const [navigationID, setNavigationID] = useState("1"); // selecting of plans
  const navChange = (val) => {
    if (val === navigationID) {
      setNavigationID("");
    } else {
      setNavigationID(val);
    }
  };

  return (
    <>
      <Header
        str={props.headerTitle}
        leftChildren={
          <Icons
            name="arrow-left"
            size={21}
            style={{ color: "#3E3E3E", right: 0.02 * width }}
            onPress={() => navigation.dispatch(CommonActions.goBack())}
          />
        }
      />
      <View style={{ flex: 6, backgroundColor: "white" }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(item) => item.key}
          extraData={selected}
          renderItem={({ item }) => (
            <RectInfoSelected
              id={item.key}
              selected={!!selected.get(item.key)}
              onSelect={onSelect}
              colorStyle={colorArray[(parseInt(item.key) - 1) % 5]}
              navChange={() => navChange(parseInt(item.key))}
            />
          )}
        />
      </View>
      <View style={styles.btmPart}>
        <View style={{ flex: 1 }} />
        <View style={styles.btmMidPart}>
          <SignInButton>
            <Text style={{ ...globalFontStyles.OSSB_17, color: "white" }}>
              Enter
            </Text>
          </SignInButton>
        </View>
        <TouchableOpacity style={styles.btmRightPart}>
          <Icon name="plus-circle" width={60} height={60} fill={"#FB5581"} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Plans;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  boxStyle: {
    width: 0.9 * width,
    height: 0.45 * height,
    backgroundColor: "white",
    alignSelf: "center",
    margin: 15,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  boxDesign: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "center",
    alignItems: "flex-end",
    right: 0.07 * width,
    top: 0.015 * height,
  },
  btmPart: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: "white",
  },
  btmMidPart: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
    bottom: 10,
  },
  btmRightPart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    right: 0.03 * width,
    bottom: 10,
  },
});
