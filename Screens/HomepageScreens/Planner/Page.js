import React from "react";
import { View, Dimensions, Platform, ImageBackground,Text } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import {globalFontStyles} from "../../../Component/GlobalFont"

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;


const Page = (props) => {

    const extraBottom = (useSafeArea().bottom > 0 ? useSafeArea().bottom - 5 : 0);
    const bottomTabHeight = 60;
    const headerHeight = 0.11 * height;
    const heightToUse = height - extraBottom - headerHeight - bottomTabHeight - 20;

    const BookMark = () => {
        return (
            <View style={{flex : 1, flexDirection:'column'}}>
                <View style={{height: heightToUse * 0.11, width: 0.175 * (width - 26), backgroundColor: '#A4A1FB'}}>

                </View>
                <View style= {{
                    bottom: heightToUse * 0.07,
                    width: 0,
                    height: 0,
                    borderLeftWidth: 0.088 * (width - 26),
                    borderRightWidth: 0.088 * (width - 26),
                    borderBottomWidth: heightToUse * 0.071,
                    borderStyle: 'solid',
                    backgroundColor: 'transparent',
                    borderLeftColor: 'transparent',
                    borderRightColor: 'transparent',
                    borderBottomColor: 'white'}}>
                </View>
            </View>
        )
    }

    return (
        <View style={{
            width: width - 26,
            height: heightToUse,
            top: 10,
            shadowOffset: {
                width: 3,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            backgroundColor: "white",
            elevation: 5,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            overflow: Platform.OS === "android" ? 'hidden' : null
        }}>
            <ImageBackground
                source={require("../../../assets/notebook1.jpg")}
                style={{
                    flex: 1,
                    resizeMode: "cover",
                    justifyContent: "center",
                    alignItems: 'center',
                }}
                imageStyle={{ borderRadius: 20}}
            >
                <View style={{width: '100%', height: '100%'}}>
                    <View style={{flex : 1, left: 0.09 * (width - 26), flexDirection: 'row'}}>
                        <Text style={{...globalFontStyles.NB_20, color: '#7B7D87', position: 'absolute', left: 0.19 * (width - 26), top: 0.03 * heightToUse}}>
                            {/*{props.year}*/}
                        </Text>
                    </View>
                    <View style={{flex : 8, justifyContent: 'center', alignItems: 'center'}}>
                        {props.children}
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
};

export default Page;

