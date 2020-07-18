import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import Header from "../../../Component/Header";
import { Icon } from "react-native-eva-icons";
import { MenuItem, OverflowMenu } from "@ui-kitten/components";
import { globalFontStyles } from "../../../Component/GlobalFont";
import FirebaseDB from "../../../FirebaseDB";
import Modal from "react-native-modal";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const hairlineWidth = StyleSheet.hairlineWidth;

const FocusArea = ({ navigation }) => {
  const fb = FirebaseDB.firestore();
  const userID = FirebaseDB.auth().currentUser.uid;
  const focusAreaRef = fb.collection("focusArea").doc(userID);
  const takenModulesRef = fb.collection("takenModules").doc(userID);

  useEffect(() => {
    const unsub = takenModulesRef.onSnapshot((document) => {
      setTaken(document.data());
      focusAreaRef.onSnapshot((document) => {
        setFocus(document.data().cat);
      });
    });
    return () => unsub();
  }, []);

  const [currentType, changeType] = useState("Prereq");
  const [menuVisible, setMenuVisible] = useState(false);
  const [takenModules, setTaken] = useState([]);
  const [focusArea, setFocus] = useState([]);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  // prereq primaries electives
  const item1 = () =>
    currentType === "Prereq" || currentType === "Electives"
      ? "Primaries"
      : "Prereq";

  const item2 = () =>
    currentType === "Prereq" || currentType === "Primaries"
      ? "Electives"
      : "Prereq";

  const text = (word) => (
    <Text style={{ ...globalFontStyles.OSR_14, color: "#232323" }}>{word}</Text>
  );

  const viewType = () => (
    <TouchableOpacity
      style={styles.header2}
      activeOpacity={0.85}
      onPress={() => toggleMenu()}
    >
      <Text style={{ ...globalFontStyles.OSSB_17, color: "#232323" }}>
        {currentType}
      </Text>
      <Icon
        fill="#232323"
        width={30}
        height={20}
        name="arrow-ios-downward-outline"
        style={{ marginTop: 4 }}
      />
    </TouchableOpacity>
  );

  const selector = () => {
    const option = (item) => (
      <MenuItem
        title={text(item())}
        onPress={() => {
          changeType(item());
          toggleMenu();
        }}
        activeOpacity={0.9}
      />
    );
    return (
      <OverflowMenu
        visible={menuVisible}
        anchor={viewType}
        onBackdropPress={() => toggleMenu()}
      >
        {option(item1)}
        {option(item2)}
      </OverflowMenu>
    );
  };

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

  const lettersChecker = (val) => {
    if (val !== "S" && val !== "CS" && val !== "CU") {
      return true;
    } else {
      return false;
    }
  };

  const GradeToPoint = (val) => {
    return val === "A+" || val === "A"
      ? 5.0
      : val === "A-"
      ? 4.5
      : val === "B+"
      ? 4.0
      : val === "B"
      ? 3.5
      : val === "B-"
      ? 3.0
      : val === "C+"
      ? 2.5
      : val === "C"
      ? 2.0
      : val === "D+"
      ? 1.5
      : val === "D"
      ? 1.0
      : 0;
  };

  const ColouredList = (props) => {
    const colors = props.colors;
    const array = props.array;

    const leftText = `Number of ${currentType.toLowerCase()} taken`;

    const content = (curr) => {
      const key = curr.key;
      const item = curr[currentType];
      const numTaken = item.numTaken === 0 ? "-" : item.numTaken;
      const numReq = item.numRequired !== undefined ? item.numRequired : 0;
      const CAP = () => {
        if (item.points === 0) {
          return "-";
        } else {
          const val = item.points / item.mcsUsedInCap;
          return val.toFixed(2);
        }
      };

      const circle = (
        <View
          style={{
            backgroundColor: colors[(key - 1) % 10],
            width: 0.03 * width,
            height: 0.03 * width,
            borderRadius: (0.03 * width) / 2,
          }}
        />
      );

      const text = (input) => (
        <Text
          numberOfLines={2}
          style={{
            ...globalFontStyles.NBEB_13,
            color: "#686868",
          }}
        >
          {input}
        </Text>
      );

      const text1 = () => {
        // See if all of them has number required
        if (numReq !== 0) {
          return numTaken + " / " + numReq;
        } else {
          return numTaken;
        }
      };

      const line = (text1, text2) => (
        <View style={styles.innerText}>
          <View
            style={{
              flex: 0.5,
              justifyContent: "center",
              top: 1,
              marginRight: 12,
            }}
          >
            {circle}
          </View>
          <View style={{ flex: 7, justifyContent: "center" }}>
            {text(text1)}
          </View>
          <View
            style={{
              flex: 2.3,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {text(text2)}
          </View>
        </View>
      );

      return (
        <View style={styles.whitelayer}>
          {line(leftText, text1())}
          {line("CAP", CAP())}
        </View>
      );
    };

    const holders = (item) => {
      const current = item;
      const key = current.key;
      const name = current.name;

      const prereq = current["Prereq"].modules;
      const primaries = current["Primaries"].modules;
      const electives = current["Electives"].modules;

      const assignVal = (section, name) => {
        let taken = [];
        let notTaken = [];
        let numTaken = 0;
        let points = 0;
        let mcsUsedInCap = 0;
        for (let i = 0; i < section.length; i++) {
          if (takenModules[section[i].code] !== undefined) {
            const mod = takenModules[section[i].code];
            taken.push(mod);
            if (mod.grade !== "CU") {
              numTaken += 1;
            }
            if (lettersChecker(mod.grade)) {
              mcsUsedInCap += mod.numMcs;
              points += GradeToPoint(mod.grade) * mod.numMcs;
            }
          } else {
            notTaken.push(section[i]);
          }
        }
        current[name].taken = taken;
        current[name].notTaken = notTaken;
        current[name].mcsUsedInCap = mcsUsedInCap;
        current[name].points = points;
        current[name].numTaken = numTaken;
      };

      assignVal(prereq, "Prereq");
      assignVal(primaries, "Primaries");
      assignVal(electives, "Electives");

      return (
        <TouchableOpacity
          style={styles.container}
          activeOpacity={0.9}
          onPress={() => {
            current.Prereq.name = "Prereq";
            current.Primaries.name = "Primaries";
            current.Electives.name = "Electives";
            const arr = [];
            arr[0] = current.Prereq;
            arr[1] = current.Primaries;
            arr[2] = current.Electives;
            navigation.navigate("EachFocusArea", {
              name:
                current.shortName === undefined
                  ? current.name
                  : current.shortName,
              arr: arr,
              index: current.key - 1,
              from: "FocusArea",
            });
          }}
        >
          <View
            style={{
              ...styles.colorTop,
              backgroundColor: colors[(key - 1) % 10],
            }}
          >
            <View style={{ width: "90%" }}>
              <Text
                style={{
                  ...globalFontStyles.NBEB_15,
                  color: "#F4F4F4",
                  textAlign: "center",
                }}
              >
                {name}
              </Text>
            </View>
          </View>
          {content(current)}
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ flex: 1, position: "relative" }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={array}
          renderItem={({ item }) => holders(item)}
          keyExtractor={(item) => item.key.toString()}
          ListFooterComponent={<View style={{ height: height * 0.11 }} />}
        />
      </View>
    );
  };

  // Suggest button

  /*
  const [modalVisible, setModalVisible] = useState(false);

  const TextonPopup = (props) => (
    <View style={styles.popouttext}>
      <Text style={{ ...globalFontStyles.OSB_13, color: "#434343" }}>
        {props.name}
      </Text>
      <Text style={{ ...globalFontStyles.OSB_13, color: "#434343" }}>
        {props.cap}
      </Text>
    </View>
  );

  const SuggestButton = () => (
    <View>
      <Modal
        style={styles.modalBox}
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropTransitionOutTiming={0}
        isVisible={modalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
        }}
        onBackButtonPress={() => {
          setModalVisible(false);
        }}
      >
        <Text style={styles.popoutheader}>
          Based on CAP, your best performing focus areas are
        </Text>
        <TextonPopup name="Artificial Intelligence" cap="4.5" />
        <TextonPopup name="Computer Security" cap="4.33" />
        <TextonPopup name="Database Systems" cap="4.0" />
      </Modal>

      <TouchableOpacity
        style={styles.buttonDesign}
        activeOpacity={0.875}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ ...globalFontStyles.OSSB_15, color: "white" }}>
          Suggest
        </Text>
      </TouchableOpacity>
    </View>
  );
  */

  return (
    <View style={{ flex: 1 }}>
      <Header
        str={"Focus Area"}
        leftChildren={null}
        // rightChildren={SuggestButton()}
        rightChildren={null}
      />
      {focusArea.length > 0 ? selector() : null}
      <ColouredList colors={colors} array={focusArea} />
    </View>
  );
};

export default FocusArea;

const styles = StyleSheet.create({
  header2: {
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "grey",
    borderBottomWidth: hairlineWidth,
    borderBottomEndRadius: 13,
    borderBottomStartRadius: 16,
  },
  container: {
    width: (width - 40) / 2,
    height: height / 5,
    marginVertical: 12,
    marginHorizontal: 10,
    borderRadius: 20,
    alignItems: "center",
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
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "32%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  innerText: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  whitelayer: {
    height: "68%",
    width: "100%",
    paddingHorizontal: width * 0.02,
  },
  // Suggest button
  buttonDesign: {
    height: 28,
    backgroundColor: "#FB5581",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 7,
    width: 80,
    top: 1,
    marginRight: 50,
    elevation: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    shadowColor: "#000",
  },
  modalBox: {
    backgroundColor: "white",
    alignSelf: "center",
    marginVertical: height * 0.35,
    width: width * 0.8,
    paddingLeft: 30,
    paddingRight: 50,
    borderRadius: 25,
  },
  popoutheader: {
    ...globalFontStyles.OSB_13,
    color: "#232323",
    marginBottom: 20,
    marginTop: 5,
  },
  popouttext: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
  },
});
