import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../../Component/Header";
import { CSspecialisations, specialisations } from "../../Data/oldSpec";

const ModulePage = () => {
  // For focus area mapping!
  // const getCode = (name) => {
  //   let i = 0;
  //   for (; name[i] !== " "; i++) {}
  //   console.log(
  //     "{" +
  //       "code: " +
  //       `"${name.substring(0, i)}"` +
  //       ", " +
  //       "name: " +
  //       `"${name}"` +
  //       "},"
  //   );
  // };

  // const get = () => {
  //   for (let i = 0; i < specialisations.length; i++) {
  //     const current = specialisations[i].name;
  //     const arr1 = CSspecialisations[current].Primaries;
  //     const arr2 = CSspecialisations[current].Electives;
  //     for (let j = 0; j < arr1.length; j++) {
  //       getCode(arr1[j]);
  //     }
  //     for (let j = 0; j < arr2.length; j++) {
  //       getCode(arr2[j]);
  //     }
  //   }
  // };
  // get();

  // For Coruse mapping!

  // const arr = [];
  // const mapping = [
  //   "Foundation",
  //   "IT Professionalism",
  //   "Mathematics and Sciences",
  //   "Breadth and Depth",
  // ];

  // for (let i = 0; i < CS2019Mapping.length; i++) {
  //   for (let j = 0; j < CS2019Mapping[i].length; j++) {
  //     let k = 0;
  //     const type = mapping[i];
  //     for (; CS2019Mapping[i][j][k] !== " "; k++) {}
  //     const str = CS2019Mapping[i][j].substring(0, k);
  //     const news = "`" + str + "`" + ": " + "`" + type + "`,";
  //     console.log(news);
  //   }
  // }

  return (
    <View style={styles.container}>
      <Header str={"Module"} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>COMING SOOOOOOOOOON!</Text>
      </View>
    </View>
  );
};

export default ModulePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
