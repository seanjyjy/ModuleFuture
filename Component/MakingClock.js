import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback, TouchableHighlight, Modal, TouchableOpacity} from 'react-native';
import {globalFontStyles} from "./GlobalFont";
import Ionicons from 'react-native-vector-icons/Ionicons';

const ChoosingOptions = props => {

    const yearList = [
        {year: 2015, value: '2015'},
        {year: 2016, value: '2016'},
        {year: 2017, value: '2017'},
        {year: 2018, value: '2018'},
        {year: 2019, value: '2019'},
        {year: 2020, value: '2020'}
    ]

    const semList = [
        {sem: 'Y1S1', value: 'Y1S1'},
        {sem: 'Y1S2', value: 'Y1S2'},
        {sem: 'Y2S1', value: 'Y2S1'},
        {sem: 'Y2S2', value: 'Y2S2'},
        {sem: 'Y3S1', value: 'Y3S1'},
        {sem: 'Y3S2', value: 'Y3S2'},
        {sem: 'Y4S1', value: 'Y4S1'},
        {sem: 'Y4S2', value: 'Y4S2'}
    ]

    const [year, setYear] = useState(2018);
    const [sem, setSem] = useState('Y2S1');
    const [yearVisible, setYearVisible] = useState(false);
    const [listVisible, setListVisible] = useState(false);
    const allYearList = () => {
        if (yearVisible) {
            setYearVisible(false);
        } else {
            setYearVisible(true);
        }
    }
    const allSemList = () => {
        if (listVisible) {
            setListVisible(false);
        } else {
            setListVisible(true);
        }
    }
    const [heightmovement, setheightmovement] = useState(0);
    const [heightmovement2, setheightmovement2] = useState(0);


    return (
        <View style ={{width: '100%', height: '100%'}}>
            <View style={{flexDirection: 'column'}} onLayout = {event => setheightmovement(event.nativeEvent.layout.height)}>
                <View style={{top: 20}}>
                    <View style = {{padding: 10, left: 10}}>
                        <Text style={{...globalFontStyles.OSR_17, color: '#575757'}}>
                            Year of matriculation
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.dropDown} onPress={() => allYearList()} activeOpacity = {0.1} >
                        <Text style={{...globalFontStyles.OSR_17, color: '#575757', left: 10, top: 9}}>
                            {year}
                        </Text>
                        <Ionicons
                            name="ios-arrow-down" size={20}
                            style={styles.arrowDown}/>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal visible={yearVisible} transparent={true}>
                <View style={{width: 150, height: 200, backgroundColor: '#FCFCFC', alignItems: 'flex-start',
                    left : 20, top : (props.extraMovement + heightmovement + 20), borderWidth: 0.3}}>
                    {yearList.map((year, value) =>  {
                        return (
                            <TouchableHighlight
                                key ={value}
                                style={{padding: 5, height: (200/6), width: 150, left: 5}}
                                onPress={()=> {
                                    setYear(year.value)
                                    allYearList()
                                }}
                            >
                                <Text style={{...globalFontStyles.OSR_17, color: '#575757'}}>
                                    {year.value}
                                </Text>
                            </TouchableHighlight>)})}
                </View>
            </Modal>

            <View style ={{top: 40}} onLayout = {event => setheightmovement2(event.nativeEvent.layout.height)}>
                <View style = {{padding: 10, left: 10}}>
                    <Text style={{...globalFontStyles.OSR_17, color: '#575757'}}>
                        Expected graduation semester
                    </Text>
                </View>
                <TouchableOpacity style={styles.dropDown} onPress={() => allSemList()} activeOpacity = {0.9}>
                    <Text style={{...globalFontStyles.OSR_17, color: '#575757', left: 10, top: 9}}>
                        {sem}
                    </Text>
                    <Ionicons
                        name="ios-arrow-down" size={20}
                        style={styles.arrowDown}/>
                </TouchableOpacity>
            </View>
            <Modal visible={listVisible} transparent={true}>
                <View style={{width: 150, height: 320, backgroundColor: '#FCFCFC', alignItems: 'flex-start',
                    left : 20, top : (props.extraMovement + heightmovement + heightmovement2 + 40), borderWidth: 0.3}}>
                    {semList.map((sem, value) =>  {
                        return (
                            <TouchableHighlight
                                key ={value}
                                style={{padding: 5, height: (320/8), width: 150, left: 5}}
                                onPress={()=> {
                                    setSem(sem.value)
                                    allSemList()
                                }}
                            >
                                <Text style={{...globalFontStyles.OSR_17, color: '#575757'}}>
                                    {sem.value}
                                </Text>
                            </TouchableHighlight>)})}
                </View>
            </Modal>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: "center",
    },
    arrowDown: {
        top: 12,
        color: '#575757',
        left: 80
    },
    dropDown: {
        borderWidth: 1,
        height: 45,
        width: 150,
        borderColor: '#707070',
        left: 20,
        flexDirection:'row'
    }

})

export default ChoosingOptions;