import {StyleSheet, TouchableOpacity} from "react-native";
import React from "react";


const YesNoButton = (props) => {
    return (
        <TouchableOpacity
            style={styles.buttonDesign2}
            activeOpacity= {0.875}
            onPress = {() => props.func()}
        >
            {props.children}
        </TouchableOpacity>
    )
}

export default YesNoButton;

const styles = StyleSheet.create({
    buttonDesign2: {
        height:65,
        backgroundColor:"#FB5581",
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 40,
        width:160,
        elevation: 20,
        shadowOffset:{width: 5,  height: 5},
        shadowColor: 'black',
        shadowOpacity: 0.1
    }
})