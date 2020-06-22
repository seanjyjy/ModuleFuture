import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Dimensions,
} from "react-native";
import Header from "../../../Component/Header";
import { Icon } from "react-native-eva-icons";
import { globalFontStyles } from "../../../Component/GlobalFont";
import EditButton from "../../../Component/EditButton";
import AddModuleButton from "../../../Component/AddModuleButton";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Foundation = ({ navigation }) => {
    const [editMode, setEdit] = useState(false);

    const array = [
        {
            key: 1,
            name: "CS1101S Programming Methodology",
            grade: "B+",
            sem: "Y1S1",
            taken: true,
        },
        {
            key: 2,
            name: "CS2030 Programming Methodology II",
            grade: "B+",
            sem: "Y1S1",
            taken: true,
        },
        {
            key: 3,
            name: "CS2040S Data Structures and Algorithms",
            grade: "B+",
            sem: "Y1S1",
            taken: true,
        },
        {
            key: 4,
            name: "CS1101S Programming Methodology",
            grade: "B+",
            sem: "Y1S1",
            taken: true,
        },
        {
            key: 5,
            name: "CS1101S Programming Methodology",
            grade: "",
            sem: "",
            taken: false,
        },
        {
            key: 6,
            name: "CS2106 Operating Systems",
            grade: "",
            sem: "",
            taken: false,
        },
        {
            // Should be false, but testing for fit if all are true
            key: 7,
            name: "CS3230 Design and Analysis of Algorithms",
            grade: "B",
            sem: "Y3S2",
            taken: true,
        },
    ];

    const holders = (name, grade, sem, taken) => (
        <View style={styles.headerText}>
            <View style={{ width: width * (editMode ? 0.47 : 0.52) }}>
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
            {editMode && taken ? (
                <Icon
                    name="trash-2-outline"
                    width={17}
                    height={17}
                    fill="#232323"
                    onPress={() => null}
                />
            ) : null}
        </View>
    );

    const Box = (props) => (
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
                        {editMode ? "" : "Module"}
                    </Text>
                    <Text
                        style={{
                            ...globalFontStyles.OSB_17,
                            color: "#232323",
                        }}
                    >
                        {editMode ? "" : "Grade"}
                    </Text>
                </View>
                <Text style={{ ...globalFontStyles.OSB_17, color: "#232323" }}>
                    {editMode ? "" : "Sem"}
                </Text>
            </View>
            <FlatList
                data={array}
                keyExtractor={(item) => item.key.toString()}
                renderItem={({ item }) =>
                    holders(item.name, item.grade, item.sem, item.taken)
                }
            />
            {editMode ? (
                <AddModuleButton func={() => navigation.navigate("AddModule")} />
            ) : (
                <EditButton func={() => setEdit(!editMode)} />
            )}
        </View>
    );

    const styles = StyleSheet.create({
        container: {
            width: width * 0.9,
            height: Math.min(height * 0.8, array.length * 40 + 88),
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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header
                str={editMode ? "" : "Foundation"}
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
                rightChildren={<View />}
            />
            <Box />
        </SafeAreaView>
    );
};

export default Foundation;