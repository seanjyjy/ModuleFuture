import React from 'react';
import {View, StyleSheet, Dimensions, Platform, Text, Image} from "react-native";
import Animated from 'react-native-reanimated';
import {useSafeArea} from "react-native-safe-area-context";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Page = () => {

    const heightOfImageAndroid = 0.89 * height - 60
    const heightOfImageApple = 0.89 * height - (useSafeArea().bottom > 0 ? (useSafeArea().bottom - 5) : 0) - 60

    return (
        <View style={{
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            backgroundColor:'white',
            elevation: 5,
            borderRadius: 24,
            justifyContent: 'center',
            alignItems: 'center',
            height: (Platform.OS === "android" ? heightOfImageAndroid -10 : heightOfImageApple - 26) ,
            top: (Platform.OS === "android" ? 2 : 13),
            width: width - 26,
            left: 13}}>
            <Image source={require("../../../assets/testpic1.png")} style={{
                borderRadius: (Platform.OS === "android" ? 6 : 24),
                resizeMode:'contain',
                height: '100%',
                width: '100%',
            }}/>
        </View>
    )
}

export default Page;

const styles = StyleSheet.create({

})