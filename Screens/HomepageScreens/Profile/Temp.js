import React from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import Icons from "react-native-vector-icons/AntDesign";
import { copilot, walkthroughable, CopilotStep } from "react-native-copilot";
const WalkthroughableText = walkthroughable(Text);
const WalkthroughableImage = walkthroughable(Image);

{
  /* <TouchableOpacity style={styles.button} onPress={() => props.start()}>
<Text style={styles.buttonText}>START THE TUTORIAL!</Text>
</TouchableOpacity> */
}
const Temp = (props) => (
  <View style={styles.container}>
    {/* <CopilotStep
      text="Hey! This is the first step of the tour!"
      order={1}
      name="openApp"
    ></CopilotStep>
    <View style={styles.middleView}>
      <CopilotStep
        text="Here goes your profile picture!"
        order={2}
        name="secondText"
      ></CopilotStep>
    </View>
    <View style={styles.row}>
      <CopilotStep
        text="Here is an item in the corner of the screen."
        order={3}
        name="thirdText"
      ></CopilotStep>
    </View> */}
  </View>
);
export default copilot()(Temp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 40,
  },
});
