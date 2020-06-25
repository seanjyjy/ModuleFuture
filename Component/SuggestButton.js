import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  View,
} from "react-native";
import React, { useState } from "react";
import { globalFontStyles } from "./GlobalFont";
import Modal from "react-native-modal";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const SuggestButton = () => {
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

  return (
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
};

export default SuggestButton;
const styles = StyleSheet.create({
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
