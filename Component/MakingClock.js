import React, {useState} from 'react';
import {View, Platform, Text, StyleSheet, Picker} from 'react-native';

const ChoosingOptions = () => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={2018}
                style={{ height: 50, width: 150 }}
                //onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
                <Picker.Item label="2018" value="2018" />
                <Picker.Item label="2019" value="2019" />
            </Picker>
        </View>
    );
    // return (
    //     <View style ={{top : 30, left : 30}}>
    //         <View style ={{paddingVertical: 20}}>
    //             <Text style={{...globalStyles.OSR_17, color:'#575757'}}>
    //                 Year of matriculation
    //             </Text>
    //         </View>
    //         <TouchableOpacity style={styles.buttonDesign2} onPress={() => showYearPicker()} activeOpacity = {0.9}>
    //             <View style={{flexDirection:'row'}}>
    //                 <Text style={{...globalStyles.OSR_17, color:'#575757', right: 40}}>
    //                     2018
    //                 </Text>
    //                 <Ionicons
    //                     name="ios-arrow-down" size={20}
    //                     style={{...styles.iconDesign, right: 10}}/>
    //             </View>
    //         </TouchableOpacity>
    //         <View style ={{paddingVertical: 20}}>
    //             <Text style={{...globalStyles.OSR_17, color:'#575757'}}>
    //                 Expected graduation semester
    //             </Text>
    //         </View>
    //         <TouchableOpacity style={styles.buttonDesign2} onPress={() => showSemPicker()} activeOpacity = {0.9}>
    //             <View style={{flexDirection:'row'}}>
    //                 <Text style={{...globalStyles.OSR_17, color:'#575757', right: 40}}>
    //                     Y2S1
    //                 </Text>
    //                 <Ionicons
    //                     name="ios-arrow-down" size={20}
    //                     style={{...styles.iconDesign, right: 10}}/>
    //             </View>
    //         </TouchableOpacity>
    //     </View>
    // );
};

const styles = StyleSheet.create({
    buttonDesign2: {
        height:45,
        backgroundColor:"#E8EAEF",
        borderColor: '#707070',
        borderWidth: 1,
        alignItems:'center',
        justifyContent:'center',
        width:160,
    },
    iconDesign: {
        color:'#575757',
        left : 30
    },
    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: "center"
    }
})

export default ChoosingOptions;