import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Header from "../../Component/Header"
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfilePage = () => {
    return (
        <View style={styles.container}>
            <Header str={"Profile"} leftChildren={<Icon name="arrow-left" size={19} style={{color: '#979797'}}/>} rightChildren = {<View/>} />
                <Text>
                    hello world
                </Text>
        </View>
    )
}

export default ProfilePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
