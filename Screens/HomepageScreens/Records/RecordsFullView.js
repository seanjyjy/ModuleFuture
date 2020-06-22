import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../../../Component/Header";
const RecordsFullView = () => {
    return (
        <View style={styles.container}>
            <Header
                str={"RecordsFullView"}
                leftChildren={<View />}
                rightChildren={<View />}
            />
        </View>
    );
};

export default RecordsFullView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});