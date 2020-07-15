import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import Header from "../../../Component/Header";
import { globalFontStyles } from "../../../Component/GlobalFont";
import FirebaseDB from "../../../FirebaseDB";
import EditButton from "../../../Component/EditButton";
import AddModuleButton from "../../../Component/AddModuleButton";
import FullViewHeader from "../../../Component/FullViewHeader";
import { Icon } from "react-native-eva-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const EachFocusArea = ({ navigation, route }) => {
  const fb = FirebaseDB.firestore();
  const userID = FirebaseDB.auth().currentUser.uid;
  const [arr, setArr] = useState([]);
  const [editMode, setEdit] = useState(false);

  useEffect(() => {
    if (route.params?.name) {
      setArr(route.params?.arr);
    } else {
    }
  }, []);

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
          <View style={{ width: "57%" }}>
            <Text
              numberOfLines={1}
              style={{
                ...globalFontStyles.OSSB_12,
                color: "#232323",
              }}
            >
              {item.name}
            </Text>
          </View>
          <Text
            style={{
              ...globalFontStyles.OSSB_12,
              color: "#232323",
            }}
          >
            {item.grade}
          </Text>
          <Text style={{ ...globalFontStyles.OSSB_12, color: "#232323" }}>
            {item.sem}
          </Text>
        </View>
      );

      const holders2 = (item) => (
        <View style={styles.moduleText}>
          <View style={{ width: "57%" }}>
            <Text
              numberOfLines={1}
              style={{
                ...globalFontStyles.OSSB_12,
                color: "#68686880",
              }}
            >
              {item.name}
            </Text>
          </View>
        </View>
      );

      const edit = () => {
        if (current.name === "Prereq") {
          if (editMode) {
            return (
              <AddModuleButton
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
              width: "23%",
              borderRightColor: "lightgrey",
              borderRightWidth: 0.7,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              textBreakStrategy="simple"
              numberOfLines={2}
              style={{
                ...globalFontStyles.OSSB_11,
                color: "#232323",
                textAlign: "center",
              }}
            >
              {current.name}
            </Text>
          </View>
          <View style={{ flexDirection: "column", width: "77%" }}>
            <FlatList
              data={taken.concat(current.notTaken)}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) =>
                item.grade !== undefined ? holders(item) : holders2(item)
              }
            />
            {edit()}
          </View>
        </View>
      );
    };

    return (
      <FlatList
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
          <Icon
            name={editMode ? "close-outline" : "chevron-left-outline"}
            width={100}
            height={30}
            fill="#232323"
            onPress={() =>
              editMode ? setEdit(!editMode) : navigation.goBack()
            }
          />
        }
        rightChildren={<Text>Tree?</Text>}
      />
      <FullViewHeader />
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
    width: width * 0.9,
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
  },
});
