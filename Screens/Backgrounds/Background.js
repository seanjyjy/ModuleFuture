import React from 'react';
import {StyleSheet, View, ImageBackground, Platform, Keyboard, TouchableWithoutFeedback} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const Background = props => {
    return (
        <TouchableWithoutFeedback onPress = {Keyboard.dismiss} accessible = {false}>
            <View style={styles.container}>
                <ImageBackground
                    source={require('../../assets/loginbackgroundtest2.png')}
                    style={styles.image}
                >
                    {props.children}
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    container: {
        flex : 1,
        minHeight: hp("100%")
    },
    image: {
        flex :1,
        resizeMode:'cover',
        bottom: Platform.OS === 'android' ? 40 : null
    }
})
export default Background;
