import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { globalFontStyles } from "../../../Component/GlobalFont";
import FilterItem from "../../../Component/FilterItem";

const FilterSection = (props) => {
  const textWithIcon1 = (name) => (
    <FilterItem
      text={name}
      box={true}
      reset={props.reset}
      click={(name, bool) => {
        props.click(name, bool);
      }}
      filterSet={props.filterSet}
    />
  );
  const convert = (text) =>
    text === "Level"
      ? "levels"
      : text === "Code"
      ? "codes"
      : text === "Semester"
      ? "semesters"
      : text;

  const [noOfItems, setNum] = useState(3);
  const array = props.array;
  const maxSize = array.length;
  const incrSize = () => setNum(noOfItems + 19);
  const decrSize = () => setNum(3);

  return (
    <View
      style={{
        borderBottomWidth: StyleSheet.hairlineWidth * 3,
        borderBottomColor: "#7070704D",
        marginTop: 30,
      }}
    >
      <Text
        style={{
          ...globalFontStyles.NSB_17,
          color: "#232323",
          marginBottom: 5,
        }}
      >
        {props.name}
      </Text>
      <FlatList
        data={array.slice(0, noOfItems)}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => textWithIcon1(item.name)}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 15,
          marginBottom: 30,
        }}
      >
        {noOfItems < maxSize ? (
          <View>
            <TouchableOpacity
              style={{
                paddingLeft: 4,
              }}
              activeOpacity={0.9}
              onPress={() => incrSize()}
            >
              <Text
                style={{
                  ...globalFontStyles.NR_14,
                  color: "#232323",
                  textDecorationLine: "underline",
                }}
              >
                Show more {convert(props.name)}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View></View>
        )}
        {noOfItems > 3 ? (
          <View>
            <TouchableOpacity
              style={{ paddingRight: 8 }}
              activeOpacity={0.9}
              onPress={() => decrSize()}
            >
              <Text
                style={{
                  ...globalFontStyles.NR_14,
                  color: "#232323",
                  textDecorationLine: "underline",
                }}
              >
                Hide {convert(props.name)}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default FilterSection;
