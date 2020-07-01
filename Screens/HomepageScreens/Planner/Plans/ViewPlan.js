import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Animated,
} from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import EntypoIcon from "react-native-vector-icons/Entypo";
import { Avatar } from "@ui-kitten/components";
import { globalFontStyles } from "../../../../Component/GlobalFont";
import { useSafeArea } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import FirebaseDB from "../../../../FirebaseDB";
import Tabs from "./Tabs";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ViewPlan = ({ route }) => {
  const navigation = useNavigation();
  const usaBTM = useSafeArea().bottom;
  const heightToAdjust = usaBTM > 0 ? (usaBTM - 20) / 2 : 0;
  const title = route.params?.item[0];
  const [dataArray, setDataArray] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (route.params?.item[1]) {
      const arrayOfModules = route.params?.item[1];
      const tempArr = [];
      for (var i = 0; i < arrayOfModules.length; i++) {
        tempArr.push({
          moduleName: arrayOfModules[i].moduleName,
          TargetGrade: arrayOfModules[i].TargetGrade,
          NumMcs: "4",
          key: parseInt(arrayOfModules[i].key),
        });
      }
      setDataArray(tempArr);
    }
  }, [route.params?.item[0], route.params?.item[1]]);

  const colorArray = [
    { top: "#fff2ab", btm: "#fff7d1", pin: "#EB0000" },
    { top: "#ffcce5", btm: "#ffe4f1", pin: "#EE82EE" },
    { top: "#cde9ff", btm: "#e2f1ff", pin: "#000080" },
    { top: "#e7cfff", btm: "#f2e6ff", pin: "#FF00FF" },
    { top: "#cbf1c4", btm: "#e4f9e0", pin: "brown" },
  ];

  const signOutUser = async () => {
    try {
      await FirebaseDB.auth().signOut();
    } catch (error) {
      alert(error);
    }
  };

  const HomeButton = (
    <Tabs
      icon={<MaterialIcon name="home-outline" size={28} color="#726F6F" />}
      text="Home"
      viewDesign={{ borderTopWidth: 1, borderColor: "#E2E2E2" }}
      iconStyle={{ right: 3 }}
      func={() => {
        setModalVisible(false);
        navigation.navigate("Content Page");
      }}
    />
  );

  const SignOut = (
    <Tabs
      icon={<MaterialIcon size={25} name="logout" color="#726F6F" />}
      text="SignOut"
      viewDesign={{
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#E2E2E2",
      }}
      func={() => {
        setModalVisible(false);
        signOutUser();
      }}
    />
  );

  const SmartRecall = (dest) => (
    <Tabs
      icon={<MaterialIcon size={24} name="book-outline" color="#726F6F" />}
      text={dest}
      iconStyle={{ right: 3 }}
      viewDesign={{
        borderColor: "#E2E2E2",
        borderBottomWidth: 1,
      }}
      func={() => {
        setModalVisible(false);
        navigation.navigate(route.params?.item[2].toString());
      }}
    />
  );
  const ProgressButon = (
    <Tabs
      icon={<EntypoIcon name="bar-graph" color="#726F6F" size={22} />}
      text="Progress"
      iconStyle={{ right: 3 }}
      wordStyle={{
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: "#E2E2E2",
      }}
      func={() => {
        setModalVisible(false);
        navigation.navigate("ProgressPage");
      }}
    />
  );
  const customDrawer = () => {
    return (
      <Modal
        animationInTiming={250}
        animationOutTiming={400}
        isVisible={modalVisible}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        deviceHeight={height}
        deviceWidth={width}
        backdropOpacity={0.3}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View
          style={{
            width: 0.5 * width,
            height: height,
            backgroundColor: "white",
            right: 0.1 * width,
          }}
        >
          <View style={{ flex: 7 }}>
            {/* "Profile information portion" */}
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1 }} />
              <View
                style={{
                  flex: 2,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar
                  style={styles.avatar}
                  size="giant"
                  source={require("../../../../assets/JumpingMan.png")}
                />
              </View>
              <View style={styles.oneCenter}>
                <Text
                  style={{ ...globalFontStyles.NB_14, right: 0.045 * width }}
                >
                  Current Sem:
                </Text>
              </View>
            </View>
            {/* contains all the tabs */}
            <View style={{ flex: 3 }}>
              <View style={{ flex: 2 }}>
                {/* can be used to include more tabs here------- (2 more) if want more 
                then increase this flex and decrease the flex below*/}
                {HomeButton}
                {ProgressButon}
                {SmartRecall(route.params?.item[2].toString())}
                <View style={{ flex: 2 }} />
                {/* ------------------------------------------ */}
              </View>
              <View style={{ flex: 2 }} />
            </View>
          </View>
          <View style={{ flex: 1 }}>
            {SignOut}
            <View style={{ flex: 1 }} />
          </View>
        </View>
      </Modal>
    );
  };

  const Header = () => {
    return (
      <>
        <View style={styles.headerDesign}>
          <View
            style={{
              ...styles.hundredCenter,
              flex: 1,
            }}
          >
            {/* {dropDownList()} */}
            <FeatherIcon
              size={27}
              name="list"
              color="#232323"
              style={{ bottom: 7, right: 0.04 * width }}
              onPress={() => {
                setModalVisible(true);
              }}
            />
          </View>
          <View style={{ ...styles.hundredCenter, flex: 2 }}>
            <Text style={styles.headerText}>{title}</Text>
          </View>
          <View style={{ ...styles.hundredCenter, flex: 1 }}>
            <Text
              onPress={() => {
                console.log(dataArray);
                navigation.navigate("AddPlan", dataArray);
              }}
              style={{
                bottom: 12,
                ...globalFontStyles.NB_14,
                color: "#007AFF",
              }}
            >
              Edit
            </Text>
          </View>
        </View>
        {customDrawer()}
      </>
    );
  };

  const StickyPad = (moduleName, TargetGrade, NumMcs, key) => {
    return (
      <View
        style={{
          ...styles.stickPadContainer,
          backgroundColor: colorArray[key % 5].btm,
        }}
      >
        <View
          style={{
            ...styles.oneCenter,
            backgroundColor: colorArray[key % 5].top,
          }}
        >
          <EntypoIcon
            name="pin"
            size={20}
            color={colorArray[key % 5].pin}
            style={{ left: 10, bottom: 5 }}
          />
        </View>
        <View style={{ flex: 5, flexDirection: "column" }}>
          <View
            style={{
              ...styles.twoStart,
              backgroundColor: colorArray[key % 5].btm,
            }}
          >
            <Text
              style={{
                left: 15,
                ...globalFontStyles.NB_15,
                color: "#4a4e5d",
              }}
            >{`Module: ${moduleName}`}</Text>
          </View>
          <View
            style={{
              ...styles.twoStart,
              backgroundColor: colorArray[key % 5].btm,
            }}
          >
            <Text
              style={{ left: 15, ...globalFontStyles.NB_15, color: "#4a4e5d" }}
            >{`Target grade: ${TargetGrade}`}</Text>
          </View>
          <View
            style={{
              ...styles.twoStart,
              backgroundColor: colorArray[key % 5].btm,
            }}
          >
            <Text
              style={{ left: 15, ...globalFontStyles.NB_15, color: "#4a4e5d" }}
            >{`MCs: ${NumMcs}`}</Text>
          </View>
          <View
            style={{
              ...styles.oneCenter,
              backgroundColor: colorArray[key % 5].btm,
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      {Header()}
      <View style={{ ...styles.oneCenter, backgroundColor: "transparent" }}>
        <View
          style={{
            ...styles.container,
            bottom: heightToAdjust,
            overflow: "hidden",
          }}
        >
          <View style={styles.headerAtPlan}>
            <Text style={{ ...globalFontStyles.NB_24, color: "#FFF8DC" }}>
              My Plans
            </Text>
            <View style={styles.lineAtPlan} />
          </View>

          <View style={{ flex: 12, flexDirection: "row" }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
              numColumns={2}
              data={dataArray}
              keyExtractor={(item) => item.key}
              renderItem={({ item }) =>
                StickyPad(
                  item.moduleName,
                  item.TargetGrade,
                  item.NumMcs,
                  item.key
                )
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ViewPlan;

const styles = StyleSheet.create({
  container: {
    height: 0.86 * height,
    width: 0.95 * width,
    borderRadius: 20,
    backgroundColor: "#DEB887",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  oneCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  hundredCenter: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  headerText: {
    bottom: 10,
    ...globalFontStyles.NB_20,
    color: "#232323",
  },
  headerDesign: {
    width: width,
    height: 0.11 * height,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.3,
    backgroundColor: "#f9f9f9",
  },
  lineAtPlan: {
    width: 0.85 * width,
    height: 0.002 * height,
    borderRadius: 60,
    backgroundColor: "#FFF8DC",
  },
  headerAtPlan: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  stickPadContainer: {
    width: width * 0.435,
    height: 0.2 * height,
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginVertical: 10,
    marginHorizontal: 0.02 * width,
  },
  twoStart: {
    flex: 2,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  drawer: {
    height: height,
  },
  avatar: {
    margin: 8,
  },
});
