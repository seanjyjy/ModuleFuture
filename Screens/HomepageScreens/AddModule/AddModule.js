import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import { globalFontStyles } from "../../../Component/GlobalFont";
import { Icon } from "react-native-eva-icons";
import BottomBar from "../../../Component/BottomBar";
import Modal from "react-native-modal";
import Cross from "../../../Component/Cross";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

// TODO:
// Add MC count and change icon plus to minus
// Filter pages

const AddModule = ({ navigation }) => {
  const header = (
    <SafeAreaView style={styles.header}>
      <View style={{ padding: width * 0.05 }}>
        <Cross
          top={12}
          left={0}
          transition={() => navigation.dispatch(CommonActions.goBack())}
          text={"Add a module"}
        />
        <View style={styles.second}>
          <View style={styles.item2}>
            <Icon
              style={{ marginLeft: 10 }}
              fill="#76768080"
              width={20}
              height={20}
              name="search-outline"
            />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
              <View style={{ flex: 1 }}>
                <TextInput
                  placeholder="Module code, name"
                  style={{ ...globalFontStyles.OSSB_15, marginLeft: 10 }}
                  placeholderTextColor="#76768080"
                ></TextInput>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <Icon
            style={{ marginLeft: 10 }}
            fill="#3FE2D3"
            width={28}
            height={28}
            name="options-2-outline"
            onPress={() => navigation.navigate("Filter")}
          />
        </View>
      </View>
    </SafeAreaView>
  );

  const array = [
    {
      key: 1,
      name: "CS1101S Programming Methodology",
      prereqFulfilled: true,
      taken: [
        { key: 1, name: "CS2040 / CS2020 / CS2010 / CS2030" },
        { key: 2, name: "ST2131 / ST2132" },
        { key: 3, name: "CS1101S / CS1100 / CS1010 / CS1010S" },
      ],
      notTaken: [],
    },
    {
      key: 2,
      name: "CS2030 Programming Methodology II",
      prereqFulfilled: true,
      taken: [{ key: 1, name: "CS1231" }],
      notTaken: [],
    },
    {
      key: 3,
      name: "CS2040S Data Structures and Algorithms",
      prereqFulfilled: true,
      taken: [
        { key: 1, name: "CS2040 / CS2020 / CS2010 / CS2030" },
        { key: 2, name: "ST2131 / ST2132" },
        { key: 3, name: "CS1101S / CS1100 / CS1010 / CS1010S" },
      ],
      notTaken: [],
    },
    {
      key: 4,
      name: "CS1101S Programming Methodology",
      prereqFulfilled: false,
      taken: [
        { key: 1, name: "CS1231" },
        { key: 2, name: "CS2030 / CS2040S" },
      ],
      notTaken: [
        { key: 1, name: "CS2040 / CS2020 / CS2010 / CS2030" },
        { key: 2, name: "ST2131 / ST2132" },
      ],
    },
    {
      key: 5,
      name: "CS1101S Programming Methodology",
      prereqFulfilled: false,
      taken: [
        { key: 1, name: "CS1231" },
        { key: 2, name: "CS2030 / CS2040S" },
      ],
      notTaken: [
        { key: 1, name: "CS2040 / CS2020 / CS2010 / CS2030" },
        { key: 2, name: "ST2131 / ST2132" },
        { key: 3, name: "CS1101S / CS1100 / CS1010 / CS1010S" },
      ],
    },
    {
      key: 6,
      name: "CS2106 Operating Systems",
      prereqFulfilled: true,
      taken: [
        { key: 1, name: "CS1231" },
        { key: 2, name: "CS2030 / CS2040S" },
      ],
      notTaken: [],
    },
    {
      key: 7,
      name: "CS3230 Design and Analysis of Algorithms",
      prereqFulfilled: false,
      taken: [{ key: 7, name: "CS1231" }],
      notTaken: [
        { key: 1, name: "CS2040 / CS2020 / CS2010 / CS2030" },
        { key: 2, name: "ST2131 / ST2132" },
        { key: 3, name: "CS1101S / CS1100 / CS1010 / CS1010S" },
      ],
    },
  ];

  const len = array.length;
  const [plus, onPlus] = useState(true);
  const [MCcount, addVal] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [current, setItem] = useState(array[0]);
  const [split, setSplit] = useState(0);

  const compute = (taken, notTaken) => {
    const len = taken.length + notTaken.length;
    return (taken.length / len) * 100;
  };

  const holders = (key, name, prereq, taken, notTaken) => (
    <View style={styles.container}>
      <View style={{ flexDirection: "column", flex: 1 }}>
        <View style={{ width: 0.7 * width }}>
          <Text
            numberOfLines={1}
            style={{ ...globalFontStyles.OSSB_14, color: "#232323" }}
          >
            {name}
          </Text>
        </View>
        {/* Two buttons below */}
        <View style={{ flexDirection: "row", flex: 1 }}>
          {/* Prereq button */}
          <TouchableOpacity
            style={{
              ...styles.button1,
              backgroundColor: prereq ? "#303030" : "#FF6B6B",
            }}
            activeOpacity={0.85}
            onPress={() => {
              const current = array[key - 1];
              setItem(current);
              setSplit(compute(taken, notTaken));
              setModalVisible(true);
            }}
          >
            <Text style={{ ...globalFontStyles.OSSB_12, color: "white" }}>
              Prereq
            </Text>
            <View>
              {prereq ? null : (
                <Icon
                  style={{ marginLeft: 2 }}
                  fill="white"
                  width={15}
                  height={15}
                  name="alert-circle"
                />
              )}
            </View>
          </TouchableOpacity>
          {/* Info button */}
          <TouchableOpacity
            style={styles.button1}
            activeOpacity={0.85}
            onPress={() => null}
          >
            <Text style={{ ...globalFontStyles.OSSB_12, color: "white" }}>
              Info
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Firebase to handle modules being added */}
      <Icon
        name="plus-circle"
        width={43}
        height={43}
        fill={plus ? "#3FE2D3" : "#E52727"}
        onPress={() => {
          const current = array[key - 1];
          setItem(current);
          return onPlus(!plus);
        }}
      />
    </View>
  );

  const textWithIcon = (name) => (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingVertical: 6,
      }}
    >
      <View
        style={{
          backgroundColor: "black",
          width: 0.02 * width,
          height: 0.02 * width,
          borderRadius: (0.02 * width) / 2,
          marginRight: 7,
        }}
      />
      <View style={{ flex: 1, flexDirection: "row", width: "100%" }}>
        <Text
          numberOfLines={1}
          style={{ ...globalFontStyles.OSR_13, color: "#0E2131" }}
        >
          {name}
        </Text>
      </View>
    </View>
  );

  const modal = (portion1, portion2) => {
    return (
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
        <View
          style={{
            height: `${portion1}%`,
            top: 15,
            width: "100%",
            paddingBottom: 10,
          }}
        >
          <Text style={{ ...globalFontStyles.OSSB_14 }}>
            {portion1 > 0 ? "Taken" : ""}
          </Text>
          <FlatList
            data={current.taken}
            renderItem={({ item }) => textWithIcon(item.name)}
          />
        </View>
        <View style={{ height: `${portion2}%`, width: "100%", paddingTop: 20 }}>
          <Text style={{ ...globalFontStyles.OSSB_14 }}>
            {portion2 > 0 ? "Not Taken" : ""}
          </Text>
          <FlatList
            data={current.notTaken}
            renderItem={({ item }) => textWithIcon(item.name)}
          />
        </View>
      </Modal>
    );
  };

  return (
    <View style={{ alignItems: "center", backgroundColor: "#F4F4F4", flex: 1 }}>
      {header}
      <View style={{ marginBottom: 200 }}>
        <FlatList
          data={array}
          keyExtractor={(item) => item.key.toString()}
          renderItem={({ item }) =>
            holders(
              item.key,
              item.name,
              item.prereqFulfilled,
              item.taken,
              item.notTaken
            )
          }
        />
      </View>
      {modal(split, 100 - split)}
      <BottomBar
        leftText={`MC count: ${MCcount}`}
        transition={() => navigation.navigate("Foundation")}
        rightText={"Add modules"}
        size={"33%"}
      />
    </View>
  );
};

export default AddModule;

const styles = StyleSheet.create({
  // Stylesheet for header
  header: {
    backgroundColor: "white",
    borderBottomWidth: 0.2,
    width: width,
    height: 0.178 * height,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    alignContent: "flex-start",
    justifyContent: "center",
  },
  item2: {
    flexDirection: "row",
    backgroundColor: "#7676801F",
    height: "100%",
    width: "88%",
    alignItems: "center",
  },
  second: {
    top: height * 0.04,
    height: "50%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  // Stylesheet for box
  container: {
    backgroundColor: "white",
    borderRadius: 15,
    borderColor: "lightgrey",
    borderWidth: StyleSheet.hairlineWidth * 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    width: width * 0.9,
    height: height * 0.12,
    padding: 15,
    paddingLeft: 20,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  modalBox: {
    backgroundColor: "white",
    alignSelf: "center",
    marginVertical: height * 0.35,
    width: width * 0.8,
    paddingLeft: 25,
    borderRadius: 25,
  },
  button1: {
    marginTop: 12,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 30,
    width: 75,
    borderRadius: 5,
    backgroundColor: "#303030",
  },
});
