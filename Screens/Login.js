import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import Background from "./Background";

const Login = () => {
    return (
        <View>
            <Background style={styles.backgroundstyle}/>
            <Text> hello wrld</Text>
        </View>);
}

const styles = StyleSheet.create({
    textDesign: {
        marginTop: 36,
        fontSize: 50
    },
    backgroundstyle: {
        flex :  1,
        position: 'absolute'
    }
});

export default Login;