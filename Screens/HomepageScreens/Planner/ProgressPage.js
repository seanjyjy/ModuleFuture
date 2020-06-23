import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { globalFontStyles } from "../../../Component/GlobalFont";
import CircularBarProgress from "../../../Component/CircularBarProgress";
import { LineChart } from "react-native-chart-kit";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ProgressPage = ({ navigation, route }) => {
  React.useEffect(() => {
    if (route.params?.items) {
      setSegments(route.params?.items[0]);
      setMCprogressTotal(route.params?.items[1]);
      setcapGoalDenominator(route.params?.items[2]);
    }
  });

  // ***********************************************this data is going to get from the back end data*****************************************************
  const linedata = {
    labels: ["Y1S1", "Y1S2", "Y2S1", "Y2S2", "Y3S1", "Y3S2"],
    datasets: [
      {
        data: [3.9, 4.58, 4.15, 4.32, 4.75, 4.9],
        strokeWidth: 2,
      },
    ],
  };

  const [capGoalDenominator, setcapGoalDenominator] = useState(() => {
    const initialState = 5;
    return initialState;
  }); // this data is to get from the User (5 as the default value)
  const [cap, setCap] = useState(0); // ********************************** 8this data is calculated from user's current standing *************************************

  const [MCprogressTotal, setMCprogressTotal] = useState(160); // this data is to get from the User (160 as the default value)
  const [MCs, setMCs] = useState(0); //**********************************/ this data is calculated from user's current standing ************************************
  const [progress, setProgress] = useState((MCs / MCprogressTotal) * 100); // this is to track and display the amount in the circle progress
  const [progress2, setProgress2] = useState((cap / capGoalDenominator) * 100); // this is to track and display the amount in the circle progress

  const [numberOfSegments, setSegments] = useState(4); // this data is to receive from User on the preference on number of Y-axis segments (4 as the default value)

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
          <Icon
            name="arrow-left"
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
          <Text style={{ ...globalFontStyles.NB_34, color: "white" }}>
            Progress
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("ProgressPageSettings")}
          activeOpacity={0.9}
          style={{
            flex: 1,
            ...styles.center,
          }}
        >
          <Icon
            name="cog"
            size={25}
            style={{ color: "white", right: 0.02 * width }}
          />
        </TouchableOpacity>
      </SafeAreaView>

      <View
        style={{
          flex: 11,
          width: "100%",
          height: "100%",
          flexDirection: "column",
          bottom: 0.03 * height,
        }}
      >
        <View style={styles.largerRec}>
          <View style={{ ...styles.largerRec, overflow: "hidden" }}>
            <LineChart
              onDataPointClick={() => console.log("hello")}
              data={linedata}
              width={width * 0.95}
              height={height * 0.36}
              yAxisInterval={1}
              yLabelsOffset={10}
              segments={numberOfSegments}
              chartConfig={{
                backgroundGradientFrom: "white",
                backgroundGradientTo: "white",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(251, 85, 129, ${opacity})`,
                fillShadowGradient: "#FB5581",
                fillShadowGradientOpacity: "1",
                labelColor: (opacity = 1) => `rgba(138, 138, 138, ${opacity})`,

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
              }}
              bezier
              style={{
                marginRight: 30,
                marginVertical: 8,
                borderRadius: 20,
              }}
            />
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
              <CircularBarProgress
                progress={progress}
                size={0.4 * width}
                strokeWidth={7}
                circleOuterStroke="#169A7F"
                circleInnerStroke="#E5E5E5"
                numerator={MCs}
                denominator={MCprogressTotal}
              />
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
                    style={{
                      backgroundColor: "#169A7F",
                      width: 0.035 * width,
                      height: 0.035 * width,
                      borderRadius: (0.035 * width) / 2,
                    }}
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
                    style={{
                      backgroundColor: "#169A7F",
                      width: 0.035 * width,
                      height: 0.035 * width,
                      borderRadius: (0.035 * width) / 2,
                    }}
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
                    {MCprogressTotal - MCs}
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
              <CircularBarProgress
                progress={progress2}
                size={0.4 * width}
                strokeWidth={7}
                circleOuterStroke="#B25DE4"
                circleInnerStroke="#E5E5E5"
                numerator={cap}
                denominator={capGoalDenominator}
              />
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
                  style={{
                    backgroundColor: "#B25DE4",
                    width: 0.035 * width,
                    height: 0.035 * width,
                    borderRadius: (0.035 * width) / 2,
                  }}
                />
              </View>
              {/* -------------------------------------------Right Section ----------------------------------------------------- */}
              <View
                style={{
                  flex: 4,
                  top: 0.015 * height,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  right: 5,
                }}
              >
                <Text style={{ ...globalFontStyles.OSB_15, color: "#686868" }}>
                  {progress2 >= 90
                    ? "You are almost there keep it up!"
                    : progress2 >= 80
                    ? "Keep up the good work"
                    : progress2 >= 70
                    ? "You can do it"
                    : progress2 >= 60
                    ? "Dont give up!"
                    : "Perserve on!"}
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
  },
  safeAreaStyle: {
    flex: 2,
    backgroundColor: "#A4A1FB",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
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
});