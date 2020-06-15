import React from "react";
import { View, StyleSheet, Dimensions, Platform, ImageBackground,Text } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import {globalFontStyles} from "../../../Component/GlobalFont"

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Page = (props) => {
  const heightOfImageAndroid = 0.89 * height - 60;
  const heightOfImageApple =
    0.89 * height -
    (useSafeArea().bottom > 0 ? useSafeArea().bottom - 5 : 0) -
    60;

    const androidBG = (props) => (
        <ImageBackground
            source={require("../../../assets/testpic2forAndroid.png")}
            style={{
                flex: 1,
                resizeMode: "stretch",
                justifyContent: "center",
                alignItems: 'center'
            }}
        >
            <View style={{width: '100%', height: '100%'}}>
                <View style={{flex : 1, alignItems:'center', top: 0.02 * height, right: 0.1 * width}}>
                    <Text style={{...globalFontStyles.NB_20, color: '#7B7D87'}}>
                        {props.year}
                    </Text>
                </View>
                <View style={{flex : 8, justifyContent: 'center', alignItems: 'center'}}>
                    {props.children}
                </View>
            </View>

        </ImageBackground>
    )

    const iphoneBG = (props) => (
        <ImageBackground
            source={require("../../../assets/testpic2.png")}
            style={{
                flex: 1,
                resizeMode: "stretch",
                justifyContent: "center",
                alignItems: 'center'
            }}
        >
            <View style={{width: '100%', height: '100%'}}>
                <View style={{flex : 1, alignItems:'center', top: 0.025 * height, right: 0.13 * width}}>
                    <Text style={{...globalFontStyles.NB_20, color: '#7B7D87'}}>
                        {props.year}
                    </Text>
                </View>
                <View style={{flex : 8, justifyContent: 'center', alignItems: 'center'}}>
                    {props.children}
                </View>
            </View>
        </ImageBackground>
    )


    return (
        <View style={{
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            backgroundColor: "white",
            elevation: 5,
            borderRadius: 20,
            height:
                Platform.OS === "android"
                    ? heightOfImageAndroid - 15
                    : heightOfImageApple - 26,
            top: Platform.OS === "android" ? 5 : 13,
            width: width - 26,
            left: 10
        }}>
            {Platform.OS === "android" ? androidBG(props) : iphoneBG(props)}
        </View>
    )

};

export default Page;

const styles = StyleSheet.create({});
