import React from "react";
import { View, SafeAreaView } from "react-native";
import Header from "../../../Component/Header";
import { Icon } from "react-native-eva-icons";
import SuggestButton from "../../../Component/SuggestButton";
import FocusAreaChoice from "../../../Component/FocusAreaChoice";
import { FlatList } from "react-native-gesture-handler";
import specialisations from "../../../Data/Specialisations";

const Focus = ({ navigation }) => {
  const textWithIcon2 = (name) => <FocusAreaChoice text={name} />;
  return (
    <View style={{ flex: 1 }}>
      <Header
        str={"Focus Area"}
        leftChildren={
          <Icon
            name="chevron-left-outline"
            width={100}
            height={30}
            fill="#232323"
            onPress={() => navigation.goBack()}
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
