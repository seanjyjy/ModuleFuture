import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { globalFontStyles } from "./GlobalFont";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import { Icon } from "react-native-eva-icons";

const FilterItem = (props) => {
  const [toggled, setToggle] = useState(false);

  return (
    <TouchableOpacity
      style={styles.main}
      activeOpacity={0.65}
      onPress={() => setToggle(!toggled)}
    >
      <Text style={{ ...globalFontStyles.NR_14, color: "black" }}>
        {props.text}
      </Text>
      <View>
        {props.box ? (
          <Icon
            name={toggled ? "checkmark-square-2" : "square-outline"}
            width={25}
            height={25}
            fill={toggled ? "#232323" : "#00000080"}
          />
        ) : (
          <FontAwesomeIcons
            name={toggled ? "toggle-on" : "toggle-off"}
            size={25}
            color={toggled ? "#232323" : "grey"}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default FilterItem;

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 4,
    marginVertical: 8,
  },
});
