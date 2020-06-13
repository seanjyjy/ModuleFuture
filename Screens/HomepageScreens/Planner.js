import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Planner = () => {
    return (
        <View style={styles.container}>
            <Text>
                PLANNER
            </Text>
        </View>
    )
}

export default Planner;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})