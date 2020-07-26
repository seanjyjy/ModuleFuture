import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import Header from "../../../Component/Header";
import { Icon } from "react-native-eva-icons";
import { globalFontStyles } from "../../../Component/GlobalFont";
import EditButton from "../../../Component/EditButton";
import AddModuleButton from "../../../Component/AddModuleButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import FirebaseDB from "../../../FirebaseDB";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const hairlineWidth = StyleSheet.hairlineWidth;

const TypePage = ({ navigation, route }) => {
  useEffect(() => {
    if (route.params?.from === "Records" && route.params?.taken) {
      const toMatch = route.params?.title;
      const takenAll = route.params?.taken;
      const notTakenAll = route.params?.notTaken;
      const tempArr1 = takenAll.filter((x) => x.type === toMatch);
      const tempArr2 = notTakenAll.filter((x) => x.type === toMatch);
      setTaken(tempArr1);
      setNotTaken(tempArr2);
      setOrigNotTaken(tempArr2);
      setMcs(route.params?.mcsRequired);
    }
    if (route.params?.from === "AddModule" && route.params?.modDetails) {
      const newArr = route.params?.modDetails;
      const temp = notTaken.slice(0);
      const currSet = new Set(toAdd);
      for (let i = 0; i < newArr.length; i++) {
        const newMod = {
          code: newArr[i].code,
          codePrefix: newArr[i].codePrefix,
          level: newArr[i].Level,
          name: newArr[i].name,
          numMcs: newArr[i].MC,
          type: title,
        };
        temp.push(newMod);
        currSet.add(newMod);
      }
      setAdd(currSet);
      setNotTaken(temp);
    }
  }, [route.params?.taken, route.params?.modDetails]);

  const [editMode, setEdit] = useState(false);
  const [title, setTitle] = useState(route.params?.title);
  const [taken, setTaken] = useState([]);
  const [notTaken, setNotTaken] = useState([]);
  const [toAdd, setAdd] = useState(new Set());
  const [toDel, setDel] = useState(new Set());
  const [origNotTaken, setOrigNotTaken] = useState([]);
  const [mcs, setMcs] = useState();

  const holders = (item) => (
    <View style={styles.headerText}>
      <View style={{ width: width * 0.52 }}>
        <Text
          numberOfLines={1}
          style={{
            ...globalFontStyles.OSSB_14,
            color: "#232323",
          }}
        >
          {item.name}
        </Text>
      </View>
      <Text
        style={{
          ...globalFontStyles.OSSB_14,
          color: "#232323",
        }}
      >
        {item.grade}
      </Text>
      <Text style={{ ...globalFontStyles.OSSB_14, color: "#232323" }}>
        {item.sem}
      </Text>
    </View>
  );

  const holders2 = (item) => (
    <View style={styles.headerText}>
      <View style={{ width: width * 0.52 }}>
        <Text
          numberOfLines={1}
          style={{
            ...globalFontStyles.OSSB_14,
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
          height={17}
          fill="#232323"
          onPress={() => {
            const newList = notTaken.filter((x) => x.code !== item.code);
            toAdd.delete(item);
            toDel.add(item);
            setNotTaken(newList);
          }}
        />
      ) : null}
    </View>
  );

  const amtLeft = () => {
    let amt = 0;
    for (let i = 0; i < taken.length; i++) {
      amt += taken[i].numMcs;
    }
    for (let i = 0; i < notTaken.length; i++) {
      amt += notTaken[i].numMcs;
    }
    const ret = mcs - amt;
    return ret > 0 ? ret : 0;
  };

  const Box = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            width: width * 0.71,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ ...globalFontStyles.OSB_16, color: "#232323" }}>
            Module
          </Text>
          <Text
            style={{
              ...globalFontStyles.OSB_16,
              color: "#232323",
            }}
          >
            Grade
          </Text>
        </View>
        <Text style={{ ...globalFontStyles.OSB_16, color: "#232323" }}>
          Sem
        </Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={taken.concat(notTaken)}
        extraData={notTaken}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) =>
          item.grade !== undefined ? holders(item) : holders2(item)
        }
      />
      <View style={{ marginTop: 10 }}>
        {editMode ? (
          <AddModuleButton
            size={45}
            func={() =>
              navigation.navigate("AddModule", {
                item: "TypePage",
                modulesPlanned: taken.concat(notTaken),
              })
            }
          />
        ) : (
          <EditButton func={() => setEdit(!editMode)} />
        )}
        <Text
          style={{
            ...globalFontStyles.OSSB_13,
            color: "#232323",
            marginTop: 5,
            marginBottom: 10,
            alignSelf: "center",
          }}
        >
          {`You currently have ${amtLeft()} MCs left to plan`}
        </Text>
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      width: width * 0.9,
      height: Math.min(
        height * 0.88,
        (taken.length + notTaken.length) * 38 + 140
      ),
      alignSelf: "center",
      marginTop: 18,
      borderRadius: 14,
      borderColor: "#A0A0A0",
      borderWidth: hairlineWidth,
      justifyContent: "space-between",
      alignContent: "stretch",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
      flexDirection: "column",
      backgroundColor: "white",
    },
    header: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
      borderBottomColor: "#A0A0A0",
      borderBottomWidth: hairlineWidth,
    },
    headerText: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      paddingTop: 15,
      paddingBottom: 5,
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <Header
        str={title}
        leftChildren={
          <Ionicons
            name={editMode ? "md-close" : "md-arrow-round-back"}
            size={25}
            style={{ color: "#232323" }}
            onPress={() => {
              // Close
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
                setEdit(!editMode);
                if (toAdd.size > 0 || toDel.size > 0) {
                  setOrigNotTaken(notTaken);
                  const arrToAdd = Array.from(toAdd);
                  const arrToDel = Array.from(toDel);
                  const fb = FirebaseDB.firestore();
                  const userID = FirebaseDB.auth().currentUser.uid;
                  const recordsRef = fb.collection("records").doc(userID);
                  const moduleMappingRef = fb
                    .collection("modulesMapping")
                    .doc(userID);
                  recordsRef.get().then((document) => {
                    let currNotTaken = document.data().notTaken;
                    currNotTaken = currNotTaken.concat(arrToAdd);
                    for (const mod of arrToDel) {
                      currNotTaken = currNotTaken.filter(
                        (x) => x.code !== mod.code
                      );
                    }
                    recordsRef.update({
                      notTaken: currNotTaken.sort((a, b) => {
                        if (a.code < b.code) {
                          return -1;
                        } else {
                          return 1;
                        }
                      }),
                    });
                  });
                  moduleMappingRef.get().then((document) => {
                    const current = document.data();
                    for (const mod of arrToAdd) {
                      current[mod.code] = mod.type;
                    }
                    for (const mod of arrToDel) {
                      delete current[mod.code];
                    }
                    moduleMappingRef.set(current);
                  });
                }
              }}
              style={{ ...globalFontStyles.NB_14, color: "#007AFF" }}
            >
              Save
            </Text>
          ) : null
        }
      />
      <Box />
    </View>
  );
};

export default TypePage;
