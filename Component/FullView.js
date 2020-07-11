import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import { Icon } from "react-native-eva-icons";
import { globalFontStyles } from "./GlobalFont";
import EditButton from "./EditButton";
import AddModuleButton from "./AddModuleButton";

const FullView = (props) => {
  const holders = (name, grade, sem, taken) => (
    <View style={styles.headerText}>
      <View style={{ width: width * (props.editMode ? 0.47 : 0.52) }}>
        <Text
          numberOfLines={1}
          style={{
            ...globalFontStyles.OSSB_14,
            color: taken ? "#232323" : "#68686880",
          }}
        >
          {name}
        </Text>
      </View>
      <Text style={{ ...globalFontStyles.OSSB_14, color: "#232323" }}>
        {grade}
      </Text>
      <Text style={{ ...globalFontStyles.OSSB_14, color: "#232323" }}>
        {sem}
      </Text>
      {props.editMode ? (
        <Icon
          name="trash-2-outline"
          width={30}
          height={17}
          fill="#232323"
          onPress={() => {
            props.delete();
          }}
        />
      ) : null}
    </View>
  );

  const Box = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            width: width * 0.71,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ ...globalFontStyles.OSB_17, color: "#232323" }}>
            {props.editMode ? "" : "Module"}
          </Text>
          <Text
            style={{
              ...globalFontStyles.OSB_17,
              color: "#232323",
            }}
          >
            {props.editMode ? "" : "Grade"}
          </Text>
        </View>
        <Text style={{ ...globalFontStyles.OSB_17, color: "#232323" }}>
          {props.editMode ? "" : "Sem"}
        </Text>
      </View>
      <FlatList
        data={props.data}
        keyExtractor={(item) => item.key.toString()}
        renderItem={({ item }) =>
          holders(item.name, item.grade, item.sem, item.taken)
        }
      />
      {props.editMode ? (
        <AddModuleButton func={() => props.nav()} />
      ) : (
        <EditButton func={() => props.editButton()} />
      )}
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      width: width * 0.9,
      height: Math.min(height * 0.88, props.data.length * 40 + 88),
      alignSelf: "center",
      marginTop: 20,
      borderRadius: 14,
      borderColor: "#C6C6C6",
      justifyContent: "space-between",
      alignContent: "stretch",
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
    header: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
      borderBottomColor: "#A0A0A0",
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    headerText: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
    },
  });

  return <View>{Box()}</View>;
};
