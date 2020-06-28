import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  interpolate,
  FlatList,
  ImageBackground,
} from "react-native";
import { globalFontStyles } from "../../../../Component/GlobalFont";
import AnimatedBottomBar from "./AnimatedBottomBar";
import ModuleTemplate from "./ModuleTemplate";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const AddPlan = ({ route }) => {
  React.useEffect(() => {
    if (route.params?.item) {
      setPlanName(route.params?.item[0]);
    }
    // if (route.params?.mods) {
    //   console.log("ANY");
    //   const array = Array.from(route.params?.mods);
    //   let i = data.length;
    //   let newArr = array.map((module) => {
    //     const code = module.name.substring(0, 7);
    //     i++;
    //     return { key: i, clash: false, moduleName: code, TargetGrade: "" };
    //   });
    //   setData([...data, newArr]);
    // }
  });
  const [planNameValue, setPlanName] = useState("Plan 1");
  const navigation = useNavigation();
  const Header = () => (
    <View style={styles.headerDesign}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(CommonActions.goBack())}
        style={styles.flexOneCenterFlexEnd}
        activeOpacity={0.9}
      >
        <Text
          style={{ bottom: 10, ...globalFontStyles.NB_14, color: "#232323" }}
        >
          Cancel
        </Text>
      </TouchableOpacity>
      <View style={{ ...styles.flexThreeCenterFlexEnd }}>
        <Text style={{ bottom: 10, ...globalFontStyles.NB_20, color: "black" }}>
          {planNameValue}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("ViewPlan")}
        style={styles.flexOneCenterFlexEnd}
        activeOpacity={0.9}
      >
        <Text
          style={{ bottom: 10, ...globalFontStyles.NB_14, color: "#232323" }}
        >
          Done
        </Text>
      </TouchableOpacity>
    </View>
  );
  // -----------------------------------------------------------------------------------------------------
  const data = [
    { key: "1", clash: true, moduleName: "CS1101S", TargetGrade: "A+" },
    { key: "2", clash: false, moduleName: "CS1231S", TargetGrade: "A" },
    { key: "3", clash: false, moduleName: "MA1101R", TargetGrade: "A-" },
    { key: "4", clash: false, moduleName: "MA1521", TargetGrade: "B+" },
    { key: "5", clash: true, moduleName: "GER1000H", TargetGrade: "B" },
    { key: "6", clash: false, moduleName: "ST1131", TargetGrade: "A+" },
  ];

  let transition = new Animated.Value(0);
  let translateY = transition.interpolate({
    inputRange: [0, 1],
    outputRange: [-60, 300],
    extrapolate: "clamp",
  });

  return (
    <>
      {Header()}
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          data={data}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <ModuleTemplate
              {...{
                clash: item.clash,
                moduleName: item.moduleName,
                TargetGrade: item.TargetGrade,
              }}
            />
          )}
          onScroll={(event) => {
            transition.setValue(event.nativeEvent.contentOffset.y);
          }}
        />
      </View>
      <AnimatedBottomBar translateY={translateY}></AnimatedBottomBar>
    </>
  );
};

export default AddPlan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  headerDesign: {
    height: 0.11 * height,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
  },
  flexOneCenterFlexEnd: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  flexThreeCenterFlexEnd: {
    flex: 3,
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
