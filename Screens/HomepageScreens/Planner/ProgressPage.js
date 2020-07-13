import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicon from "react-native-vector-icons/Ionicons";
import { globalFontStyles } from "../../../Component/GlobalFont";
import CircularBarProgress from "../../../Component/CircularBarProgress";
import { LineChart } from "react-native-chart-kit";
import Modal from "react-native-modal";
import FirebaseDB from "../../../FirebaseDB";
import { set } from "react-native-reanimated";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ProgressPage = ({ navigation, route }) => {
  const [lineData, setLineData] = useState([]);
  const [showGraph, setShowGraph] = useState(false);
  const [OverallData, setOverallData] = useState([]);
  const [previousCap, setPreviousCap] = useState(0);
  const [allowClicks, setAllowClicks] = useState(false);
  useEffect(() => {
    if (route.params?.items && route.params?.from === "ProgressPageSettings") {
      const first = route.params?.items[0];
      const second = route.params?.items[1];

      setMCprogressTotal(first);
      setcapGoalDenominator(second);
      setProgress((Math.min(MCs, first) / second) * 100);
      setProgress2((Math.min(cap, second) / second) * 100);
      setCircleLeft(
        whatCircle((Math.min(MCs, first) / first) * 100, MCs, first, "#169A7F")
      );
      setCircleRight(
        whatCircle(
          (Math.min(cap, second) / second) * 100,
          cap,
          second,
          "#B25DE4"
        )
      );
      setTextToShow(whatText((Math.min(cap, second) / second) * 100));
    }

    if (
      route.params?.usersDetails &&
      route.params?.usersDetails.CapArray.length > 0 &&
      route.params?.userID &&
      (route.params?.from === "ContentPage" ||
        route.params?.from === "ViewPlan")
    ) {
      const arr = route.params?.usersDetails.CapArray;
      setUserID(route.params?.userID);
      if (arr.length > 0) {
        let usersCurrentCap = arr[arr.length - 1].OverallCap;
        let usersOverallMc = arr[arr.length - 1].OverallMc;
        let usersTARGETCAP = route.params?.usersDetails.TargetCAP;
        let usersTARGETMC = route.params?.usersDetails.totalMCs;
        let tempLabels = [];
        let tempData = [];
        for (let i = 0; i < arr.length; i++) {
          tempLabels.push(arr[i].Semester);
          tempData.push(arr[i].OverallCap);
        }
        setLineData({
          labels: tempLabels,
          datasets: [{ data: tempData, strokeWidth: 2 }],
        });
        setOverallData(route.params?.usersDetails.CapArray);
        setCap(usersCurrentCap);
        setMCs(usersOverallMc);
        setShowGraph(true);
        setProgress(
          (Math.min(usersOverallMc, MCprogressTotal) / MCprogressTotal) * 100
        );
        setProgress2(
          (Math.min(usersCurrentCap, capGoalDenominator) / capGoalDenominator) *
            100
        );
        setCircleLeft(
          whatCircle(
            (Math.min(usersOverallMc, MCprogressTotal) / MCprogressTotal) * 100,
            usersOverallMc,
            usersTARGETMC,
            "#169A7F"
          )
        );
        setCircleRight(
          whatCircle(
            (Math.min(usersCurrentCap, capGoalDenominator) /
              capGoalDenominator) *
              100,
            usersCurrentCap,
            usersTARGETCAP,
            "#B25DE4"
          )
        );
        setTextToShow(
          whatText(
            (Math.min(usersCurrentCap, capGoalDenominator) /
              capGoalDenominator) *
              100
          )
        );
      }
      setAllowClicks(true);
    } else {
      setAllowClicks(false);
      //GET THE DATA FROM THE USERS TO SEE TO SHOW TILL Y4S2 OR Y5S2
      if (route.params?.gradSem === "Y3S1") {
        setLineData({ labels: arrayY3S1, datasets: datasetsForAll });
      } else if (route.params?.gradSem === "Y3S2") {
        setLineData({ labels: arrayY3S2, datasets: datasetsForAll });
      } else if (route.params?.gradSem === "Y4S1") {
        setLineData({ labels: arrayY4S1, datasets: datasetsForAll });
      } else if (route.params?.gradSem === "Y4S2") {
        setLineData({ labels: arrayY4S2, datasets: datasetsForAll });
      } else if (route.params?.gradSem === "Y5S1") {
        setLineData({ labels: arrayY5S1, datasets: datasetsForAll });
      } else {
        setLineData({ labels: arrayY5S2, datasets: datasetsForAll });
      }
      setShowGraph(true);
      setProgress(0);
      setProgress2(0);
      setCircleLeft(whatCircle(0, 0, 160, "#169A7F"));
      setCircleRight(whatCircle(0, 0, 5, "#B25DE4"));
      setTextToShow(whatText(0));
    }
  }, [route.params?.items, route.params?.usersDetails]);

  const arrayY3S1 = ["Y1S1", "Y1S2", "Y2S1", "Y2S1", "Y3S1"];
  const arrayY3S2 = [...arrayY3S1, "Y3S2"];
  const arrayY4S1 = [...arrayY3S2, "Y4S1"];
  const arrayY4S2 = [...arrayY4S1, "Y4S2"];
  const arrayY5S1 = [...arrayY4S2, "Y5S1"];
  const arrayY5S2 = [...arrayY5S1, "Y5S2"];
  const datasetsForAll = [
    {
      data: [0],
      strokeWidth: 2,
    },
  ];

  // ***********************************************this data is going to get from the back end data*****************************************************

  const [userID, setUserID] = useState("");
  const [cap, setCap] = useState(0); // ********************************** 8this data is calculated from user's current standing *************************************
  const [MCs, setMCs] = useState(0); //**********************************/ this data is calculated from user's current standing ************************************

  const [
    OverallMCsTakenForThatSemUsedInCap,
    setOverallMCsTakenForThatSemUsedInCap,
  ] = useState(0);
  const [OverAllMcsUsedInCap, setOverallMcsUsedInCap] = useState(0);
  const [OverallMCsTakenForThatSem, setOverallMCsTakenForThatSem] = useState(0);
  const [MCsTakenForThatSem, setMCsTakenForThatSem] = useState(0); // to be used in the graph?
  const [SemesterCap, setSemesterCap] = useState(0); // to be used in the graph?
  const [OverallCap, setOverallCap] = useState(0); // to be used in the graph?

  const [MCprogressTotal, setMCprogressTotal] = useState(160); // this data is to get from the User (160 as the default value)
  const [capGoalDenominator, setcapGoalDenominator] = useState(5); // this data is to get from the User (5 as the default value)

  const [progress, setProgress] = useState((MCs / MCprogressTotal) * 100); // this is to track and display the amount in the circle progress
  const [progress2, setProgress2] = useState((cap / capGoalDenominator) * 100); // this is to track and display the amount in the circle progress

  const [circleLeft, setCircleLeft] = useState(
    <CircularBarProgress
      progress={progress}
      size={0.4 * width}
      strokeWidth={7}
      circleOuterStroke="#169A7F"
      circleInnerStroke="#E5E5E5"
      numerator={MCs}
      denominator={MCprogressTotal}
    />
  );

  const [circleRight, setCircleRight] = useState(
    <CircularBarProgress
      progress={progress2}
      size={0.4 * width}
      strokeWidth={7}
      circleOuterStroke="#B25DE4"
      circleInnerStroke="#E5E5E5"
      numerator={cap}
      denominator={capGoalDenominator}
    />
  );

  const whatCircle = (progress, numerator, denominator, color) => {
    return (
      <CircularBarProgress
        progress={progress}
        size={0.4 * width}
        strokeWidth={7}
        circleOuterStroke={color}
        circleInnerStroke="#E5E5E5"
        numerator={numerator}
        denominator={denominator}
      />
    );
  };
  const [textToShow, setTextToShow] = useState("");
  const chartConfig = {
    backgroundGradientFrom: "white",
    backgroundGradientTo: "white",
    decimalPlaces: 2,
    color: (opacity = 1) => "#FB5581",
    fillShadowGradient: "#FB5581",
    fillShadowGradientOpacity: "1",
    labelColor: (opacity = 1) => "#8A8A8A",

    propsForDots: {
      r: "2",
      strokeWidth: "1",
      stroke: "#FB5581",
      fill: "#FB5581",
    },
    propsForBackgroundLines: {
      strokeWidth: "1",
      stroke: "#E2E2E2",
      strokeDasharray: "",
      opacity: "1",
    },
    propsForLabels: {
      fontSize: "10",
    },
  };

  const ModalData = (
    index,
    func1,
    func2,
    func3,
    func4,
    func5,
    func6,
    func7
  ) => {
    func1(OverallData[index].OverallCap);
    func2(OverallData[index].OverallMc);
    func3(OverallData[index].SemestralCap);
    func4(OverallData[index].SemestralMc);
    func6(OverallData[index].MCcountedToCap);
    func7(OverallData[index].TotalMcUsedInCap);
    if (index === 0) {
      func5(OverallData[index].OverallCap);
    } else {
      func5(OverallData[index - 1].OverallCap);
    }
  };

  const whatText = (progress2) => {
    return progress2 >= 100
      ? "You have did it!"
      : progress2 >= 90
      ? "You are almost there keep it up!"
      : progress2 >= 80
      ? "Keep up the good work!"
      : progress2 >= 70
      ? "You can do it!"
      : progress2 >= 60
      ? "Dont give up!"
      : "Perserve on!";
  };

  const TextonPopup = (props) => {
    return (
      <View
        style={{
          ...styles.TextonPopupStyle,
          bottom: props.bottom,
          ...props.extraProps,
        }}
      >
        <View style={styles.progressTextStyle}>
          <Text style={{ ...globalFontStyles.NB_13, color: "#2D4056" }}>
            {props.name}
          </Text>
        </View>
        <View
          style={{
            flex: 4,
            ...styles.centerMax,
            bottom: 0.005 * height,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                ...globalFontStyles.NB_28,
                color: "#2D4056",
              }}
            >
              {props.cap}
            </Text>
            <View style={{ left: 5, bottom: 0.003 * height }}>
              {props.needChangeColor ? (
                props.previousCap === props.cap ? (
                  <View />
                ) : props.previousCap < props.cap ? (
                  <Icon name="long-arrow-up" size={27} color="#28E586" />
                ) : (
                  <Icon name="long-arrow-down" size={27} color="#FD5D5D" />
                )
              ) : (
                <View />
              )}
            </View>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                ...globalFontStyles.OSR_12,
                color: props.needChangeColor
                  ? props.previousCap === props.cap
                    ? "black"
                    : props.previousCap < props.cap
                    ? "#28E586"
                    : "#FD5D5D"
                  : "black",
              }}
            >
              {props.needChangeColor
                ? props.previousCap === props.cap
                  ? ""
                  : props.previousCap < props.cap
                  ? "+" +
                    (
                      ((props.cap - props.previousCap) / props.previousCap) *
                      100
                    ).toFixed(2) +
                    "%"
                  : "-" +
                    (
                      (Math.abs(props.cap - props.previousCap) /
                        props.previousCap) *
                      100
                    ).toFixed(2) +
                    "%"
                : ""}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const [modalVisible, setModalVisible] = useState(false);
  const popoutBox = (OverallCap, SemesterCap, MCsTakenForThatSem) => {
    return (
      <Modal
        style={styles.modalBox}
        backdropOpacity={0.3}
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
        <View style={styles.oneCenter}>
          <Text style={{ ...styles.popoutheader, top: 5 }}>Performance</Text>
        </View>
        <View style={styles.LineForPressingDots} />
        <View
          style={{
            flex: 6,
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <TextonPopup
              name="Overall CAP"
              cap={OverallCap}
              previousCap={previousCap}
              needChangeColor={true}
              bottom={0}
              extraProps={{ left: 4 }}
            />
            <TextonPopup
              name="Semester CAP"
              cap={SemesterCap}
              previousCap={previousCap}
              needChangeColor={true}
              bottom={0}
              extraProps={{ right: 4 }}
            />
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <TextonPopup
              name="Overall Mc"
              cap={OverallMCsTakenForThatSem}
              needChangeColor={false}
              bottom={5}
              extraProps={{ left: 4 }}
            />
            <TextonPopup
              name="Semestral Mc"
              cap={MCsTakenForThatSem}
              needChangeColor={false}
              bottom={5}
              extraProps={{ right: 4 }}
            />
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <TextonPopup
              name={"    Overall Mc \ncounted to CAP"}
              cap={OverAllMcsUsedInCap}
              needChangeColor={false}
              bottom={5}
              extraProps={{ left: 4 }}
            />
            <TextonPopup
              name={"  Semestral Mc \ncounted to CAP"}
              cap={OverallMCsTakenForThatSemUsedInCap}
              needChangeColor={false}
              bottom={5}
              extraProps={{ right: 4 }}
            />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaStyle}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate("Content Page")}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Ionicon
            name="md-arrow-round-back"
            size={25}
            style={{ color: "white", right: 0.02 * width }}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 4,
            ...styles.center,
          }}
        >
          <Text
            style={{ ...globalFontStyles.NB_34, color: "white", bottom: 5 }}
          >
            Progress
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ProgressPageSettings", { userID: userID })
          }
          activeOpacity={0.9}
          style={{
            flex: 1,
            ...styles.center,
          }}
        >
          <Icon
            name="cog"
            size={23}
            style={{ color: "white", right: 0.02 * width, bottom: 2 }}
          />
        </TouchableOpacity>
      </SafeAreaView>

      <View style={styles.holdingGraph}>
        <View style={styles.largerRec}>
          <View style={{ ...styles.largerRec, overflow: "hidden" }}>
            {showGraph ? (
              <LineChart
                onDataPointClick={({ index }) => {
                  if (allowClicks) {
                    ModalData(
                      index,
                      (val) => setOverallCap(val),
                      (val) => setOverallMCsTakenForThatSem(val),
                      (val) => setSemesterCap(val),
                      (val) => setMCsTakenForThatSem(val),
                      (val) => setPreviousCap(val),
                      (val) => setOverallMCsTakenForThatSemUsedInCap(val),
                      (val) => setOverallMcsUsedInCap(val)
                    );
                    setModalVisible(true);
                  }
                }}
                data={lineData}
                width={width * 0.95}
                height={height * 0.36}
                yAxisInterval={1}
                yLabelsOffset={10}
                segments={4}
                chartConfig={chartConfig}
                bezier
                style={styles.lineChartStyle}
              />
            ) : (
              <View />
            )}
            {popoutBox(OverallCap, SemesterCap, MCsTakenForThatSem)}
          </View>
        </View>

        <View
          style={{
            flex: 9,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          {/* ------------------------SMALLER RECTANGLE ON THE LEFT---------------------------------------------------- */}
          <View style={styles.smallerRec}>
            {/* ------------------------------ MC PROGRESS ------------------------------------------------- */}
            <View
              style={{
                flex: 1,
                ...styles.centerMax,
              }}
            >
              <Text style={{ ...globalFontStyles.OSEB_17, color: "#686868" }}>
                MC progress
              </Text>
            </View>
            {/* ------------------------------CIRCLE PROGRESS -------------------------------------------------------- */}
            <View
              style={{
                flex: 4,
                ...styles.centerMax,
              }}
            >
              {circleLeft}
            </View>

            <View
              style={{
                width: "90%",
                height: 1,
                backgroundColor: "#B7B7B7",
              }}
            />

            {/* ----------------------------------------BOTTOM SECTION---------------------------------------------- */}
            <View
              style={{
                flex: 2,
                width: "100%",
                height: "100%",
                flexDirection: "column",
              }}
            >
              {/* --------------------------------------------------------ABOVE INFORMATION-------------------------------------- */}
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "flex-end",
                  }}
                >
                  <View
                    style={{ backgroundColor: "#169A7F", ...styles.dotDesign }}
                  />
                </View>

                <View
                  style={{
                    flex: 4,
                    justifyContent: "center",
                    alignItems: "flex-start",
                    left: 5,
                  }}
                >
                  <Text
                    style={{ ...globalFontStyles.OSB_15, color: "#686868" }}
                  >
                    MCs taken
                  </Text>
                </View>
                <View
                  style={{
                    flex: 2,
                    ...styles.center,
                  }}
                >
                  <Text
                    style={{ ...globalFontStyles.OSB_15, color: "#686868" }}
                  >
                    {MCs}
                  </Text>
                </View>
              </View>

              {/* --------------------------------------------------------BOTTOM INFORMATION-------------------------------------------- */}
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "flex-end",
                  }}
                >
                  <View
                    style={{ backgroundColor: "#169A7F", ...styles.dotDesign }}
                  />
                </View>

                <View
                  style={{
                    flex: 4,
                    justifyContent: "center",
                    alignItems: "flex-start",
                    left: 5,
                  }}
                >
                  <Text
                    style={{ ...globalFontStyles.OSB_15, color: "#686868" }}
                  >
                    MCs left
                  </Text>
                </View>

                <View
                  style={{
                    flex: 2,
                    ...styles.center,
                  }}
                >
                  <Text
                    style={{ ...globalFontStyles.OSB_15, color: "#686868" }}
                  >
                    {Math.max(MCprogressTotal - MCs, 0)}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.smallerRec}>
            {/* --------------------------------------------------CAP GOAL-------------------------------------- */}
            <View
              style={{
                flex: 1,
                ...styles.centerMax,
              }}
            >
              <Text style={{ ...globalFontStyles.OSB_17, color: "#686868" }}>
                CAP Goal
              </Text>
            </View>

            {/* ----------------------------------------------Circular Progression ------------------------------------------ */}
            <View
              style={{
                flex: 4,
                ...styles.centerMax,
              }}
            >
              {circleRight}
            </View>

            <View
              style={{ width: "90%", height: 1, backgroundColor: "#B7B7B7" }}
            />

            {/* ---------------------------------------------------BOTTOM SECTION------------------------------------------------ */}
            <View
              style={{
                flex: 2,
                width: "100%",
                height: "100%",
                flexDirection: "row",
              }}
            >
              {/* --------------------------------------------left Section------------------------------------------------ */}
              <View
                style={{
                  flex: 1,
                  top: 0.0175 * height,
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <View
                  style={{ backgroundColor: "#B25DE4", ...styles.dotDesign }}
                />
              </View>
              {/* -------------------------------------------Right Section ----------------------------------------------------- */}
              <View
                style={{
                  flex: 4,
                  top: 0.013 * height,
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <Text style={{ ...globalFontStyles.OSB_15, color: "#686868" }}>
                  {textToShow}
                </Text>
              </View>
              {/* ------------end------------------------- */}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProgressPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  smallerRec: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    bottom: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  largerRec: {
    flex: 7,
    borderRadius: 20,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  safeAreaStyle: {
    flex: 2,
    backgroundColor: "#A4A1FB",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  centerMax: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: Platform.OS === "android" ? "#F6F6F6" : "#F8F8FD",
    alignSelf: "center",
    marginVertical: height * 0.2,
    width: width * 0.9,
    borderRadius: 25,
  },
  oneCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  popoutheader: {
    ...globalFontStyles.NB_20,
    color: "#333333",
  },
  progressTextStyle: {
    flex: 2,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: Platform.OS === "android" ? "#DDDEDE" : "#E2E6E4",
  },
  TextonPopupStyle: {
    flex: 1,
    marginHorizontal: 0.03 * width,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 0.01 * height,
    borderRadius: 20,
    backgroundColor: Platform.OS === "android" ? "#EFF0F8" : "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  holdingGraph: {
    flex: 11,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    bottom: 0.03 * height,
  },
  dotDesign: {
    width: 0.035 * width,
    height: 0.035 * width,
    borderRadius: (0.035 * width) / 2,
  },
  LineForPressingDots: {
    borderBottomWidth: 1,
    borderColor: "#DDDDDD",
    width: "90%",
    height: 10,
    left: 0.05 * width,
  },
  lineChartStyle: {
    borderRadius: 20,
    top: 0.03 * height,
    right: 0.04 * width,
  },
});
