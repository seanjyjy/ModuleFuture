import React, { useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import ScreenPic from "./ScreenPic";
import SubText from "./SubText";
import Header from "../../../../Component/Header";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useScrollHandler } from "react-native-redash";
import Animated, { multiply, divide } from "react-native-reanimated";
import Dots from "./Dots";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const SlideScreen = (props) => {
  const slides = props.slides;
  const scroll = useRef(null);
  const { scrollHandler, x } = useScrollHandler();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <Header
        str={props.title}
        leftChildren={
          <Ionicons
            name="md-arrow-round-back"
            size={25}
            style={{ color: "#232323" }}
            onPress={() => navigation.goBack()}
          />
        }
      />
      <View style={styles.pictureSpace}>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          {...scrollHandler}
        >
          {slides.map(({ imageLink }, index) => (
            <ScreenPic key={index} imageLink={imageLink} />
          ))}
        </Animated.ScrollView>
      </View>
      <Animated.View
        style={{
          flex: 5,
          flexDirection: "row",
          width: width * slides.length,
          transform: [{ translateX: multiply(x, -1) }],
        }}
      >
        {slides.map(({ subtitle, description }, index) => (
          <SubText
            onPress={() => {
              if (scroll.current) {
                scroll.current
                  .getNode()
                  .scrollTo({ x: width * (index + 1), Animated: true });
              }
              if (index === slides.length - 1) {
                navigation.navigate(props.backTo);
              }
            }}
            key={index}
            last={index === slides.length - 1}
            {...{ subtitle, description }}
          />
        ))}
      </Animated.View>
      <View style={styles.dotDesign}>
        {slides.map((_, index) => (
          <Dots key={index} currentIndex={divide(x, width)} {...{ index, x }} />
        ))}
      </View>
    </View>
  );
};
export default SlideScreen;
const styles = StyleSheet.create({
  dotDesign: { flex: 1, flexDirection: "row", justifyContent: "center" },
  pictureSpace: {
    height: 0.61 * height,
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#DDDDDD",
  },
});
