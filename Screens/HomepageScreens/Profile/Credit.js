import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../../../Component/Header";
import { globalFontStyles } from "../../../Component/GlobalFont";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Credit = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <Header
        str={"About"}
        leftChildren={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.9}
            style={styles.backArrowEasyClicking}
          >
            <Ionicons
              name="md-arrow-round-back"
              size={25}
              style={{ color: "#232323" }}
            />
          </TouchableOpacity>
        }
        rightChildren={<View />}
      />

      <View style={styles.containerStyling}>
        <ImageBackground
          source={require("../../../assets/woodBG.png")}
          style={styles.imageStyling}
          imageStyle={{ borderRadius: 20 }}
        >
          <View style={styles.creditDesign}>
            <ScrollView style={{ marginHorizontal: 20 }}>
              <Text style={styles.biggestWords}>About</Text>
              <Text style={styles.biggerWords}>
                This app was initially customized for SoC students. Since then,
                we have extended its functionality to all other courses as well!
                If there is something you wish to be included in the app, do
                suggest it to us!
              </Text>
              <Text style={styles.biggestWords}>Note</Text>
              <Text style={styles.biggerWords}>
                There will be some deviation between different Platform mainly
                IOS vs Android phones
              </Text>
              <Text style={styles.biggestWords}>Developers</Text>
              <Text style={styles.biggerWords}>Keane Chan Jun Yu</Text>
              <Text style={styles.biggerWords}>Lum Jian Yang Sean</Text>
              <Text style={styles.biggestWords}>Photo Credits</Text>
              <Text style={styles.biggerWords}>
                Photo by Tirachard Kumtanom from Pexels
              </Text>
              <Text style={styles.biggerWords}>
                Photo by PixaBay from Pexels
              </Text>
              <Text style={styles.biggerWords}>
                Photo by Jessica Lewis from Pexels
              </Text>
              <Text style={styles.biggerWords}>
                Photo by Jess Bailey Designs from Pexels
              </Text>
              <Text style={styles.biggerWords}>
                Photo by Bich Tran from Pexels
              </Text>
              <Text style={styles.biggerWords}>
                Photo by Madison Inouye from Pexels
              </Text>
              <Text style={styles.biggerWords}>
                Photo by Content Pixie from Pexels
              </Text>
              <Text style={styles.biggerWords}>Photo from pngtree.com</Text>
            </ScrollView>
            <View style={{ height: 40 }}>
              <Text
                style={styles.tncStyle}
                onPress={() =>
                  navigation.navigate("TnC", { fromWhere: "Credit" })
                }
              >
                Terms & Conditions.
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default Credit;

const styles = StyleSheet.create({
  backArrowEasyClicking: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  biggerWords: {
    marginTop: 10,
    ...globalFontStyles.NSB_13,
    left: 5,
    color: "#FFFDD0",
  },
  biggestWords: {
    left: 5,
    marginTop: 10,
    ...globalFontStyles.NBEB_24,
    textDecorationLine: "underline",
    color: "white",
  },
  tncStyle: {
    textDecorationLine: "underline",
    alignSelf: "center",
    left: 5,
    ...globalFontStyles.NB_13,
    color: "#f0f0f0",
    top: 1,
  },
  creditDesign: {
    height: "100%",
    width: "95%",
    alignSelf: "center",
    paddingVertical: 5,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  containerStyling: {
    width: width - 26,
    height: 0.82 * height,
    top: 10,
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: "white",
    elevation: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    overflow: Platform.OS === "android" ? "hidden" : null,
    alignSelf: "center",
  },
  imageStyling: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
});
