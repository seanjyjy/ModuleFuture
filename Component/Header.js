import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, Dimensions, Platform} from 'react-native';
import {globalFontStyles} from "./GlobalFont";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const Header = (props) => {
    console.log("hdear height is" + (0.11 * height))
    return (
        <SafeAreaView style={styles.header}>
            <Text style={{...globalFontStyles.OSB_17, color: '#232323', top : Platform.OS === 'android' ? 3 : -3,}}>
                {props.str}
            </Text>
        </SafeAreaView>
    );
}

export default Header;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderBottomWidth: 0.2,
        width: width,
        height: 0.11 * height,
        elevation: 5,
        shadowOffset:{width: 5,  height: 5},
        shadowColor: 'black',
        shadowOpacity: 0.1
    },
})