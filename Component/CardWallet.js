import React from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import FirebaseDB from "../FirebaseDB";

const ratio = 228 / 362;
const width = Dimensions.get("window").width;
const { height: wHeight } = Dimensions.get("window");

export const MARGIN = 20;
export const CARD_HEIGHT = width * 0.8 * ratio + MARGIN * 2;

const height = wHeight - 64;

const styles = StyleSheet.create({
  card: {
    marginVertical: MARGIN,
    alignSelf: "center",
    width: width * 0.8,
    borderRadius: 20,
    overflow: "hidden",
  },
});

const CardWallet = (y, index, card, PageName) => {
  const position = Animated.subtract(index * CARD_HEIGHT, y);
  const isDisappearing = -CARD_HEIGHT;
  const isTop = 0;
  const isBottom = height - CARD_HEIGHT;
  const isAppearing = height;
  const translateY = Animated.add(
    Animated.add(
      y,
      y.interpolate({
        inputRange: [0, 0.00001 + index * CARD_HEIGHT],
        outputRange: [0, -index * CARD_HEIGHT],
        extrapolateRight: "clamp",
      })
    ),
    position.interpolate({
      inputRange: [isBottom, isAppearing],
      outputRange: [0, -CARD_HEIGHT / 4],
      extrapolate: "clamp",
    })
  );
  const scale = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: "clamp",
  });
  const opacity = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
  });
  const infoExtractor = async (
    userID,
    whatSem,
    SumMcArr,
    selectedplansinfo
  ) => {
    const docLocCurr = userID.concat("_", whatSem);
    const plansArrayRef = FirebaseDB.firestore()
      .collection("plansArray")
      .doc(docLocCurr);

    let arrToPass = [];
    arrToPass[0] = userID;
    arrToPass[4] = selectedplansinfo;
    await plansArrayRef
      .get()
      .then((document) => {
        const val = document.data();
        if (val !== undefined && SumMcArr !== undefined) {
          const arr = val.yearSem;
          arrToPass[1] = arr;
          arrToPass[2] = val.selected;
          let tempArr = [];
          for (let i = 0; i < arr.length; i++) {
            const newTotalMcs = SumMcArr[1] + arr[i].MCs;
            const newTotalSum = SumMcArr[0] + arr[i].MCs * arr[i].Cap;
            const newCap = parseFloat((newTotalSum / newTotalMcs).toFixed(2));
            tempArr.push({
              SemestralCap: arr[i].useInCap ? arr[i].Cap : 0,
              OverallCap: newTotalMcs !== 0 ? newCap : 0,
              PlannedOverallCap: newTotalMcs !== 0 ? newCap : 0,
              PlannedCap: arr[i].useInCap ? 0 : arr[i].Cap,
              MCs: arr[i].MCs,
              LastUpdated: arr[i].LastUpdated,
              useInCap: arr[i].useInCap,
            });
          }
          arrToPass[3] = tempArr;
        } else {
          plansArrayRef.set({ yearSem: [], selected: "-1", ArrForRect: [] });
          arrToPass[1] = [];
          arrToPass[2] = "1";
          arrToPass[3] = [];
        }
      })
      .then(() => {});
    return arrToPass;
  };
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        justifyContent: "center",
        alignSelf: "center",
        width: 0.8 * width,
        height: CARD_HEIGHT,
      }}
      onPress={async () => {
        const arr = PageName();
        const arrToPass = await infoExtractor(arr[0], arr[1], arr[2], arr[3]);
        return arr[4].navigate(arr[1], { item: arrToPass });
      }}
    >
      <Animated.View
        style={[
          styles.card,
          { opacity, transform: [{ translateY }, { scale }] },
        ]}
        key={index}
      >
        {card}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default CardWallet;
