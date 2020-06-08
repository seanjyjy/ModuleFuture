import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Platform} from 'react-native';
import Background from "./Background";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {globalStyles} from "../Component/GlobalFont";

const Login = () => {
    return (<Background>
                <View style={{...styles.one}}>
                    <View style={{flexDirection: 'row', justifyContent:'space-evenly', width: 200}}>
                        <View>
                            <Text style={{ color: '#FC5185', ...globalStyles.OSSB_17}}>Sign In</Text>
                        </View>
                        <View style={styles.verticalLine}/>
                        <View>
                            <Text style={{color: '#2D4056', ...globalStyles.OSSB_17}}>Sign Up</Text>
                        </View>
                    </View>
                    <View style ={styles.horizontalLine}/>
                </View>

                <View style={{flex: 14}}>
                    <View style={styles.header}>
                        <MaterialCommunityIcons
                            name='account' size={30}
                            style={{...styles.iconDesign, right: 13}}/>
                        <TextInput
                            placeholder="Username"
                            placeholderTextColor='#7F8E9E'
                            style={{...globalStyles.OSR_17, right: 10, flex : 1, top: 7}}
                        />
                    </View>
                    <View style ={{...styles.header, top: 10}}>
                        <Ionicons
                            name="ios-lock" size={34}
                            style={{...styles.iconDesign, right: 10}}/>
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor='#7F8E9E'
                            style={{...globalStyles.OSR_17, right: 2, top: 7}}
                        />
                    </View>
                    <View style = {{top : 50, left: 30}}>
                        <TouchableOpacity
                            style={styles.buttonDesign}>
                            <Text style={{...globalStyles.OSR_17, color: 'white'}}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.textHeight}>
                    <Text style={{...globalStyles.OSI_15, color: '#6e6e6e'}}>Don't have an account?</Text>
                    <Text
                        onPress = {() => {}}
                        style={{...globalStyles.OSR_15, marginLeft: 5, color: '#fb5581', paddingRight: 5}}
                    >Sign up</Text>
                </View>
            </Background>);
}

const styles = StyleSheet.create({
    textHeight: {
        flex : Platform.OS === 'android' ? 0.75 : 2,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    header: {
        flexDirection:'row',
        borderBottomWidth: 1,
        borderColor: '#7F8E9E',
        padding : 10,
        marginHorizontal: 50,
        right: 20
    },
    iconDesign: {
        color:'#2D4056',
        top: 5
    },
    one: {
        flex: Platform.OS === 'android' ? 9 : 8,
         justifyContent:'center',
         alignItems: 'center'
    },
    buttonDesign: {
        height:70,
        backgroundColor:"#FB5581",
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 40,
        width:180,
    },
    verticalLine: {
        backgroundColor: '#2D4056', width: 2, height: 20, top : 4
    },
    horizontalLine: {
        backgroundColor: '#FC5185', width: 55, height: 2, right: 53, top: 5
    }
})
export default Login;