import React from "react";
import { Button, View, Text, StyleSheet, SafeAreaView } from "react-native";
import Header from "../../../Component/Header";
import LogoutButton from "../../../Component/LogoutButton";
import { globalFontStyles } from "../../../Component/GlobalFont";
import { List, ListItem, Icon } from "@ui-kitten/components";
import TextPlusIcon from "../../../Component/TextPlusIcon";

const Profile = ({ navigation }) => {
  const logout = () => navigation.navigate("Login");
  const course = () => navigation.navigate("Course");
  const focus = () => navigation.navigate("Focus");
  const graduation = () => navigation.navigate("Graduation");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        str={"Profile"}
        leftChildren={<View />}
        rightChildren={<View />}
      />
      <View style={{ paddingLeft: 10, paddingRight: 10 }}>
        <TextPlusIcon
          left={"Course"}
          transition={() => course()}
          right={"Computer Science"}
        />
        <TextPlusIcon
          left={"Focus Area"}
          transition={() => focus()}
          right={"None"}
        />
        <TextPlusIcon
          left={"Expected Graduation Sem"}
          transition={() => graduation()}
          right={"Y4S2"}
        />
        <LogoutButton func={() => logout()}>
          <Text style={{ ...globalFontStyles.OSSB_17, color: "white" }}>
            Logout
          </Text>
        </LogoutButton>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // justifyContent: "space-between",
    backgroundColor: "yellow",
  },
});
