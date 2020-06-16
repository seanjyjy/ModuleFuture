import React, {useState} from "react";
import { View, StyleSheet, Dimensions, Platform,Text, TouchableOpacity} from "react-native";

const FrontPage = () => {
    return (
        <View style={styles.container}>
            <Text>
                hello world
            </Text>
        </View>
    )
}

export default FrontPage;

const styles = StyleSheet.create({
    container: {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})