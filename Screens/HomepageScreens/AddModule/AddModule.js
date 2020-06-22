import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { globalFontStyles } from "../../../Component/GlobalFont";
import { Icon } from "react-native-eva-icons";
import { FlatList } from "react-native-gesture-handler";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const AddModule = ({ navigation }) => {
  const header = (
    <SafeAreaView style={styles.header}>
      <View style={{ padding: width * 0.05 }}>
        <View style={styles.item}>
          <Icon
            fill="#666666"
            width={22}
            height={22}
            name="close-outline"
            onPress={() => navigation.navigate("Foundation")}
          />
          <Text
            style={{
              ...globalFontStyles.OSB_14,
              color: "#666666",
              marginLeft: 10,
            }}
          >
            Add a module
          </Text>
        </View>
        <View style={styles.second}>
          <View style={styles.item2}>
            <Icon
              style={{ marginLeft: 10 }}
              fill="#76768080"
              width={20}
              height={20}
              name="search-outline"
            />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
              <View style={{ flex: 1 }}>
                <TextInput
                  placeholder="Module code, name"
                  style={{ ...globalFontStyles.OSSB_15, marginLeft: 10 }}
                  placeholderTextColor="#76768080"
                ></TextInput>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <Icon
            style={{ marginLeft: 10 }}
            fill="#3FE2D3"
            width={28}
            height={28}
            name="options-2-outline"
          />
        </View>
      </View>
    </SafeAreaView>
  );

  return (
    <View style={styles.container}>
      {header}
      <FlatList></FlatList>
    </View>
  );
};

export default AddModule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "white",
    borderBottomWidth: 0.2,
    width: width,
    height: 0.17 * height,
    elevation: 5,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.1,
    alignContent: "flex-start",
    justifyContent: "center",
  },
  item: {
    flexDirection: "row",
    top: 10,
    alignItems: "center",
  },
  item2: {
    flexDirection: "row",
    backgroundColor: "#7676801F",
    height: "100%",
    width: "88%",
    alignItems: "center",
  },
  second: {
    top: 38,
    height: "50%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
