import React from "react";
import { View } from "react-native";
import Header from "../../../Component/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import SuggestButton from "../../../Component/SuggestButton";
import FocusAreaChoice from "../../../Component/FocusAreaChoice";
import { FlatList } from "react-native-gesture-handler";
import specialisations from "../../../Data/Specialisations";

const Focus = ({ navigation, route }) => {
  const textWithIcon2 = (name) => <FocusAreaChoice text={name} />;
  return (
    <View style={{ flex: 1 }}>
      <Header
        str={"Focus Area"}
        leftChildren={
          <Ionicons
            name="md-arrow-round-back"
            size={25}
            style={{ color: "#232323" }}
            onPress={() =>
              navigation.navigate("Profile", {
                focusArea: "Artificial Intelligence",
              })
            }
          />
        }
        rightChildren={<SuggestButton />}
      />
      <View style={{ paddingLeft: 20, paddingRight: 25 }}>
        <FlatList
          data={specialisations}
          keyExtractor={(item) => item.key.toString()}
          renderItem={({ item }) => textWithIcon2(item.name)}
        />
      </View>
    </View>
  );
};

export default Focus;
