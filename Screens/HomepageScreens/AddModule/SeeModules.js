import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-eva-icons";
import { globalFontStyles } from "../../../Component/GlobalFont";
import { useIsFocused } from "@react-navigation/native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const SeeModules = ({ navigation, route }) => {
  const [modArr, setModArr] = useState([]);
  const [MCcount, setMCcount] = useState(0);
  const text =
    route.params.location === "AddPlan" ? "Total MCs: " : "Total modules: ";
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route.params?.modDetails) {
      setModArr(route.params?.modDetails);
      setMCcount(route.params?.MC);
    }
  }, [isFocused, route.params?.modDetails]);

  const holders = (name, code, mc) => (
    <View style={styles.headerText}>
      <View style={{ width: width * 0.7 }}>
        <Text
          numberOfLines={1}
          style={{
            ...globalFontStyles.OSR_14,
            color: "#232323",
          }}
        >
          {`${name}`}
        </Text>
      </View>
      <Icon
        name="trash-2-outline"
        width={30}
        height={17}
        fill="#232323"
        onPress={() => {
          const newList = modArr.filter((x) => x.code !== code);
          setModArr(newList);
          setMCcount(MCcount - (text === "Total MCs: " ? mc : 1));
        }}
      />
    </View>
  );

  const header = () => (
    <View style={styles.headerDesign}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("AddModule", {
            newModules: modArr,
            value: MCcount,
          })
        }
        style={styles.flexOneCenterFlexEnd}
        activeOpacity={0.9}
      >
        <Text
          style={{ bottom: 10, ...globalFontStyles.NB_14, color: "#232323" }}
        >
          Back
        </Text>
      </TouchableOpacity>
      <View style={{ ...styles.flexThreeCenterFlexEnd }}>
        <Text
          style={{ bottom: 10, ...globalFontStyles.NB_20, color: "#232323" }}
        >
          Modules added
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          return navigation.navigate(route.params?.location, {
            modDetails: modArr,
            from: "AddModule",
          });
        }}
        style={styles.flexOneCenterFlexEnd}
        activeOpacity={0.9}
      >
        <Text
          style={{ bottom: 10, ...globalFontStyles.NB_14, color: "#007AFF" }}
        >
          Confirm
        </Text>
      </TouchableOpacity>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      width: width * 0.9,
      height: Math.min(height * 0.8, modArr.length * 50 + 60),
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
    headerText: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 15,
    },
    headerDesign: {
      height: 0.11 * height,
      width: "100%",
      flexDirection: "row",
      backgroundColor: "#f9f9f9",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
      borderBottomWidth: 1,
      borderColor: "#DDDDDD",
    },
    flexThreeCenterFlexEnd: {
      flex: 3,
      alignItems: "center",
      justifyContent: "flex-end",
    },
    flexOneCenterFlexEnd: {
      flex: 1,
      alignItems: "center",
      justifyContent: "flex-end",
    },
  });

  return (
    <View style={{ flex: 1 }}>
      {header()}
      <View style={styles.container}>
        <FlatList
          data={modArr}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => holders(item.name, item.code, item.MC)}
          ListFooterComponent={
            <Text
              style={{
                ...globalFontStyles.OSSB_17,
                padding: 15,
                paddingTop: 20,
              }}
            >{`${text}${MCcount}`}</Text>
          }
        />
      </View>
    </View>
  );
};

export default SeeModules;
