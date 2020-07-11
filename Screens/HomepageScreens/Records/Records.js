import React, { useState, useEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import Header from "../../../Component/Header";
import { MenuItem, OverflowMenu } from "@ui-kitten/components";
import { Icon } from "react-native-eva-icons";
import { globalFontStyles } from "../../../Component/GlobalFont";
// import ColouredList from "../../../Component/ColouredList";
import FullView from "../../../Component/FullView";
import FirebaseDB from "../../../FirebaseDB";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Records = () => {
  const fb = FirebaseDB.firestore();
  const userID = FirebaseDB.auth().currentUser.uid;
  const typeRef = fb.collection("typeArray");
  const codeRef = fb.collection("codeArray");
  const levelRef = fb.collection("levelArray");
  const recordsRef = fb.collection("records");

  useEffect(() => {
    recordsRef.doc(userID).onSnapshot((document) => {
      const data = document.data();
      setTaken(data.taken);
      setNotTaken(data.notTaken);
    });
    typeRef.doc(userID).onSnapshot((document) => {
      setType(document.data().cat);
    });
    codeRef.doc(userID).onSnapshot((document) => {
      setCode(document.data().cat);
    });
    levelRef.doc(userID).onSnapshot((document) => {
      setLevel(document.data().cat);
    });
  }, []);

  const navigation = useNavigation();

  // Default states
  const [MCstaken, toggle] = useState(true);
  const [catView, setView] = useState(true);
  const [currentType, changeType] = useState("Type");
  const [typeSelection, setTypeVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [type, setType] = useState([]);
  const [level, setLevel] = useState([]);
  const [code, setCode] = useState([]);
  const [taken, setTaken] = useState([]);
  const [notTaken, setNotTaken] = useState([]);

  {
    /* --------------------------------------------Ellipsis------------------------------------------------ */
  }
  const MenuIcon = () => (
    <Icon
      fill="#232323"
      width={30}
      height={30}
      name="more-vertical-outline"
      onPress={toggleMenu}
    />
  );

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const toggleTypeMenu = () => {
    setTypeVisible(!typeSelection);
  };

  /* --------------------------------------------Selector---------------------------------------- */

  const text = (word) => (
    <Text style={{ ...globalFontStyles.OSR_15, color: "#232323" }}>{word}</Text>
  );

  const numTaken = () => (MCstaken ? "Toggle no. taken" : "Toggle MCs taken");

  const overallView = () => (catView ? "Full view" : "Categorical view");

  const item1 = () =>
    currentType === "Type" || currentType === "Level" ? "Code" : "Type";

  const item2 = () =>
    currentType === "Type" || currentType === "Code" ? "Level" : "Type";

  const renderOverflowMenuAction = () => {
    const option = (menu1, menu2) => (
      <MenuItem
        title={text(menu1())}
        onPress={() => {
          if (menu1() === numTaken()) {
            toggle(!menu2);
          } else {
            setView(!menu2);
          }
          toggleMenu();
        }}
        activeOpacity={0.9}
      />
    );

    return (
      <OverflowMenu
        visible={menuVisible}
        anchor={MenuIcon}
        onBackdropPress={toggleMenu}
      >
        {option(numTaken, MCstaken)}
        {option(overallView, catView)}
      </OverflowMenu>
    );
  };

  const viewType = () => (
    <TouchableOpacity
      style={styles.header2}
      activeOpacity={0.85}
      onPress={toggleTypeMenu}
    >
      <Text style={{ ...globalFontStyles.OSSB_19, color: "#232323" }}>
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
          toggleTypeMenu();
        }}
        activeOpacity={0.9}
      />
    );
    return (
      <OverflowMenu
        visible={typeSelection}
        anchor={viewType}
        onBackdropPress={toggleTypeMenu}
      >
        {option(item1)}
        {option(item2)}
      </OverflowMenu>
    );
  };

  /* --------------------------------------------Floating content------------------------------------------------ */

  const colors = [
    "#FFB584",
    "#FF6F66",
    "#C6E198",
    "#6CD5AF",
    "#8F9ED5",
    "#CE6F73",
    "#241161",
    "#6c2386",
  ];

  /* --------------------------------------------Content headers------------------------------------------------ */

  const text1 = MCstaken ? "MCs taken" : "No. taken";

  const menu = () => {
    if (currentType === "Type") {
      return type;
    } else if (currentType === "Level") {
      return level;
    } else {
      return code;
    }
  };

  const ColouredList = (props) => {
    const colors = props.colors;
    const bool = props.text3 === "4.1";
    const mcsOrNum = props.mcsOrNum;
    const array = props.array;

    const content = (item) => {
      const key = item.key;
      const numTaken = item.numTaken === 0 ? "-" : item.numTaken;
      const mcsTaken = item.mcsTaken === 0 ? "-" : item.mcsTaken;
      const mcsReq = item["mcsRequired"] ? item.mcsRequired : 0;
      const numReq = item["numRequired"] ? item.numRequired : 0;
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
            backgroundColor: colors[(key - 1) % 8],
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
            ...(bool ? globalFontStyles.NBEB_13 : globalFontStyles.NBEB_14),
            color: "#686868",
          }}
        >
          {input}
        </Text>
      );

      const text1 = () => {
        if (mcsOrNum === "MCs taken") {
          if (mcsReq !== 0) {
            return mcsTaken + " / " + mcsReq;
          } else {
            return mcsTaken;
          }
        } else {
          if (numReq !== 0) {
            return numTaken + " / " + mcsReq;
          } else {
            return numTaken;
          }
        }
      };

      const line = (text1, text2) => (
        <View style={styles.innerText}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              top: 1,
            }}
          >
            {circle}
          </View>
          <View style={{ flex: 4, justifyContent: "center" }}>
            {text(text1)}
          </View>
          <View
            style={{
              flex: bool ? 1.3 : 2.5,
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
          {line(mcsOrNum, text1())}
          {line("CAP", CAP())}
        </View>
      );
    };

    const holders = (item) => {
      const key = item.key;
      const name = item.name;
      return (
        <TouchableOpacity
          style={styles.container}
          activeOpacity={0.9}
          onPress={() => {
            navigation.navigate("Foundation", {
              taken: taken,
              notTaken: notTaken,
              title: item.name,
              context: item["context"] ? item.context : item.name,
              type: currentType,
            });
          }}
        >
          <View
            style={{
              ...styles.colorTop,
              backgroundColor: colors[(key - 1) % 8],
            }}
          >
            <View style={{ width: "90%" }}>
              <Text
                style={{
                  ...(bool
                    ? globalFontStyles.NBEB_15
                    : globalFontStyles.NBEB_17),
                  color: "#F4F4F4",
                  textAlign: "center",
                }}
              >
                {name}
              </Text>
            </View>
          </View>
          {content(item)}
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
          ListFooterComponent={<View style={{ height: 70 }} />}
        />
      </View>
    );
  };

  return catView ? (
    <View style={{ flex: 1 }}>
      <Header
        str={"Records"}
        leftChildren={null}
        rightChildren={renderOverflowMenuAction()}
      />
      {selector()}
      <ColouredList colors={colors} mcsOrNum={text1} array={menu()} />
    </View>
  ) : (
    // To be updated for Full View
    <View style={{ flex: 1 }}>
      <Header
        str={"Records"}
        leftChildren={null}
        rightChildren={renderOverflowMenuAction()}
      />
      {selector()}
    </View>
  );
};

export default Records;

const styles = StyleSheet.create({
  header2: {
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth,
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
});
