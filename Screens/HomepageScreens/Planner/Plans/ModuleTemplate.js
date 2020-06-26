import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";

import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { globalFontStyles } from "../../../../Component/GlobalFont";
import { useNavigation } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";
import { MenuItem, OverflowMenu } from "@ui-kitten/components";
import { Icon } from "react-native-eva-icons";
import Modal from "react-native-modalbox";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ModuleTemplate = ({ clash, moduleName, TargetGrade }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState("");
  const [clashValue, setClash] = useState(clash);
  const [TargetGradeValue, setTargetGrade] = useState(TargetGrade);
  const [menuVisible, setMenuVisible] = useState(false);
  const MenuIcon = () => (
    <Icon
      fill="#232323"
      width={20}
      height={20}
      name="more-vertical-outline"
      onPress={toggleMenu}
    />
  );

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const Ellipsis = () => {
    return (
      <OverflowMenu
        visible={menuVisible}
        anchor={MenuIcon}
        onBackdropPress={toggleMenu}
      >
        <MenuItem
          title={"Delete"}
          onPress={() => {
            toggleMenu();
          }}
          activeOpacity={0.9}
        />
        <MenuItem
          title={"Accept conflict"}
          onPress={() => {
            toggleMenu();
            setClash(false);
          }}
          activeOpacity={0.9}
        />
      </OverflowMenu>
    );
  };
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
          <Text style={styles.popoutheader}>New Target Grade</Text>
        </View>
        <View style={styles.flexOneCenter}>
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
              placeholder="S - A+ only"
              onChangeText={(val) => setText(val)}
            />
          </View>
        </View>
        <View style={{ flex: 1, borderTopWidth: 0.5, flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            activeOpacity={0.9}
            style={{
              ...styles.flexOneCenter,
              borderRightWidth: 0.5,
              color: "#232323",
            }}
          >
            <Text style={{ ...globalFontStyles.NB_14, color: "#232323" }}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flexOneCenter}
            activeOpacity={0.9}
            onPress={() => {
              setTargetGrade(text.toString().toUpperCase());
              setModalVisible(false);
            }}
          >
            <Text style={{ ...globalFontStyles.NB_14, color: "#232323" }}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };
  return (
    <>
      <View style={styles.recStyle}>
        {/* -----------------------------------------------Left Bar ---------------------------------------------------- */}
        <View
          style={{
            ...styles.flexOneShadowOne,
            backgroundColor: clashValue ? "#fd367e" : "#80f5d4",
          }}
        />
        {/* ----------------------------------------------Right Bar --------------------------------------------------- */}
        <View style={{ flex: 10, flexDirection: "column" }}>
          {/* ----------------------------------------- Right Top Bar --------------------------------------------------- */}
          <View style={styles.recHeader}>
            <View />
            <Text style={{ ...globalFontStyles.NB_15, color: "#232323" }}>
              {moduleName}
            </Text>
            {Ellipsis()}
          </View>
          {/* ----------------------------------------Right Btm Bar ---------------------------------------------------- */}
          <View style={{ flex: 3, flexDirection: "row" }}>
            {/* ---------------------------------------Right Btm Left Bar ----------------------------------------------- */}
            <View style={styles.btmRecStyle}>
              <View style={styles.flexOneCenter}>
                <MaterialIcon
                  name="bullseye-arrow"
                  size={30}
                  style={{ color: "#f08b98" }}
                />
              </View>
              <TouchableOpacity
                style={styles.flexThreeColumnCenter}
                activeOpacity={0.1}
                onPress={() => setModalVisible(true)}
              >
                <View style={styles.flexOneCenter}>
                  <Text style={{ ...globalFontStyles.NB_15, color: "#232323" }}>
                    Target Grade:
                  </Text>
                </View>
                <View style={styles.flexOneFlexStartCenter}>
                  <Text style={{ ...globalFontStyles.NB_14, color: "#555151" }}>
                    {TargetGradeValue}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {/* ---------------------------------------Right Btm Right Bar ----------------------------------------------- */}
            <View style={styles.btmRecStyle}>
              <View style={styles.flexOneCenter}>
                <EvilIcons
                  name="trophy"
                  size={35}
                  style={{ color: "#f08b98" }}
                />
              </View>
              <TouchableOpacity
                style={styles.flexThreeColumnCenter}
                activeOpacity={0.9}
              >
                <View style={styles.flexOneCenter}>
                  <Text style={{ ...globalFontStyles.NB_15, color: "#232323" }}>
                    Final Grade:
                  </Text>
                </View>
                <View style={styles.flexOneFlexStartCenter}>
                  <Text
                    style={{ ...globalFontStyles.NB_14, color: "#555151" }}
                  ></Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {PopOutBox()}
    </>
  );
};

export default ModuleTemplate;

const styles = StyleSheet.create({
  recStyle: {
    width: 0.91 * width,
    height: 110,
    margin: 10,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    alignSelf: "center",
  },
  recHeader: {
    flex: 1,
    backgroundColor: "#F8E7E4",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  btmRecStyle: {
    flex: 1,
    backgroundColor: "#F5F2F4",
    flexDirection: "row",
  },
  flexOneCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flexThreeColumnCenter: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center",
  },
  flexOneFlexStartCenter: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
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
    borderColor: "#232323",
    padding: 8,
    margin: 10,
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
});
