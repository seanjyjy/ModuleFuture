import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Keyboard,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Header from "../../../../Component/Header";
import Icons from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import { Icon } from "react-native-eva-icons";
import { globalFontStyles } from "../../../../Component/GlobalFont";
import Modal from "react-native-modalbox";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import FirebaseDB from "../../../../FirebaseDB";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ImageSet = [
  require("../../../../assets/plan1.png"),
  require("../../../../assets/plan2.png"),
  require("../../../../assets/plan3.png"),
  require("../../../../assets/plan4.png"),
];

const colorSet = ["#E09797", "#745454", "white", "#fcf2d8"];
function RectInfoSelected({
  id,
  selected,
  onSelect,
  imageLink,
  idChange,
  nameOfPlan,
}) {
  return (
    <TouchableOpacity
      style={{ ...styles.boxStyle }}
      activeOpacity={0.95}
      onPress={() => {
        onSelect(id);
        idChange(id);
      }}
    >
      <View style={{ flex: 1, overflow: "hidden", borderRadius: 30 }}>
        <ImageBackground style={{ flex: 1 }} source={ImageSet[imageLink]}>
          <View style={styles.boxDesign}>
            <Text
              style={{ ...globalFontStyles.OSR_14, color: colorSet[imageLink] }}
            >
              {selected ? "Current" : ""}
            </Text>
          </View>
          <View style={{ flex: 7 }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  ...globalFontStyles.OSSB_19,
                  left: 20,
                  color: colorSet[imageLink],
                  bottom: 5,
                }}
              >
                {nameOfPlan}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  ...styles.OSSBL20ColorBlack,
                  color: colorSet[imageLink],
                }}
              >
                Semester Cap:
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  ...styles.OSSBL20ColorBlack,
                  color: colorSet[imageLink],
                }}
              >
                Overall Cap:
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  ...styles.OSSBL20ColorBlack,
                  color: colorSet[imageLink],
                }}
              >
                MCs:
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  ...styles.OSSBL20ColorBlack,
                  color: colorSet[imageLink],
                }}
              >
                Last Updated:
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}

const Plans = (props) => {
  const navigation = useNavigation();
  //const thisPageInfo = props.nextPageInfo;
  //const userID = thisPageInfo[0];
  const info = props.data;
  const userID = info[0];
  const plansArrayRef = FirebaseDB.firestore()
    .collection("plansArray")
    .doc(userID.concat("_", props.headerTitle));
  const [currentArr, setCurrentArr] = useState(info[1]);
  //const [size, setSize] = useState(thisPageInfo[1].length);
  const [size, setSize] = useState(0);
  useEffect(() => {
    const unsub = plansArrayRef.onSnapshot(
      (document) => {
        const val = document.data();
        if (val !== undefined) {
          const arr = val.yearSem;
          setSize(arr.length);
          setCurrentArr(arr);
        } else {
          plansArrayRef.set({ yearSem: [] });
          setCurrentArr([]);
        }
      },
      (error) => alert(error)
    );
    return () => unsub();
  }, [userID]);

  const [selected, setSelected] = React.useState(new Map().set("1", true));
  const [planName, setPlanName] = useState("Plan 1");
  const [currentID, setCurrentID] = useState("1");
  const onSelect = React.useCallback(
    (key) => {
      const newSelected = new Map();
      newSelected.set(key, !selected.get(key));
      setSelected(newSelected);
    },
    [selected]
  );

  const setCurrentlyPressID = (val) => {
    if (val === currentID) {
      setCurrentID("-1");
    } else {
      setCurrentID(val);
    }
  };
  const data = [
    { key: "1", value: true },
    { key: "2", value: false },
    { key: "3", value: false },
    { key: "4", value: false },
  ]; // demo

  const [modalVisible, setModalVisible] = useState(false);

  // ------------------------UNABLE TO PREVENT ANDROID MODAL TO STAY STATIONARY ----------------------------------------------------------
  const PopOutBox = () => {
    return (
      <Modal
        style={styles.modalBox}
        isOpen={modalVisible}
        backdropPressToClose={false}
        coverScreen={true}
        onClosed={() => setModalVisible(false)}
        keyboardTopOffset={300}
        position="center"
      >
        <View style={styles.modalHeaderQuestion}>
          <Text style={styles.popoutheader}>Name of Plan</Text>
        </View>
        <View style={{ ...styles.flexOneCenter }}>
          <View
            style={{
              width: 0.4 * width,
              height: 0.04 * height,
              borderWidth: 1,
              borderColor: "#D0CECE",
            }}
          >
            <TextInput
              style={{
                width: 0.4 * width,
                height: 0.04 * height,
                left: 5,
              }}
              placeholder="e.g. EZ CAP 5.0"
              onChangeText={(val) => setPlanName(val)}
            />
          </View>
        </View>
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
              Keyboard.dismiss();
              setModalVisible(false);
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
            style={styles.flexOneCenter}
            activeOpacity={0.9}
            onPress={() => {
              Keyboard.dismiss();
              setModalVisible(false);
              navigation.navigate("AddPlan", {
                item: [
                  planName,
                  userID.concat("_", props.headerTitle),
                  size,
                  props.headerTitle,
                ],
              });
            }}
          >
            <Text style={{ ...globalFontStyles.NB_14, color: "#007AFF" }}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  return (
    <View style={{ flex: 1, minHeight: hp("100%") }}>
      <View style={styles.header}>
        <ImageBackground
          style={styles.header}
          source={require("../../../../assets/HeaderBG.png")}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "flex-start",
            }}
          >
            <Ionicons
              name="md-arrow-round-back"
              size={25}
              style={{ color: "#3E3E3E", left: 30, bottom: 15 }}
              onPress={() => navigation.dispatch(CommonActions.goBack())}
            />
          </View>
          <View
            style={{
              flex: 3,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                ...globalFontStyles.NB_20,
                color: "#3E3E3E",
                bottom: 15,
              }}
            >
              {props.headerTitle}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                bottom: 18,
                ...globalFontStyles.NB_14,
                color: "#007AFF",
              }}
            >
              Edit
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={{ flex: 6, backgroundColor: "#f9f9f9" }}>
        <FlatList
          ListEmptyComponent={
            <View style={{ flex: 1, backgroundColor: "#f9f9f9" }} />
          }
          showsVerticalScrollIndicator={false}
          data={currentArr}
          keyExtractor={(item) => item.key}
          extraData={selected}
          renderItem={({ item }) => (
            <RectInfoSelected
              id={item.key.toString()}
              selected={!!selected.get(item.key)}
              onSelect={onSelect}
              imageLink={(parseInt(item.key) - 1) % 4}
              idChange={(val) => setCurrentlyPressID(val)}
              nameOfPlan={item.nameOfPlan}
            />
          )}
        />
      </View>
      <View style={styles.btmPart}>
        <View style={{ flex: 1 }} />
        <View style={styles.btmMidPart}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.enterButton}
            onPress={() => {
              if (parseInt(currentID) - 1 < 0) {
                alert("Please select or create a plan");
              } else {
                const currentPlanName =
                  currentArr[parseInt(currentID) - 1].nameOfPlan;
                const plansItselfRef = FirebaseDB.firestore()
                  .collection("plansItself")
                  .doc(
                    userID.concat("_", props.headerTitle, "_", currentPlanName)
                  );
                const val = plansItselfRef.get().then((document) => {
                  const info = document.data();
                  if (info !== undefined) {
                    const moduleInformations = info.planInfo;
                    const thisPlanName = info.nameOfPlan;
                    navigation.navigate("ViewPlan", {
                      item: [
                        thisPlanName,
                        moduleInformations,
                        props.headerTitle,
                      ],
                    });
                  }
                });
              }
            }}
          >
            <Text style={{ ...globalFontStyles.OSB_17, color: "white" }}>
              Enter
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.btmRightPart}
          activeOpacity={0.9}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Icon name="plus-circle" width={60} height={60} fill={"#FB5581"} />
        </TouchableOpacity>
      </View>
      {PopOutBox()}
    </View>
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
    height: 0.22 * height,
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
  modalBox: {
    backgroundColor: "white",
    width: 0.7 * width,
    height: 0.17 * height,
    borderRadius: 30,
  },
  popouttext: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  popoutheader: {
    ...globalFontStyles.OSB_13,
    color: "#232323",
  },
  modalHeaderQuestion: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    top: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#f2f2f2",
    height: 0.04 * height,
    width: 200,
  },
  flexOneShadowOne: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  flexOneCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  OSSBL20ColorBlack: {
    ...globalFontStyles.OSSB_14,
    left: 20,
  },
  enterButton: {
    height: 65,
    backgroundColor: "#FB5581",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    width: 220,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  header: {
    height: 0.11 * height,
    width: "100%",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 2,
  },
});
