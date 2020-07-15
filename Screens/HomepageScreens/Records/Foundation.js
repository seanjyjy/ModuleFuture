import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import Header from "../../../Component/Header";
import { Icon } from "react-native-eva-icons";
import { globalFontStyles } from "../../../Component/GlobalFont";
import EditButton from "../../../Component/EditButton";
import AddModuleButton from "../../../Component/AddModuleButton";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const hairlineWidth = StyleSheet.hairlineWidth;

const Foundation = ({ navigation, route }) => {
  const [editMode, setEdit] = useState(false);

  useEffect(() => {
    if (route.params?.modDetails) {
      const tempArr = [];
      for (let i = 0; i < notTaken.length; i++) {
        tempArr.push(notTaken[i]);
      }
      const receivedArr = route.params?.modDetails;
      for (let i = 0; i < receivedArr.length; i++) {
        tempArr.push(receivedArr[i]);
      }
      setNotTaken(tempArr);
    }
    if (route.params?.taken) {
      const type = route.params?.type;
      const toMatch = route.params?.context;
      const category =
        type === "Type" ? "type" : type === "Code" ? "codePrefix" : "level";

      const takenAll = route.params?.taken;
      const notTakenAll = route.params?.notTaken;
      const tempArr1 = takenAll.filter((x) => x[category] === toMatch);
      const tempArr2 = notTakenAll.filter((x) => x[category] === toMatch);
      setTaken(tempArr1);
      setNotTaken(tempArr2);
    }
  }, [route.params?.modDetails]);

  const [taken, setTaken] = useState([]);
  const [notTaken, setNotTaken] = useState([]);

  const holders = (item) => (
    <View style={styles.headerText}>
      <View style={{ width: width * (editMode ? 0.47 : 0.52) }}>
        <Text
          numberOfLines={1}
          style={{
            ...globalFontStyles.OSSB_14,
            color: "#232323",
          }}
        >
          {item.name}
        </Text>
      </View>
      <Text
        style={{
          ...globalFontStyles.OSSB_14,
          color: "#232323",
        }}
      >
        {item.grade}
      </Text>
      <Text style={{ ...globalFontStyles.OSSB_14, color: "#232323" }}>
        {item.sem}
      </Text>
    </View>
  );

  const holders2 = (item) => (
    <View style={styles.headerText}>
      <View style={{ width: width * (editMode ? 0.47 : 0.52) }}>
        <Text
          numberOfLines={1}
          style={{
            ...globalFontStyles.OSSB_14,
            color: "#68686880",
          }}
        >
          {item.name}
        </Text>
      </View>
      {editMode ? (
        <Icon
          name="trash-2-outline"
          width={30}
          height={17}
          fill="#232323"
          onPress={() => {
            const newList = notTaken.filter((x) => x.code !== item.code);
            setNotTaken(newList);
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
          <Text style={{ ...globalFontStyles.OSB_16, color: "#232323" }}>
            {editMode ? "" : "Module"}
          </Text>
          <Text
            style={{
              ...globalFontStyles.OSB_16,
              color: "#232323",
            }}
          >
            {editMode ? "" : "Grade"}
          </Text>
        </View>
        <Text style={{ ...globalFontStyles.OSB_16, color: "#232323" }}>
          {editMode ? "" : "Sem"}
        </Text>
      </View>
      <FlatList
        data={taken.concat(notTaken)}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) =>
          item.grade !== undefined ? holders(item) : holders2(item)
        }
      />
      {editMode ? (
        <AddModuleButton
          func={() => navigation.navigate("AddModule", { item: "Foundation" })}
        />
      ) : (
        <EditButton func={() => setEdit(!editMode)} />
      )}
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      width: width * 0.9,
      height: Math.min(
        height * 0.88,
        (taken.length + notTaken.length) * 37 + 125
      ),
      alignSelf: "center",
      marginTop: 20,
      borderRadius: 14,
      borderColor: "#A0A0A0",
      borderWidth: hairlineWidth,
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
      marginBottom: 8,
      borderBottomColor: "#A0A0A0",
      borderBottomWidth: hairlineWidth,
    },
    headerText: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <Header
        str={route.params?.title}
        leftChildren={
          <Icon
            name={editMode ? "close-outline" : "chevron-left-outline"}
            width={100}
            height={30}
            fill="#232323"
            onPress={() =>
              editMode ? setEdit(!editMode) : navigation.goBack()
            }
          />
        }
        rightChildren={null}
      />
      <Box />
    </View>
  );
};

export default Foundation;
