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
  const [mcsPlanned, setMCsPlanned] = useState(0);
  const [totalMC, setTotalMC] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [newMc, setNewMc] = useState(0);
  const [numReq, setNumReq] = useState("");
  const [alertText1, set1] = useState(false);
  const [alertText2, set2] = useState(false);
  const [alertText3, set3] = useState(false);
  const [del, setDel] = useState(new Set());

  const fb = FirebaseDB.firestore();
  const userID = FirebaseDB.auth().currentUser.uid;
  const typeRef = fb.collection("typeArray").doc(userID);

  useEffect(() => {
    const unsub = typeRef.onSnapshot(
      (document) => {
        const data = document.data();
        setType(document.data().cat);
        let sum = 0;
        for (let i = 0; i < data.cat.length; i++) {
          sum += data.cat[i].mcsRequired;
        }
        setMCsPlanned(sum);
        const usersRef = fb.collection("users").doc(userID);
        usersRef.get().then((document) => {
          setTotalMC(document.data().totalMCs);
        });
      },
      (error) => alert(error)
    );
    return () => unsub();
  }, [route.params?.type]);

  const colors = [
    "#FFB584",
    "#FF6F66",
    "#8F9ED5",
    "#6CD5AF",
    "#DC5E9D",
    "#CE6F73",
    "#241161",
    "#6c2386",
  ];

  const theAlert = () => {
    Alert.alert(
      "Error",
      "Please fill in a valid number more than 0",
      [
        {
          text: "OK",
        },
      ],
      { cancelable: false }
    );
  };

  const content = (item) => {
    const mcsReq = item.mcsRequired;
    const numReq = item.numRequired !== undefined ? item.numRequired : "nil";

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
              if (index === "numRequired") {
                if (val === "" || val === "nil") {
                  delete type[item.key - 1][index];
                } else {
                  const nextNum = parseInt(val);
                  type[item.key - 1][index] = nextNum;
                }
              } else {
                const nextNum = parseInt(val);
                type[item.key - 1][index] = nextNum;
              }
            }}
            onEndEditing={(current) => {
              const val = current.nativeEvent.text;
              // if (index === "numRequired") {
              //   if (val === "" || val === "not specified") {
              //   } else {
              //     const nextNum = parseInt(val);
              //     if (isNaN(nextNum) || nextNum < 0) {
              //       theAlert();
              //     }
              //   }
              // } else {
              const nextNum = parseInt(val);
              if (isNaN(nextNum) || nextNum <= 0) {
                // if (val !== "") theAlert();
              } else {
                let sum = 0;
                for (const eachType of type) {
                  if (!isNaN(eachType.mcsRequired)) sum += eachType.mcsRequired;
                }
                setMCsPlanned(sum);
              }
              // }
            }}
            placeholder={current.toString()}
            style={{ textAlign: "center" }}
          />
        </View>
      </View>
    );

    return (
      <View style={styles.whitelayer}>
        {choice("MCs required :", mcsReq, "mcsRequired")}
        {choice("No. required :", numReq, "numRequired")}
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
            {item.canDelete !== undefined ? (
              <Icon
                name="trash-2"
                width={30}
                height={17}
                fill="#F4F4F4"
                onPress={() => {
                  const newArr = type.filter((x) => x.name !== name);
                  setMCsPlanned(mcsPlanned - item.mcsRequired);
                  del.add(name);
                  setType(newArr);
                }}
              />
            ) : null}
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
            Create a type
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
              placeholder={"Name of type"}
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
              MCs required
            </Text>
          </View>
          <View style={styles.modalInputBox}>
            <TextInput
              keyboardType="numeric"
              onChangeText={(val) => {
                setNewMc(parseInt(val));
              }}
              placeholder={"1 - 160"}
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
                Please enter a valid number
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
              No. required
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
                if (numReq === "" || numAfter === 0) {
                  newArr.push({
                    key: newKey,
                    mcsRequired: newMc,
                    name: name,
                    mcsTaken: 0,
                    mcsUsedInCap: 0,
                    numTaken: 0,
                    points: 0,
                    canDelete: true,
                  });
                } else {
                  newArr.push({
                    key: newKey,
                    mcsRequired: newMc,
                    numRequired: numAfter,
                    name: name,
                    mcsTaken: 0,
                    mcsUsedInCap: 0,
                    numTaken: 0,
                    points: 0,
                    canDelete: true,
                  });
                }
                del.delete(name);
                setType(newArr);
                setModalVisible(false);
                set1(false);
                set2(false);
                set3(false);
                setName("");
                setNewMc(0);
                setNumReq("");
                setMCsPlanned(mcsPlanned + newMc);
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
            Edit Types
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            let cont = true;
            for (let i = 0; i < type.length; i++) {
              if (isNaN(type[i].mcsRequired) || type[i].mcsRequired <= 0) {
                cont = false;
                Alert.alert(
                  "Error",
                  `Please fill in a valid number for ${type[i].name}'s MCs required`,
                  [
                    {
                      text: "OK",
                    },
                  ],
                  { cancelable: false }
                );
                break;
              }
              if (type[i].numRequired !== undefined) {
                if (isNaN(type[i].numRequired) || type[i].numRequired <= 0) {
                  cont = false;
                  Alert.alert(
                    "Error",
                    `Input should be empty or a valid number for ${type[i].name}'s No. required`,
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
              typeRef.get().then((document) => {
                const typeObj = document.data();
                for (let i = 0; i < type.length; i++) {
                  typeObj[type[i].name] = i;
                  type[i].key = i + 1;
                }
                for (const name of del) {
                  delete typeObj[name];
                }
                typeObj.cat = type;
                typeRef.set(typeObj);
              });
              navigation.navigate("Records");
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
      {/* ----------------- ALL TYPES ------------------------------- */}
      <FlatList
        data={type}
        keyExtractor={(item) => item.name.toString()}
        renderItem={({ item }) => holders(item)}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: 95 }} />}
      />
      <BottomBar
        leftText={`MCs planned : ${mcsPlanned} / ${totalMC}`}
        leftTextSize={16}
        rightText={"Add a type"}
        size={100}
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
