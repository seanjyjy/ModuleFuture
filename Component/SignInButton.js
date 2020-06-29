import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import { globalStyles } from "./GlobalStyle";
import React from "react";

const SignInButton = (props) => {
  const loader = () => {
    return (
      <ActivityIndicator
        animating={props.isLoading}
        style={{ color: "white" }}
      />
    );
  };

  const button = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.875}
        style={globalStyles.buttonDesign}
        onPress={() => props.func()}
      >
        {props.children}
      </TouchableOpacity>
    );
  };

  return (
    <View style={globalStyles.buttonDesign}>
      {props.isLoading ? loader() : button()}
    </View>
  );
};

export default SignInButton;
