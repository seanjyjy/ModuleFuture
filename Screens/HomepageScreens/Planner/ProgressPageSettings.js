import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
  ScrollView,
} from "react-native";
import { Surface } from "gl-react-expo";
import { GLSL, Node, Shaders } from "gl-react";
import { Value, call, useCode } from "react-native-reanimated";
import { hsv2color } from "react-native-redash";
import Box from "./Box";
import Picker, { CANVAS_SIZE } from "./Picker";
import { globalFontStyles } from "../../../Component/GlobalFont";
import FirebaseDB from "../../../FirebaseDB";
import Modal from "react-native-modal";
import { useSafeArea } from "react-native-safe-area-context";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

console.disableYellowBox = true;

const ProgressPageSettings = ({ navigation, route }) => {
  var convert = require("color-convert");
  const userID = route.params?.userID;
  const [totalMCs, setTotalMCs] = useState(160);
  const [TargetCAP, setTargetCAP] = useState(5);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [MCcolor, setMCcolor] = useState(
    route.params?.MCcolor ? route.params?.MCcolor : "#123456"
  );
  const [CAPcolor, setCAPcolor] = useState(
    route.params?.CAPcolor ? route.params?.CAPcolor : "#234567"
  );
  const [whereChange, setWhereChange] = useState(3);
  let finalH = 0;
  let finalS = 0;
  let finalH2 = 0;
  let finalS2 = 0;
  const shaders = Shaders.create({
    hue: {
      frag: GLSL`
  #define PI  3.141592653589793
  #define TAU 6.283185307179586
  precision highp float;
  varying vec2 uv;
  uniform float size;
  // https://stackoverflow.com/questions/15095909/from-rgb-to-hsv-in-opengl-glsl
  vec3 rgb2hsv(vec3 c)
  {
      vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
      vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
      vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
      float d = q.x - min(q.w, q.y);
      float e = 1.0e-10;
      return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
  }
  // All components are in the range [0…1], including hue.
  vec3 hsv2rgb(vec3 c)
  {
      vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
      vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
      return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }
  float quadraticIn(float t) {
    return t * t;
  }
  void main() {
    float mag = distance(uv, vec2(0.5));
    vec2 pos = vec2(0.5) - uv;
    float a = atan(pos.y, pos.x);
    float progress = a * 0.5 / PI + 0.5;
    gl_FragColor = mag < 0.5 ? vec4(hsv2rgb(vec3(progress, quadraticIn(mag * 2.0), 1.0)), 1.0) : vec4(0.0, 0.0, 0.0, 0.0);
  }
  `,
    },
  });

  const Hue = () => {
    const h = new Value(0);
    const s = new Value(0);
    const v = new Value(1);
    const backgroundColor = hsv2color(h, s, v);
    useCode(() => {
      return call([h], (h) => {
        finalH = h;
      });
    }, [h]);

    useCode(() => {
      return call([s], (s) => {
        finalS = s;
      });
    }, [s]);
    return (
      <View style={styles.container}>
        <View style={styles.hue}>
          <Surface style={styles.surface}>
            <Node shader={shaders.hue} />
          </Surface>
          <Picker {...{ h, s, backgroundColor }} />
        </View>
        <View
          style={{
            flex: 2,
            top: 20,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "flex-end",
              top: 15,
            }}
          >
            <Text
              style={{ top: 20, ...globalFontStyles.NB_17, color: "#0c0d34" }}
            >
              Color picked:
            </Text>
          </View>

          <Box {...{ h, s, backgroundColor }} />
        </View>
        {Platform.OS === "android" ? null : (
          <View style={{ flex: 1, flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderTopWidth: 0.7,
                borderColor: "#B5B5B5",
                borderRightWidth: 0.7,
              }}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ ...globalFontStyles.NB_14, color: "#007AFF" }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                borderTopWidth: 0.7,
                borderColor: "#B5B5B5",
              }}
              onPress={() => {
                setModalVisible(false);
                const newColor =
                  "#" + convert.hsv.hex.raw([finalH * 360, finalS * 100, 100]);
                if (whereChange === 3) {
                  setMCcolor(newColor);
                } else {
                  setCAPcolor(newColor);
                }
              }}
              activeOpacity={0.9}
            >
              <Text style={{ ...globalFontStyles.NB_14, color: "#007AFF" }}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const Hue2 = () => {
    const h = new Value(0);
    const s = new Value(0);
    const v = new Value(1);
    const backgroundColor = hsv2color(h, s, v);
    useCode(() => {
      return call([h], (h) => {
        finalH2 = h;
      });
    }, [h]);

    useCode(() => {
      return call([s], (s) => {
        finalS2 = s;
      });
    }, [s]);
    return (
      <View style={styles.container}>
        <View style={styles.hue}>
          <Surface style={styles.surface}>
            <Node shader={shaders.hue} />
          </Surface>
          <Picker {...{ h, s, backgroundColor }} />
        </View>
        <View
          style={{
            flex: 2,
            top: 20,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
              justifyContent: "flex-start",
              alignItems: "flex-end",
              top: 15,
            }}
          >
            <Text
              style={{ top: 20, ...globalFontStyles.NB_17, color: "#0c0d34" }}
            >
              Color picked:
            </Text>
          </View>

          <Box {...{ h, s, backgroundColor }} />
        </View>
      </View>
    );
  };

  const questions = (questions, displays, key) => {
    return (
      <View
        style={{
          height: 65,
          flexDirection: "row",
        }}
      >
        <View
          style={{
            ...styles.questionLeft,
            borderBottomWidth:
              Platform.OS === "android" ? (key === 2 ? 0.7 : 0) : 0,
          }}
        >
          <Text style={{ ...globalFontStyles.NB_15, left: 20 }}>
            {questions}
          </Text>
        </View>
        <View style={{ ...styles.questionRight, borderBottomWidth: 0.7 }}>
          <TextInput
            keyboardType="numeric"
            onChangeText={(val) => {
              if (key === 1) {
                setTotalMCs(val);
              } else {
                setTargetCAP(val);
              }
            }}
            placeholder={displays}
            style={{ height: 40, width: 200, left: 15 }}
          />
        </View>
      </View>
    );
  };

  const questions2 = (questions, key) => {
    return (
      <View style={{ height: 65, flexDirection: "row" }}>
        <View
          style={{
            ...styles.questionLeft,
            borderBottomWidth: key === 4 ? 0.7 : 0,
          }}
        >
          <Text style={{ ...globalFontStyles.NB_15, left: 20 }}>
            {questions}
          </Text>
        </View>
        <View style={{ ...styles.questionRight, borderBottomWidth: 0.7 }}>
          <TouchableOpacity
            style={{
              height: 40,
              width: 80,
              backgroundColor: key === 3 ? MCcolor : CAPcolor,
            }}
            onPress={() => {
              if (Platform.OS !== "android") {
                if (key === 3) {
                  setModalTitle("Color for MC progression circle");
                  setWhereChange(3);
                } else {
                  setModalTitle("Color for CAP progression circle");
                  setWhereChange(4);
                }
                setModalVisible(true);
              }
            }}
          />
        </View>
      </View>
    );
  };

  const checkInValidInput = (val) => {
    return isNaN(val);
  };

  const modal = () => {
    return (
      <Modal
        style={{
          ...styles.modalBox,
          marginVertical: height * 0.06 + useSafeArea().top * 2,
        }}
        propagateSwipe={true}
        backdropOpacity={0.3}
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropTransitionOutTiming={0}
        isVisible={modalVisible}
        onBackdropPress={() => {
          setModalVisible(true);
        }}
        onBackButtonPress={() => {
          setModalVisible(true);
        }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ ...globalFontStyles.NB_20, color: "#0c0d34", top: 20 }}
            >
              {modalTitle}
            </Text>
          </View>
          <View style={{ flex: 10 }}>{Hue()}</View>
        </View>
      </Modal>
    );
  };
  return (
    <>
      {/* ----------------------------------------------------------------- HIGHLIGHT--------------------------------------------------------------------------- */}
      <View style={styles.topPortion}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.9}
          style={styles.headerLeft}
        >
          <Text style={{ ...globalFontStyles.NB_14, color: "#232323" }}>
            Cancel
          </Text>
        </TouchableOpacity>
        <View style={styles.headerMiddle}>
          <Text style={{ ...globalFontStyles.NB_17, color: "#232323" }}>
            Options
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            if (
              (checkInValidInput(TargetCAP) && TargetCAP <= 0) ||
              TargetCAP > 5
            ) {
              Alert.alert(
                "Warning",
                `Invalid value of ${TargetCAP} inputted into target CAP. It should be more than 0 and less than 5`,
                [{ text: "Cancel", onPress: () => {} }],
                { cancelable: false }
              );
            } else if (checkInValidInput(totalMCs) || totalMCs <= 0) {
              Alert.alert(
                "Warning",
                `Invalid value of ${totalMCs} inputted into total MCs`,
                [{ text: "Cancel", onPress: () => {} }],
                { cancelable: false }
              );
            } else {
              const usersRef = FirebaseDB.firestore()
                .collection("users")
                .doc(userID);

              if (Platform.OS === "android") {
                const androidMCColor =
                  "#" + convert.hsv.hex.raw([finalH * 360, finalS * 100, 100]);
                const androidCAPColor =
                  "#" +
                  convert.hsv.hex.raw([finalH2 * 360, finalS2 * 100, 100]);
                const defaultColor = "#" + convert.hsv.hex.raw([0, 0, 100]);

                if (
                  androidMCColor === defaultColor &&
                  androidCAPColor === defaultColor
                ) {
                  return navigation.navigate("ProgressPage", {
                    items: [
                      totalMCs,
                      TargetCAP,
                      route.params?.MCcolor,
                      route.params?.CAPcolor,
                    ],
                    from: "ProgressPageSettings",
                  });
                } else if (androidMCColor === defaultColor) {
                  usersRef.update({
                    totalMCs: parseInt(totalMCs),
                    TargetCAP: parseFloat(parseFloat(TargetCAP).toFixed(2)),
                    CAPcolor: androidCAPColor,
                  });
                  return navigation.navigate("ProgressPage", {
                    items: [
                      totalMCs,
                      TargetCAP,
                      route.params?.MCcolor,
                      androidCAPColor,
                    ],
                    from: "ProgressPageSettings",
                  });
                } else if (androidCAPColor === defaultColor) {
                  usersRef.update({
                    totalMCs: parseInt(totalMCs),
                    TargetCAP: parseFloat(parseFloat(TargetCAP).toFixed(2)),
                    MCcolor: androidMCColor,
                  });
                  return navigation.navigate("ProgressPage", {
                    items: [
                      totalMCs,
                      TargetCAP,
                      androidMCColor,
                      route.params?.CAPcolor,
                    ],
                    from: "ProgressPageSettings",
                  });
                } else {
                  usersRef.update({
                    totalMCs: parseInt(totalMCs),
                    TargetCAP: parseFloat(parseFloat(TargetCAP).toFixed(2)),
                    MCcolor: androidMCColor,
                    CAPcolor: androidCAPColor,
                  });

                  return navigation.navigate("ProgressPage", {
                    items: [
                      totalMCs,
                      TargetCAP,
                      androidMCColor,
                      androidCAPColor,
                    ],
                    from: "ProgressPageSettings",
                  });
                }
              } else {
                usersRef.update({
                  totalMCs: parseInt(totalMCs),
                  TargetCAP: parseFloat(parseFloat(TargetCAP).toFixed(2)),
                  MCcolor: MCcolor,
                  CAPcolor: CAPcolor,
                });
                navigation.navigate("ProgressPage", {
                  items: [totalMCs, TargetCAP, MCcolor, CAPcolor],
                  from: "ProgressPageSettings",
                });
              }
            }
          }}
          activeOpacity={0.9}
          style={styles.headerRight}
        >
          <Text style={{ ...globalFontStyles.NB_14, color: "#007AFF" }}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
      {/* ----------------------------------------------------------------- BOTTOM --------------------------------------------------------------------------- */}
      {Platform.OS === "android" ? (
        <ScrollView style={styles.btmPortion}>
          {questions("Total MCs", "160", 1)}
          {questions("Target CAP", "0-5", 2)}
          <Text
            style={{
              alignSelf: "center",
              ...globalFontStyles.NB_20,
              color: "#0c0d34",
              top: 15,
            }}
          >
            Colors for MC progression circle
          </Text>
          {Hue()}
          <Text
            style={{
              alignSelf: "center",
              ...globalFontStyles.NB_20,
              color: "#0c0d34",
              top: 15,
            }}
          >
            Colors for CAP progression circle
          </Text>
          {Hue2()}
          <View style={{ height: 20 }} />
        </ScrollView>
      ) : (
        <View style={styles.btmPortion}>
          {questions("Total MCs", "160", 1)}
          {questions("Target CAP", "0-5", 2)}
          {questions2("MC color", 3)}
          {questions2("CAP color", 4)}
        </View>
      )}
      {modal()}
    </>
  );
};

export default ProgressPageSettings;

const styles = StyleSheet.create({
  topPortion: {
    height: 0.11 * height,
    flexDirection: "row",
    borderBottomWidth: 0.7,
    borderColor: "#B5B5B5",
    backgroundColor: "#F7F7F7",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  btmPortion: {
    flex: 1,
  },
  questionRight: {
    height: "100%",
    width: width,
    justifyContent: "center",
    alignItems: "flex-start",
    borderColor: "#B5B5B5",
  },
  questionLeft: {
    height: "100%",
    width: 120,
    justifyContent: "center",
    alignItems: "flex-start",
    borderColor: "#B5B5B5",
  },
  headerLeft: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    bottom: 13,
  },
  headerMiddle: {
    flex: 4,
    justifyContent: "flex-end",
    alignItems: "center",
    bottom: 13,
  },
  headerRight: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    bottom: 13,
  },
  modalBox: {
    alignSelf: "center",
    width: width * 0.9,
    borderRadius: 25,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  surface: {
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
  },
  hue: {
    flex: 6,
    top: 30,
    alignSelf: "center",
  },
});
