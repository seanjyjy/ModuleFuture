import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { globalFontStyles } from "./GlobalFont";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ColouredList = (props) => {
  const colors = props.colors;

  // TODO:
  const content = (key) => {
    const circle = (
      <View
        style={{
          backgroundColor: colors[key - 1],
          width: 0.03 * width,
          height: 0.03 * width,
          borderRadius: (0.03 * width) / 2,
          // top: 4.5,
          // right: 3,
        }}
      />
    );

    const text = (input) => (
      <Text style={{ ...globalFontStyles.NBEB_14, color: "#686868" }}>
        {input}
      </Text>
    );

    const line = (text1, text2) => (
      <View style={styles.innerText}>
        <View
          style={{
            flexDirection: "row",
            alignContent: "center",
          }}
        >
          {circle}
          {text(text1)}
        </View>
        {text(text2)}
      </View>
    );

    return (
      <View style={styles.whitelayer}>
        {line(props.text1, props.text2)}
        {line("CAP", props.text3)}
      </View>
    );
  };

  const holders = (key, name) => (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={() => {
        props.transition();
      }}
    >
      <View style={{ ...styles.colorTop, backgroundColor: colors[key - 1] }}>
        <Text style={{ ...globalFontStyles.NBEB_17, color: "#F4F4F4" }}>
          {name}
        </Text>
      </View>
      {content(key)}
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, position: "relative" }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        keyExtractor={(item) => item.key.toString()}
        data={props.array}
        renderItem={({ item }) => holders(item.key, item.name)}
        ListFooterComponent={<View style={{ height: 70 }} />}
      />
    </View>
  );
};

export default ColouredList;

const styles = StyleSheet.create({
  container: {
    width: (width - 40) / 2,
    height: height / 5,
    marginVertical: 12,
    marginHorizontal: 10,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    flexDirection: "column",
    backgroundColor: "white",
  },
  colorTop: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "32%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: (width - 40) / 16,
  },
  innerText: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  whitelayer: {
    height: "60%",
    width: "80%",
    alignItems: "stretch",
  },
});
