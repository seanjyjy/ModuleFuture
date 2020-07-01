import React, { useState, useEffect } from "react";
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
import FirebaseDB from "../../../../FirebaseDB";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const AddPlan = ({ route }) => {
  const [planNameValue, setPlanName] = useState("Plan 1");
  const [size, setSize] = useState(0);
  const [docLoc, setDocLoc] = useState("");
  const [data, setData] = useState([]); // might need to use async storage?

  const deleteItem = (modName) => {
    setData((newData) => {
      return newData.filter((todo) => todo.moduleName !== modName);
    });
  };

  useEffect(() => {
    if (route.params?.item) {
      setPlanName(route.params?.item[0]);
      setSize(route.params?.item[2]);
      setDocLoc(route.params?.item[1]);
    }
    if (route.params?.modDetails) {
      const tempArr = [];
      for (let i = 0; i < data.length; i++) {
        tempArr.push(data[i]);
      }
      let keyTobe = data.length;
      const receivedArr = route.params?.modDetails[0];
      for (let i = 0; i < route.params?.modDetails[1]; i++) {
        tempArr.push({
          key: keyTobe.toString(),
          clash: false,
          moduleName: receivedArr[i].code,
          TargetGrade: "",
          NumMcs: "4",
          FinalGrade: "",
        });
        keyTobe++;
      }
      setData(tempArr);
    }
    // if (route.params?.plansFromViewPlan) {
    //   setData(route.params?.plansFromViewPlan);
    // }
  }, [docLoc, route.params?.modDetails]);

  const navigation = useNavigation();
  const Header = () => (
    <View style={styles.headerDesign}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
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
        <Text
          style={{ bottom: 10, ...globalFontStyles.NB_20, color: "#232323" }}
        >
          {planNameValue}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          const plansArrayRef = FirebaseDB.firestore()
            .collection("plansArray")
            .doc(docLoc);
          plansArrayRef.update({
            yearSem: FirebaseDB.firestore.FieldValue.arrayUnion({
              key: (size + 1).toString(),
              nameOfPlan: route.params?.item[0],
            }),
          });
          const plansItself = FirebaseDB.firestore()
            .collection("plansItself")
            .doc(docLoc.concat("_", route.params?.item[0]));
          plansItself.set({
            nameOfPlan: route.params?.item[0],
            planInfo: data,
            fromWhere: route.params?.item[3],
          });
          navigation.navigate("ViewPlan", {
            item: [route.params?.item[0], data, route.params?.item[3]],
          });
        }}
        style={styles.flexOneCenterFlexEnd}
        activeOpacity={0.9}
      >
        <Text
          style={{ bottom: 10, ...globalFontStyles.NB_14, color: "#007AFF" }}
        >
          Done
        </Text>
      </TouchableOpacity>
    </View>
  );

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
            <ModuleTemplate dataObj={item} deleteMethod={deleteItem} />
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderBottomWidth: 1,
    borderColor: "#DDDDDD",
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
