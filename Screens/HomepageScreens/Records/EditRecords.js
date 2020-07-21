import React, { useEffect, useState, useRef } from "react";
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
import { Easing, Transition } from "react-native-reanimated";
import { Icon } from "react-native-eva-icons";
import { FlatList } from "react-native-gesture-handler";
import BottomBar from "../../../Component/BottomBar";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const EditRecords = ({ navigation }) => {
  const [type, setType] = useState([]);
  const [mcsPlanned, setMC] = useState(0);
  const [totalMC, setTotalMC] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const fb = FirebaseDB.firestore();
  const userID = FirebaseDB.auth().currentUser.uid;
  const typeRef = fb.collection("typeArray").doc(userID);

  useEffect(() => {
    const unsub = typeRef.onSnapshot((document) => {
      const data = document.data();
      setType(document.data());
      let sum = 0;
      for (let i = 0; i < data.cat.length; i++) {
        sum += data.cat[i].mcsRequired;
      }
      setMC(sum);
    });

    const usersRef = fb.collection("users").doc(userID);
    usersRef.get().then((document) => {
      setTotalMC(document.data().totalMCs);
    });

    return () => unsub();
  }, []);

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

  const content = (item) => {
    const mcsReq = item.mcsRequired;
    const numReq =
      item.numRequired !== undefined ? item.numRequired : "not specified";

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
              type.cat[item.key - 1][index] = parseInt(val);
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
    // const xVal = useRef(new Animated.Value(0)).current;

    const key = item.key;
    const name = item.name;

    // const move = () => {
    //   Animated.timing(xVal, {
    //     toValue: -width,
    //     duration: 300,
    //     easing: Easing.linear,
    //   }).start(() => {
    //     null;
    //   });
    // };

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
                  const newArr = type.cat.filter((x) => x.name !== name);
                  delete newArr["name"];
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
    ></Modal>
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
            // reAssignKeys
            let typeObj = type;
            for (let i = 0; i < typeObj.cat.length; i++) {
              typeObj.cat[i].key = i + 1;
            }
            typeRef.set({
              typeObj,
            });
            navigation.navigate("Records");
          }}
          activeOpacity={0.9}
          style={styles.headerRight}
        >
          <Text style={{ ...globalFontStyles.NB_14, color: "#007AFF" }}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
      {/* ----------------- ALL TYPES ------------------------------- */}
      <FlatList
        data={type.cat}
        keyExtractor={(item) => item.key.toString()}
        renderItem={({ item }) => holders(item)}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{ height: height * 0.1 }} />}
      />
      <BottomBar
        leftText={`MCs planned : ${mcsPlanned} / ${totalMC}`}
        rightText={"Add a type"}
        size={100}
        transition={() => null}
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
    height: height / 5,
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
  btmButtonHolder: {
    width: 55,
    height: 55,
    backgroundColor: "#393939",
    borderRadius: 100,
    left: 0.78 * width,
    alignItems: "center",
    justifyContent: "center",
  },
  modalBox: {
    backgroundColor: "white",
    width: 0.7 * width,
    height: 0.17 * height,
    borderRadius: 30,
  },
});
