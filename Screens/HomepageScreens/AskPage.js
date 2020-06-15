import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from "../../Component/Header"
const AskPage = () => {
    return (
        <View style={styles.container}>
            <Header str={"Ask"}/>
        </View>
    )
}

export default AskPage;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})