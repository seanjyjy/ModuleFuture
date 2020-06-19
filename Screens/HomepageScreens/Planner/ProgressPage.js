import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { globalFontStyles } from "../../../Component/GlobalFont";
import CircularBarProgress from "../../../Component/CircularBarProgress";
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ProgressPage = () => {
  const [capGoalDenominator, setcapGoalDenominator] = useState(4.5);
  const [cap, setCap] = useState(4.4);

  const [MCprogressTotal, setMCprogressTotal] = useState(160);
  const [MCs, setMCs] = useState(110);
  const [progress, setProgress] = useState((MCs / MCprogressTotal) * 100); // this is to track and display the amount in the circle progress
  const [progress2, setProgress2] = useState((cap / capGoalDenominator) * 100); // this is to track and display the amount in the circle progress

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeAreaStyle}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Icon
            name="home"
            size={30}
            style={{ color: "white", right: 0.02 * width }}
          />
        </View>
        <View
          style={{
            flex: 4,
            justifyContent: "center",
            alignItems: "center",
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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon
            name="cog"
            size={30}
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
        <View style={styles.largerRec}></View>

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
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
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
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
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
                    justifyContent: "center",
                    alignItems: "center",
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
                    justifyContent: "center",
                    alignItems: "center",
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
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
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
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
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
});
