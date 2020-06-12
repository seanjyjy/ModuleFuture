import {View, TouchableOpacity} from "react-native";
import {globalStyles} from "./GlobalStyle";
import React from "react";

const SignInButton = (props) => {
    return (
        <View style = {{top : 50, left: 25}}>
            <TouchableOpacity
                activeOpacity= {0.875}
                style={globalStyles.buttonDesign}
                onPress = {() => props.func()}
            >
                {props.children}
            </TouchableOpacity>
        </View>
    )}

export default SignInButton;
