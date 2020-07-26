import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { globalFontStyles } from "../../../Component/GlobalFont";
import FirebaseDB from "../../../FirebaseDB";
import { Icon } from "react-native-eva-icons";
import { FlatList } from "react-native-gesture-handler";
import BottomBar from "../../../Component/BottomBar";
import Modal from "react-native-modalbox";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const EditRecords = ({ navigation, route }) => {
  const [type, setType] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [newMc, setNewMc] = useState(0);
  const [numReq, setNumReq] = useState("");
  const [alertText1, set1] = useState(false);
  const [alertText2, set2] = useState(false);
  const [alertText3, set3] = useState(false);
  const [num, setNum] = useState(0);

  const fb = FirebaseDB.firestore();
  const userID = FirebaseDB.auth().currentUser.uid;
  const focusAreaRef = fb.collection("focusArea").doc(userID);

  useEffect(() => {
    const unsub = focusAreaRef.onSnapshot(
      (document) => {
        const arr = document.data().cat;
        setType(arr);
        setNum(arr.length);
      },
      (error) => alert(error)
    );
    return () => unsub();
  }, [route.params?.type]);

  const colors = [
    "#5EDCC2",
    "#4ABBEE",
    "#5E77DC",
    "#765EDC",
    "#BB5EDC",
    "#DC5E9D",
    "#A47777",
    "#E19797",
    "#20A87F",
    "#FF6F66",
  ];

  const content = (item) => {
    const numPrimaries =
      item.Primaries.numRequired !== undefined
        ? item.Primaries.numRequired
        : "nil";
    const numElectives =
      item.Electives.numRequired !== undefined
        ? item.Electives.numRequired
        : "nil";

    const choice = (question, current, index) => (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Text style={{ ...globalFontStyles.NB_15, color: "#232323" }}>
          {question}
        </Text>
        <View
          style={{
            marginLeft: 10,
            marginTop: 1,
            borderBottomColor: "#B5B5B5",
            borderBottomWidth: 0.5,
          }}
        >
          <TextInput
            keyboardType="numeric"
            onChangeText={(val) => {
              if (val === "" || val === "nil") {
                delete type[item.key - 1][index].numRequired;
              } else {
                const nextNum = parseInt(val);
                type[item.key - 1][index].numRequired = nextNum;
              }
            }}
            placeholder={current.toString()}
            style={{ textAlign: "center" }}
          />
        </View>
      </View>
    );

    return (
      <View style={styles.whitelayer}>
        {choice("Primaries required :", numPrimaries, "Primaries")}
        {choice("Electives required :", numElectives, "Electives")}
      </View>
    );
  };

  const holders = (item) => {
    const key = item.key;
    const name = item.name;

    return (
      <View style={{ ...styles.container }}>
        <View
          style={{
            ...styles.colorTop,
            backgroundColor: colors[(key - 1) % 8],
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              paddingRight: 10,
              paddingLeft: 15,
            }}
          >
            <Text
              style={{
                ...globalFontStyles.NBEB_17,
                color: "#F4F4F4",
                textAlign: "center",
              }}
            >
              {name}
            </Text>
            <Icon
              name="trash-2"
              width={30}
              height={17}
              fill="#F4F4F4"
              onPress={() => {
                const newArr = type.filter((x) => x.name !== name);
                setNum(num - 1);
                setType(newArr);
              }}
            />
          </View>
        </View>
        {content(item)}
      </View>
    );
  };

  const popUp = () => (
    <Modal
      style={styles.modalBox}
      isOpen={modalVisible}
      backdropPressToClose={false}
      coverScreen={true}
      onClosed={() => setModalVisible(false)}
      keyboardTopOffset={300}
      position="center"
    >
      <View
        style={{
          height: "88%",
        }}
      >
        <View
          style={{
            width: "90%",
            marginTop: 8,
            marginBottom: 15,
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              ...globalFontStyles.OSB_16,
              color: "#074285",
            }}
          >
            Create a focus area
          </Text>
          <View
            style={{
              marginTop: 4,
              width: "100%",
              borderBottomColor: "lightgrey",
              borderBottomWidth: 1,
            }}
          />
        </View>
        <View style={{ marginLeft: 15 }}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              marginBottom: 3,
            }}
          >
            <Text style={{ ...globalFontStyles.NB_15, color: "#232323" }}>
              Name
            </Text>
          </View>
          <View style={styles.modalInputBox}>
            <TextInput
              onChangeText={(val) => {
                setName(val);
              }}
              placeholder={"Name of focus area"}
              autoCapitalize="words"
              style={{ textAlign: "left", marginLeft: 5 }}
            />
          </View>
          <View style={{ height: 25, marginTop: 5, marginBottom: 10 }}>
            {alertText1 ? (
              <Text
                style={{
                  ...globalFontStyles.NB_12,
                  color: "#cc0000",
                }}
              >
                Please enter a text
              </Text>
            ) : null}
          </View>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              marginBottom: 3,
            }}
          >
            <Text style={{ ...globalFontStyles.NB_15, color: "#232323" }}>
              Primaries required
            </Text>
          </View>
          <View style={styles.modalInputBox}>
            <TextInput
              keyboardType="numeric"
              onChangeText={(val) => {
                setNewMc(parseInt(val));
              }}
              placeholder={"1 - 40"}
              style={{ textAlign: "left", marginLeft: 5 }}
            />
          </View>
          <View style={{ height: 25, marginTop: 5, marginBottom: 10 }}>
            {alertText2 ? (
              <Text
                style={{
                  ...globalFontStyles.NB_12,
                  color: "#cc0000",
                }}
              >
                Input should be a valid number
              </Text>
            ) : null}
          </View>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              marginBottom: 3,
            }}
          >
            <Text style={{ ...globalFontStyles.NB_15, color: "#232323" }}>
              Electives required
            </Text>
            <Text
              style={{
                ...globalFontStyles.OSR_13,
                color: "#CBCBCB",
                marginLeft: 5,
              }}
            >
              - optional field
            </Text>
          </View>
          <View style={styles.modalInputBox}>
            <TextInput
              keyboardType="numeric"
              onChangeText={(val) => {
                setNumReq(val);
              }}
              placeholder={"nil"}
              style={{ textAlign: "left", marginLeft: 5 }}
            />
          </View>
          <View style={{ height: 25, marginTop: 5 }}>
            {alertText3 ? (
              <Text
                style={{
                  ...globalFontStyles.NB_12,
                  color: "#cc0000",
                }}
              >
                Input should be empty or a valid number
              </Text>
            ) : null}
          </View>
        </View>
      </View>
      <View style={{ height: "12%" }}>
        <View
          style={{
            flex: 1,
            borderTopWidth: 1,
            borderColor: "#D0CECE",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              // reset all strings and alerts
              set1(false);
              set2(false);
              set3(false);
              setName("");
              setNewMc(0);
              setNumReq("");
            }}
            activeOpacity={0.9}
            style={{
              ...styles.flexOneCenter,
              borderRightWidth: 1,
              borderColor: "#D0CECE",
            }}
          >
            <Text style={{ ...globalFontStyles.NB_14, color: "#007AFF" }}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              let succeed = true;
              if (name === "") {
                succeed = false;
                set1(true);
              } else {
                set1(false);
              }
              if (!isNaN(newMc) && newMc > 0) {
                set2(false);
              } else {
                succeed = false;
                set2(true);
              }
              const numAfter = parseInt(numReq);
              // Allowing for either zero or empty string
              if (
                numReq === "" ||
                numReq === "nil" ||
                (!isNaN(numAfter) && numAfter > 0)
              ) {
                set3(false);
              } else {
                succeed = false;
                set3(true);
              }
              if (succeed) {
                // update type array
                let newArr = type.slice(0);
                const newKey = newArr.length + 1;
                // Primaries
                if (numReq === "" || numAfter === 0) {
                  newArr.push({
                    key: newKey,
                    numRequired: newMc,
                    name: name,
                    Primaries: {
                      modules: [],
                      name: "Primaries",
                      numRequired: newMc,
                    },
                    Prereq: {
                      modules: [],
                      name: "Prereq",
                    },
                    Electives: {
                      modules: [],
                      name: "Electives",
                    },
                  });
                  // Electives
                } else {
                  newArr.push({
                    key: newKey,
                    numRequired: newMc,
                    name: name,
                    Primaries: {
                      modules: [],
                      name: "Primaries",
                      numRequired: newMc,
                    },
                    Prereq: {
                      modules: [],
                      name: "Prereq",
                    },
                    Electives: {
                      modules: [],
                      name: "Electives",
                      numRequired: numAfter,
                    },
                  });
                }
                setType(newArr);
                setModalVisible(false);
                set1(false);
                set2(false);
                set3(false);
                setName("");
                setNewMc(0);
                setNumReq("");
                setNum(num + 1);
              }
            }}
            activeOpacity={0.9}
            style={{
              ...styles.flexOneCenter,
            }}
          >
            <Text style={{ ...globalFontStyles.NB_14, color: "#007AFF" }}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <>
      {/* ---------------- HEADER---------------- */}
      <View style={styles.topPortion}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.9}
          style={styles.headerLeft}
        >
          <Text style={{ ...globalFontStyles.NB_14, color: "#232323" }}>
            Cancel
          </Text>
        </TouchableOpacity>
        <View style={styles.headerMiddle}>
          <Text style={{ ...globalFontStyles.NB_17, color: "#232323" }}>
            Edit Focus Area
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            let cont = true;
            for (let i = 0; i < type.length; i++) {
              if (type[i].Primaries.numRequired !== undefined) {
                if (
                  isNaN(type[i].Primaries.numRequired) ||
                  type[i].Primaries.numRequired <= 0
                ) {
                  cont = false;
                  Alert.alert(
                    "Error",
                    `Input should be empty or a valid number for ${type[i].name}'s primaries required`,
                    [
                      {
                        text: "OK",
                      },
                    ],
                    { cancelable: false }
                  );
                  break;
                }
              }
              if (type[i].Electives.numRequired !== undefined) {
                if (
                  isNaN(type[i].Electives.numRequired) ||
                  type[i].Electives.numRequired <= 0
                ) {
                  cont = false;
                  Alert.alert(
                    "Error",
                    `Input should be empty or a valid number for ${type[i].name}'s electives required`,
                    [
                      {
                        text: "OK",
                      },
                    ],
                    { cancelable: false }
                  );
                  break;
                }
              }
            }
            if (cont) {
              let typeObj = type;
              for (let i = 0; i < typeObj.length; i++) {
                typeObj[i].key = i + 1;
              }
              focusAreaRef.set({ cat: typeObj });
              navigation.navigate("Focus");
            }
          }}
          activeOpacity={0.9}
          style={styles.headerRight}
        >
          <Text style={{ ...globalFontStyles.NB_14, color: "#007AFF" }}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
      {popUp()}
      {/* ----------------- ALL FOCUS AREAS ------------------------------- */}
      <FlatList
        data={type}
        keyExtractor={(item) => item.name.toString()}
        renderItem={({ item }) => holders(item)}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 95 }} />}
      />
      <BottomBar
        leftText={`Focus areas: ${num}`}
        leftTextSize={16}
        rightText={"Add a focus area"}
        clearAll={() => null}
        opacity={1}
        size={140}
        transition={() => setModalVisible(true)}
      />
    </>
  );
};

export default EditRecords;

const styles = StyleSheet.create({
  topPortion: {
    height: 0.11 * height,
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
  container: {
    width: width * 0.88,
    height: 165,
    marginTop: 18,
    marginBottom: 6,
    alignSelf: "center",
    borderRadius: 20,
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
  colorTop: {
    flexDirection: "row",
    width: "100%",
    height: "32%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  whitelayer: {
    height: "68%",
    width: "100%",
    paddingLeft: 10,
  },
  modalBox: {
    backgroundColor: "white",
    width: 300,
    height: 440,
    borderRadius: 30,
  },
  modalInputBox: {
    marginTop: 6,
    borderColor: "#B5B5B5",
    height: 40,
    borderWidth: 0.8,
    borderRadius: 5,
    width: "70%",
    justifyContent: "center",
  },
  flexOneCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
