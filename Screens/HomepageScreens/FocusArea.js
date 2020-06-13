import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const FocusArea = () => {
    return (
        <View style={styles.container}>
            <Text>
                FOCUS AREA
            </Text>
        </View>
    )
}

export default FocusArea;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})