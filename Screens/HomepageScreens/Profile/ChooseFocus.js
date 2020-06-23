import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import Header from "../../../Component/Header";
import { Icon } from "react-native-eva-icons";
import { globalFontStyles } from "../../../Component/GlobalFont";
import SuggestButton from "../../../Component/SuggestButton";
import Modal from "react-native-modal";

const Focus = ({ navigation }) => {
  const NotPressed = (props) => (
    <TouchableOpacity
      style={styles.Pressed}
      activeOpacity={0.85}
      onPress={() => activate(props)}
    >
      <Text style={{ ...globalFontStyles.OSSB_17, color: "#00000080" }}>
        {props}
      </Text>
      <Icon name="square-outline" width={25} height={25} fill="#00000080" />
    </TouchableOpacity>
  );
  const Pressed = (props) => (
    <TouchableOpacity
      style={styles.Pressed}
      activeOpacity={0.65}
      onPress={() => deactivate(props)}
    >
      <Text style={{ ...globalFontStyles.OSSB_17, color: "#232323" }}>
        {props}
      </Text>
      <Icon name="checkmark-square-2" width={25} height={25} fill="#232323" />
    </TouchableOpacity>
  );

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

  const [CS, setCS] = useState(NotPressed("Algorithms and Theory"));
  const [BA, setBA] = useState(NotPressed("Artificial Intelligence"));
  const [IS, setIS] = useState(NotPressed("Computer Graphics and Games"));
  const [InfoSec, setInfoSec] = useState(NotPressed("Computer Security"));
  const [CEG, setCEG] = useState(NotPressed("Database Systems"));
  const [modalVisible, setModalVisible] = useState(false);

  const activate = (props) => {
    if (props === "Algorithms and Theory") {
      setCS(Pressed("Algorithms and Theory"));
    } else if (props === "Artificial Intelligence") {
      setBA(Pressed("Artificial Intelligence"));
    } else if (props === "Computer Graphics and Games") {
      setIS(Pressed("Computer Graphics and Games"));
    } else if (props === "Computer Security") {
      setInfoSec(Pressed("Computer Security"));
    } else if (props === "Database Systems") {
      setCEG(Pressed("Database Systems"));
    }
  };

  const deactivate = (props) => {
    if (props === "Algorithms and Theory") {
      setCS(NotPressed("Algorithms and Theory"));
    } else if (props === "Artificial Intelligence") {
      setBA(NotPressed("Artificial Intelligence"));
    } else if (props === "Computer Graphics and Games") {
      setIS(NotPressed("Computer Graphics and Games"));
    } else if (props === "Computer Security") {
      setInfoSec(NotPressed("Computer Security"));
    } else if (props === "Database Systems") {
      setCEG(NotPressed("Database Systems"));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        str={"Focus Area"}
        leftChildren={
          <Icon
            name="chevron-left-outline"
            width={100}
            height={30}
            fill="#232323"
            onPress={() => navigation.goBack()}
          />
        }
        rightChildren={
          <SuggestButton
            func={() => {
              setModalVisible(true);
            }}
          />
        }
      />

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

      <View style={{ paddingLeft: 20, paddingRight: 25 }}>
        {CS}
        {BA}
        {IS}
        {InfoSec}
        {CEG}
      </View>
    </SafeAreaView>
  );
};

export default Focus;

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  Pressed: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingBottom: 12,
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
