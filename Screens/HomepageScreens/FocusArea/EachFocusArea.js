import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Dimensions, FlatList } from "react-native";
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
  const [arr, setArr] = useState([]);
  const [editMode, setEdit] = useState(false);
  const [index, setIndex] = useState();
  const [origNotTaken, setOrigNotTaken] = useState([]);
  const [taken, setTaken] = useState([]);
  const [notTaken, setNotTaken] = useState([]);

  useEffect(() => {
    if (route.params?.from === "FocusArea" && route.params?.name) {
      setTaken(route.params?.taken);
      setNotTaken(route.params?.notTaken);
      setOrigNotTaken(route.params?.notTaken);
      setArr(route.params?.arr);
      setIndex(route.params?.index);
    }
    if (route.params?.from === "AddModule" && route.params?.modDetails) {
      const newArr = route.params?.modDetails;
      const temp = notTaken.slice(0);
      for (let i = 0; i < newArr.length; i++) {
        temp.push({
          code: newArr[i].code,
          name: newArr[i].name,
        });
      }
      setNotTaken(temp);
    }
  }, [route.params?.name, route.params?.modDetails]);

  const FullView = () => {
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

    const IndividualBox = (current) => {
      const lastItem = current.name === "Electives";

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
        </View>
      );

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
              data={current.taken.concat(current.notTaken)}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) =>
                item.grade !== undefined ? holders(item) : holders2(item)
              }
            />
          </View>
        </View>
      );
    };

    const holdersPrereq = (item) => (
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
        {editMode ? (
          <Icon
            name="trash-2-outline"
            width={30}
            height={15}
            fill="#232323"
            onPress={() => {
              const temp = notTaken.filter((x) => x.code !== item.code);
              setNotTaken(temp);
            }}
          />
        ) : null}
      </View>
    );

    const edit = () => {
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
    };

    const firstBox = () => (
      <View
        style={{
          ...styles.innerFlatList,
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
            Prereq
          </Text>
        </View>
        <View style={{ flexDirection: "column", width: "80%" }}>
          <FlatList
            data={taken.concat(notTaken)}
            keyExtractor={(item) => item.code}
            extraData={notTaken}
            renderItem={({ item }) =>
              item.grade !== undefined ? holders(item) : holdersPrereq(item)
            }
          />
          <View style={{ marginTop: 8 }}>{edit()}</View>
        </View>
      </View>
    );

    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.fullBox}
        ListHeaderComponent={firstBox()}
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
                setNotTaken(origNotTaken);
                setEdit(false);
              } else {
                navigation.goBack();
              }
            }}
          />
        }
        rightChildren={
          editMode ? (
            <Text
              onPress={() => {
                setOrigNotTaken(notTaken);
                setEdit(false);
                const fb = FirebaseDB.firestore();
                const userID = FirebaseDB.auth().currentUser.uid;
                const focusAreaRef = fb.collection("focusArea").doc(userID);
                focusAreaRef.get().then((document) => {
                  const current = document.data();
                  current.cat[index].Prereq.modules = taken.concat(notTaken);
                  focusAreaRef.set(current);
                });
              }}
              style={{ ...globalFontStyles.NB_14, color: "#007AFF" }}
            >
              Save
            </Text>
          ) : null
        }
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
