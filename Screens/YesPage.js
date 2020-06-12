import {Text, TextInput, View, TouchableOpacity} from "react-native";
import {globalFontStyles} from "../Component/GlobalFont";
import {globalStyles} from "../Component/GlobalStyle";
import React, {useState} from "react";
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Formik} from 'formik';
import * as yup from 'yup';

const reviewSchema = yup.object({
    username: yup.string().required().min(6).max(16)
});


const YesPage = () => {

    const [data, setData] = useState({
        username: '',
    })

    const handleData = values => {
        setData({
            ...data,
            values,
        })
    }

    const navigation = useNavigation()

    return (
        <View style= {{flex : 1}}>
            <Formik
                initialValues={{username: ''}}
                validationSchema={reviewSchema}
                onSubmit={(values, actions) => {
                    handleData(values)
                    actions.resetForm()
                    navigation.navigate("DetailsCollection");
                }}
            >
                {(props) => (
                    <View>
                        <View style={globalStyles.header}>
                            <MaterialCommunityIcons
                                name='account' size={30}
                                style={{...globalStyles.iconDesign, right: 13}}/>
                            <TextInput
                                placeholder="Username"
                                placeholderTextColor='#7F8E9E'
                                onChangeText = {props.handleChange('username')}
                                value = {props.values.username}
                                style={{...globalFontStyles.OSR_17, right: 10, flex : 1, top: 7}}
                            />
                        </View>

                        <View style ={{left: 30}}>
                            <Text style={{...globalFontStyles.OSR_17, color: '#7F8E9E'}}>{props.touched.username && props.errors.username}</Text>
                        </View>

                        <View style = {{top : 50, left: 25}}>
                            <TouchableOpacity
                                activeOpacity= {0.875}
                                style={globalStyles.buttonDesign}
                                onPress = {props.handleSubmit}
                            >
                                <Text style={{...globalFontStyles.OSSB_17, color: 'white'}}>
                                    continue
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    )
};

export default YesPage;