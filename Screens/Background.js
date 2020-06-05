import React from 'react';
import { StyleSheet, Image , View, Dimensions} from 'react-native';

const Background = () => {
    return (
        <View style={{flex: 1}}>
            <Image
                source={require('../assets/main_backgroundtestversion.png')}
                style={styles.background}
            />
        </View>
    );
}

const win = Dimensions.get('window');
const ratio = win.width / 363;

const styles = StyleSheet.create({
    background: {
        width: win.width,
        height: 596 * ratio,
        bottom : 60
    }
});

export default Background;