import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import Background from "./Background";

const Login = () => {
    return (
        <View style={styles.container}>
            <View style={styles.pos}>
                <Background style={styles.backgroundstyle}/>
            </View>
            <View style={styles.rowContainer}>
                <Text style={styles.smallSubscript}> Don't have an account?   </Text>
                <Text style={styles.smallSubscriptSignup}> Sign up</Text>
            </View>
        </View>);
}

const styles = StyleSheet.create({
    container: {
        flex:  1,
        alignItems: 'center'
    },
    pos: {
        /*
        iphone
        flex: 4.5
         */
        //andriod
        flex: 6
    },
    backgroundstyle: {
        flex: 1,
        position: 'absolute'
    },
    smallSubscript: {
        fontFamily: 'OpenSans-Italic',
        fontSize: 15,
        color: '#6e6e6e',
    },
    smallSubscriptSignup: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 15,
        color: '#fb5581',
        paddingRight: 5
    },
    rowContainer: {
        flex : 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Login;