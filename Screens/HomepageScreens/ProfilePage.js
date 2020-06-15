import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from "../../Component/Header"
const ProfilePage = () => {
    return (
        <View style={styles.container}>
            <Header str={"Profile"}/>
        </View>
    )
}

export default ProfilePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})