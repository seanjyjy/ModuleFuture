import { View } from "react-native";
import Animated from "react-native-reanimted";

const Dots = ({ index, currentIndex }) => {
  return (
    <Animated.View
      style={{ backgroundColor: "cyan", width: 8, height: 8, borderRadius: 4 }}
    ></Animated.View>
  );
};

export default Dots;
