import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
  ScrollView,
} from "react-native";
import Header from "../../../Component/Header";
import { globalFontStyles } from "../../../Component/GlobalFont";
import FirebaseDB from "../../../FirebaseDB";
import EditButton from "../../../Component/EditButton";
import AddModuleButton from "../../../Component/AddModuleButton";
import FullViewHeader from "../../../Component/FullViewHeader";
import { Icon } from "react-native-eva-icons";
import Ionicons from "react-native-vector-icons/Ionicons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const EachFocusArea = ({ navigation, route }) => {
  const fb = FirebaseDB.firestore();
  const userID = FirebaseDB.auth().currentUser.uid;
  const focusAreaRef = fb.collection("focusArea").doc(userID);

  const [arr, setArr] = useState([]);
  const [editMode, setEdit] = useState(false);
  const [index, setIndex] = useState();

  useEffect(() => {
    if (route.params?.name) {
      setArr(route.params?.arr);
      setIndex(route.params?.index);
    }
    if (route.params?.modDetails) {
      console.log(route.params?.modDetails);
      const newArr = route.params?.modDetails;
      const temp = arr;
      for (let i = 0; i < newArr.length; i++) {
        temp[0].notTaken.push({
          code: newArr[i].code,
          name: newArr[i].name,
        });
      }
      setArr(temp);
    }
  }, [route.params?.name, route.params?.modDetails]);

  const FullView = () => {
    const IndividualBox = (current) => {
      const lastItem = current.name === "Electives";

      const taken = current.taken.sort((a, b) => {
        if (a.sem < b.sem) {
          return -1;
        } else if (a.sem === b.sem) {
          if (a.code < b.code) {
            return -1;
          } else {
            return 1;
          }
        } else {
          return 1;
        }
      });

      const holders = (item) => (
        <View style={styles.moduleText}>
          <View style={{ width: "59%" }}>
            <Text
              numberOfLines={1}
              style={{
                ...globalFontStyles.OSSB_13,
                color: "#232323",
              }}
            >
              {item.name}
            </Text>
          </View>
          <Text
            style={{
              ...globalFontStyles.OSSB_13,
              color: "#232323",
            }}
          >
            {item.grade}
          </Text>
          <Text style={{ ...globalFontStyles.OSSB_13, color: "#232323" }}>
            {item.sem}
          </Text>
        </View>
      );

      const holders2 = (item) => (
        <View style={styles.moduleText}>
          <View style={{ width: "59%" }}>
            <Text
              numberOfLines={1}
              style={{
                ...globalFontStyles.OSSB_13,
                color: "#68686880",
              }}
            >
              {item.name}
            </Text>
          </View>
          {current.name === "Prereq" && editMode ? (
            <Icon
              name="trash-2-outline"
              width={30}
              height={15}
              fill="#232323"
              onPress={() => {
                arr[0].notTaken = arr[0].notTaken.filter(
                  (x) => x.code !== item.code
                );
                setArr(arr);
              }}
            />
          ) : null}
        </View>
      );

      const edit = () => {
        if (current.name === "Prereq") {
          if (editMode) {
            return (
              <AddModuleButton
                size={35}
                func={() =>
                  navigation.navigate("AddModule", { item: "EachFocusArea" })
                }
              />
            );
          } else {
            return <EditButton func={() => setEdit(!editMode)} />;
          }
        }
      };

      return (
        <View
          style={{
            ...styles.innerFlatList,
            borderBottomLeftRadius: lastItem ? 14 : 0,
            borderBottomRightRadius: lastItem ? 14 : 0,
          }}
        >
          <View
            style={{
              width: "20%",
              borderRightColor: "lightgrey",
              borderRightWidth: 0.7,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                ...globalFontStyles.OSSB_13,
                color: "#232323",
                textAlign: "center",
              }}
            >
              {current.name}
            </Text>
          </View>
          <View style={{ flexDirection: "column", width: "80%" }}>
            <FlatList
              data={taken.concat(current.notTaken)}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) =>
                item !== undefined && item.grade !== undefined
                  ? holders(item)
                  : holders2(item)
              }
            />
            <View style={{ marginTop: 8 }}>{edit()}</View>
          </View>
        </View>
      );
    };

    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.fullBox}
        ListFooterComponent={<View style={{ height: 35 }}></View>}
        data={arr}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => IndividualBox(item)}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        str={route.params?.name}
        leftChildren={
          <Ionicons
            name={editMode ? "md-close" : "md-arrow-round-back"}
            size={25}
            style={{ color: "#232323" }}
            onPress={() => {
              if (editMode) {
                focusAreaRef.get().then((document) => {
                  const current = document.data();
                  current.cat[index].Prereq.modules = arr[0].taken.concat(
                    arr[0].notTaken
                  );
                  focusAreaRef.set(current);
                });
              }
              editMode ? setEdit(!editMode) : navigation.goBack();
            }}
          />
        }
        rightChildren={<Text>Tree?</Text>}
      />
      <FullViewHeader fa={true} />
      <FullView />
    </View>
  );
};

export default EachFocusArea;

const styles = StyleSheet.create({
  moduleText: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  innerFlatList: {
    justifyContent: "space-between",
    alignContent: "stretch",
    flexDirection: "row",
    backgroundColor: "white",
    minHeight: 40,
    borderWidth: 0.7,
    borderTopWidth: 0,
    borderColor: "lightgrey",
  },
  fullBox: {
    width: width * 0.95,
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
  },
});
