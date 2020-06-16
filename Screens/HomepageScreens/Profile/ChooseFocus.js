import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../../../Component/Header";
import Icon from "react-native-vector-icons/FontAwesome";

const Focus = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header
        str={"Focus Area"}
        leftChildren={
          <Icon name="arrow-left" size={19} style={{ color: "#232323" }} />
        }
        rightChildren={<View />}
      />
      <Text>hello world</Text>
    </View>
  );
};

export default Focus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/*
const data = [
    { title: "Course" },
    { title: "Focus Area" },
    { title: "Expected Graduation Sem" },
  ];

  const renderItemAccessory = (props) => (
    <NextButton>
      <Text>Computer Science</Text>
    </NextButton>
  );

  const renderItem = ({ item, index }) => (
    <ListItem title={`${item.title}`} accessoryRight={renderItemAccessory} />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        str={"Profile"}
        leftChildren={<View />}
        rightChildren={<View />}
      />
      <View>
        <List style={styles.container} data={data} renderItem={renderItem} />
      </View>
      <View style={{ left: 20 }}>
        <LogoutButton func={() => logout()}>
          <Text style={{ ...globalFontStyles.OSSB_17, color: "white" }}>
            Logout
          </Text>
        </LogoutButton>
      </View>
    </SafeAreaView>
  );
  */
