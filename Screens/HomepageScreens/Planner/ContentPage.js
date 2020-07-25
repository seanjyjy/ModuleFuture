import React, { useState, useEffect, useLayoutEffect } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  ImageBackground,
  Alert,
  Image,
  Platform,
} from "react-native";
import { globalFontStyles } from "../../../Component/GlobalFont";
import Entypo from "react-native-vector-icons/Entypo";
import CardWallet from "../../../Component/CardWallet";
import FontisoIcon from "react-native-vector-icons/Fontisto";
import { Menu } from "../../../Data/CardList";
import FirebaseDB from "../../../FirebaseDB";
import { useSafeArea, SafeAreaView } from "react-native-safe-area-context";
import { copilot, walkthroughable, CopilotStep } from "react-native-copilot";
import Button from "./Button";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const WalkthroughableView = walkthroughable(View);
const WalkthroughableTouchableOpacity = walkthroughable(TouchableOpacity);

const ContentPage = (props) => {
  const usaB = useSafeArea().bottom;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const userInfo = FirebaseDB.firestore().collection("users");
  const userID = FirebaseDB.auth().currentUser.uid;
  const [usersDetails, setUsersDetails] = useState([]);

  const [title, setTitle] = useState("");
  const [docLoc, setDocLoc] = useState("");
  const [size, setSize] = useState(0);
  const [fromWhere, setFromWhere] = useState("");
  const [dataArray, setDataArray] = useState([]);
  const [favPlanArray, setFavPlanArray] = useState([]);
  const [favPlanInfo, setFavPlanInfo] = useState([]);
  const [cardArray, setCardArray] = useState([]);
  const [gradSem, setGradSem] = useState("");
  const [selectedplansinfo, setselectedplansinfo] = useState([]);
  const num = (val) => {
    return val === "Y3S1"
      ? 4
      : val === "Y3S2"
      ? 5
      : val === "Y4S1"
      ? 6
      : val === "Y4S2"
      ? 7
      : val === "Y5S1"
      ? 8
      : 9;
  };

  const [y, setY] = useState(new Animated.Value(0));

  useEffect(() => {
    if (!FirebaseDB.auth().currentUser.emailVerified) {
      props.start();
    }
    const unsub = userInfo.doc(userID).onSnapshot((document) => {
      const data = document.data();
      const val = data.expectedSemGrad;
      setGradSem(val);
      setselectedplansinfo(data.SelectedPlansInfo);
      setUsersDetails(data);
      if (data.favPlanArray.length > 0 && data.favPlanInfo.length > 0) {
        setFavPlanArray(data.favPlanArray);
        setFavPlanInfo(data.favPlanInfo);
        setTitle(data.favPlanInfo[0]);
        setDocLoc(data.favPlanInfo[1]);
        setSize(data.favPlanInfo[2]);
        setFromWhere(data.favPlanInfo[3]);
        setDataArray(data.favPlanArray);
      } else {
        setFavPlanArray([]);
        setFavPlanInfo([]);
      }
      let tempArr = [];
      for (let i = 0; i <= num(val); i++) {
        tempArr.push(Menu[i]);
      }
      tempArr.push(Menu[10]);
      setCardArray(tempArr);
    });
    return () => unsub();
  }, []);

  const onScroll = Animated.event(
    [
      {
        nativeEvent: { contentOffset: { y } },
      },
    ],
    { useNativeDriver: true }
  );

  const totalSumTotalMc = (val, sem) => {
    let totalMCs = 0;
    let totalSum = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i].Semester === sem) {
        break;
      }
      totalMCs += val[i].McUsedInCap;
      totalSum += val[i].McUsedInCap * val[i].Cap;
    }
    return [totalSum, totalMCs];
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <ImageBackground
          style={styles.header}
          source={require("../../../assets/HeaderBG.png")}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <CopilotStep
              text="This is where you can view your favourite plan!"
              order={2}
              name="favourite plans"
            >
              <WalkthroughableView style={styles.walkableIcon}>
                <FontisoIcon
                  name="favorite"
                  size={22}
                  color="#E59090"
                  style={{ bottom: 0.018 * height }}
                  onPress={() => {
                    if (favPlanArray.length > 0 && favPlanInfo.length > 0) {
                      navigation.navigate("ViewPlan", {
                        item: [title, docLoc, size, fromWhere, dataArray, true],
                      });
                    } else {
                      Alert.alert(
                        "Oops",
                        "You have not selected a favourite plan yet!",
                        [{ text: "Cancel", onPress: () => {} }],
                        { cancelable: false }
                      );
                    }
                  }}
                />
              </WalkthroughableView>
            </CopilotStep>
          </View>

          <View
            style={{
              flex: 2,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Text style={styles.plannerTextDesign}>Planner</Text>
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <CopilotStep
              text="This is where you can view your progress!"
              order={3}
              name="progress page"
            >
              <WalkthroughableTouchableOpacity
                onPress={() => {
                  navigation.navigate("ProgressPage", {
                    usersDetails: usersDetails,
                    from: "ContentPage",
                    userID: userID,
                    gradSem: gradSem,
                  });
                }}
                style={styles.barGraphHolderDesign}
              >
                <Image
                  source={require("../../../assets/bargraph.png")}
                  style={{ resizeMode: "contain", flex: 1, bottom: 3 }}
                />
              </WalkthroughableTouchableOpacity>
            </CopilotStep>
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          height: 5,
          width: "100%",
          backgroundColor: "#f9f9f9",
        }}
      />

      <View
        style={{
          flex: 1,
          backgroundColor: "#f9f9f9",
        }}
      >
        <CopilotStep
          text="Here is where you can select your plans!"
          order={1}
          name="plans"
        >
          <WalkthroughableView
            style={{
              height: 0.887 * height - 80 - usaB,
              width: "100%",
              top: 20,
            }}
          >
            <View
              style={{
                height: 0.887 * height - 65 - usaB,
                width: "100%",
                bottom: 20,
              }}
            >
              <AnimatedFlatList
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                bounces={false}
                data={cardArray}
                keyExtractor={(item) => item.key.toString()}
                renderItem={({ item }) => {
                  return CardWallet(y, item.key.toString(), item.card, () => [
                    userID,
                    item.PageName,
                    totalSumTotalMc(selectedplansinfo, item.PageName),
                    selectedplansinfo,
                    navigation,
                  ]);
                }}
                {...{ onScroll }}
              />
            </View>
          </WalkthroughableView>
        </CopilotStep>
        <View
          style={{
            height: 65,
            width: "100%",
            flexDirection: "row",
          }}
        >
          <CopilotStep
            text="This is where you can create and view all your plans!"
            order={4}
            name="planner"
          >
            <WalkthroughableView style={styles.areaPerIcon} />
          </CopilotStep>
          <CopilotStep
            text="This is where you can view your modules statistics!"
            order={5}
            name="records"
          >
            <WalkthroughableView style={styles.areaPerIcon} />
          </CopilotStep>
          <CopilotStep
            text="This is where you can view your focus areas!"
            order={6}
            name="focus"
          >
            <WalkthroughableView style={styles.areaPerIcon} />
          </CopilotStep>
          <CopilotStep
            text="Here is where you can search for information on each module!"
            order={7}
            name="module"
          >
            <WalkthroughableView style={styles.areaPerIcon} />
          </CopilotStep>
          <CopilotStep
            text="This is where you can edit your profile as well as view some pro-tips! (Recommended to view)"
            order={8}
            name="profile"
          >
            <WalkthroughableView style={styles.areaPerIcon} />
          </CopilotStep>
        </View>
      </View>
    </View>
  );
};
const TooltipComponent = ({
  isFirstStep,
  isLastStep,
  handleNext,
  handlePrev,
  handleStop,
  currentStep,
}) => (
  <View>
    <View style={styles.tooltipContainer}>
      <Text testID="stepDescription" style={styles.tooltipText}>
        {currentStep.text}
      </Text>
    </View>
    <View style={styles.bottomBar}>
      {!isLastStep ? (
        <TouchableOpacity onPress={handleStop}>
          <Button style={{ ...globalFontStyles.NB_13 }}>{"Skip"}</Button>
        </TouchableOpacity>
      ) : null}
      {!isFirstStep ? (
        <TouchableOpacity onPress={handlePrev}>
          <Button style={{ ...globalFontStyles.NB_13 }}>{"Previous"}</Button>
        </TouchableOpacity>
      ) : null}
      {!isLastStep ? (
        <TouchableOpacity onPress={handleNext}>
          <Button style={{ ...globalFontStyles.NB_13 }}>{"Next"}</Button>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleStop}>
          <Button style={{ ...globalFontStyles.NB_13 }}>{"Finish"}</Button>
        </TouchableOpacity>
      )}
    </View>
  </View>
);
const StepNumberComponent = ({
  isFirstStep,
  isLastStep,
  currentStep,
  currentStepNumber,
}) => (
  <View style={styles.stepNumber}>
    <Text style={[styles.stepNumberText]}>{currentStepNumber}</Text>
  </View>
);
const MARGIN = 8;
const WIDTH = Dimensions.get("window").width - 2 * MARGIN;
export default copilot({
  overlay: "svg", // or 'view'
  animated: true, // or false
  tooltipComponent: TooltipComponent,
  tooltipStyle: {
    width: WIDTH,
    maxWidth: WIDTH,
    left: MARGIN,
  },
  stepNumberComponent: StepNumberComponent,
})(ContentPage);

const styles = StyleSheet.create({
  header: {
    height: 0.113 * height,
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
  walkableIcon: {
    justifyContent: "flex-end",
    alignItems: "center",
    width: "50%",
    height: "50%",
    right: 0.05 * width,
  },
  areaPerIcon: {
    width: "20%",
    bottom: Platform.OS === "android" ? 34 : -0.02 * height,
  },
  tooltipContainer: { flex: 1 },
  tooltipText: { ...globalFontStyles.NB_14, color: "#232323" },
  bottomBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  stepNumber: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 14,
    borderColor: "#FFFFFF",
    backgroundColor: "#FB5581",
  },
  stepNumberText: {
    fontSize: 10,
    backgroundColor: "transparent",
    color: "#FFFFFF",
  },
  plannerTextDesign: {
    ...globalFontStyles.NB_28,
    color: "#FB5581",
    bottom: 5,
    left: 3,
  },
  barGraphHolderDesign: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    left: 10,
  },
});
