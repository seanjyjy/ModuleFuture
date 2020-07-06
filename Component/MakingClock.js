import { IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { globalFontStyles } from "../Component/GlobalFont";
import SignInButton from "../Component/SignInButton";
import BackgroundFaded from "../Screens/Backgrounds/BackgroundFaded";
import FirebaseDB from "../FirebaseDB";
const height = Dimensions.get("window").height;

const ChoosingOptions = ({ route }) => {
  const [isLoading, setIsLoading] = useState("");
  const [index1, setIndex1] = useState("4");
  const [index2, setIndex2] = useState("4");
  const yearValue = (val) => {
    return val === 1
      ? "2016"
      : val === 2
      ? "2017"
      : val === 3
      ? "2018"
      : val === 4
      ? "2019"
      : "2020";
  };
  const semValue = (val) => {
    return val === 1
      ? "Y3S1"
      : val === 2
      ? "Y3S2"
      : val === 3
      ? "Y4S1"
      : val === 4
      ? "Y4S2"
      : val === 5
      ? "Y5S1"
      : "Y5S2";
  };
  const yearList = [
    { key: 2016, value: "2016" },
    { key: 2017, value: "2017" },
    { key: 2018, value: "2018" },
    { key: 2019, value: "2019" },
    { key: 2020, value: "2020" },
  ];

  const semList = [
    { key: "Y3S1", value: "Y3S1" },
    { key: "Y3S2", value: "Y3S2" },
    { key: "Y4S1", value: "Y4S1" },
    { key: "Y4S2", value: "Y4S2" },
    { key: "Y5S1", value: "Y5S1" },
    { key: "Y5S2", value: "Y5S2" },
  ];

  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(3));
  const [selectedIndex2, setSelectedIndex2] = useState(new IndexPath(3));
  const YearDisplayValue = yearList[selectedIndex.row].value;
  const SemDisplayValue = semList[selectedIndex2.row].value;
  const renderOption = (title) => (
    <SelectItem title={title.value} key={title.key} />
  );
  const textYear = (
    <Text style={{ ...globalFontStyles.OSR_17, color: "#575757" }}>
      Year of matriculation
    </Text>
  );
  const textSem = (
    <Text style={{ ...globalFontStyles.OSR_17, color: "#575757" }}>
      Expected graduation semester
    </Text>
  );

  const stringText = "Additional\nDetails";
  return (
    <BackgroundFaded>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            ...globalFontStyles.OSEB_34,
            color: "#686868",
            left: 30,
            top: 30,
          }}
        >
          {stringText}
        </Text>
      </View>
      <View style={{ flex: 5 }}>
        <View style={{ flex: 1 }}>
          <View
            style={{ width: "100%", height: "100%", flexDirection: "column" }}
          >
            <View style={{ flex: 1, right: 30, top: 60 }}>
              <Layout style={styles.container} level="1">
                <Select
                  size={"large"}
                  label={textYear}
                  style={styles.select}
                  placeholder="Default"
                  value={YearDisplayValue}
                  selectedIndex={selectedIndex}
                  onSelect={(index) => {
                    setSelectedIndex(index);
                    const value = index.toString();
                    setIndex1(value);
                  }}
                >
                  {yearList.map(renderOption)}
                </Select>
              </Layout>
            </View>

            <View style={{ flex: 1, right: 30, bottom: 20 }}>
              <Layout style={styles.container} level="1">
                <Select
                  size={"large"}
                  label={textSem}
                  style={styles.select}
                  placeholder="Default"
                  value={SemDisplayValue}
                  selectedIndex={selectedIndex2}
                  onSelect={(index) => {
                    setSelectedIndex2(index);
                    const value = index.toString();
                    setIndex2(value);
                  }}
                >
                  {semList.map(renderOption)}
                </Select>
              </Layout>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: "center",
          alignItems: "center",
          bottom: 0.2 * height,
        }}
      >
        <SignInButton
          func={() => {
            setIsLoading(true);
            FirebaseDB.auth()
              .createUserWithEmailAndPassword(
                route.params?.item[0].email,
                route.params?.item[0].password
              )
              .then((response) => {
                const uid = response.user.uid;
                const data = {
                  id: uid,
                  name: route.params?.item[0].name,
                  password: route.params?.item[0].password,
                  email: route.params?.item[0].email,
                  course: route.params?.item[1],
                  yearOfMatri: yearValue(parseInt(index1)),
                  expectedSemGrad: semValue(parseInt(index2)),
                  TargetCAP: 5,
                  totalMCs: 160,
                  CapArray: [],
                  favPlanArray: [],
                  favPlanInfo: [],
                };
                const userRef = FirebaseDB.firestore().collection("users");
                userRef
                  .doc(uid)
                  .set(data)
                  .then(() => {
                    setIsLoading(false);
                  })
                  .catch((error) => {
                    setIsLoading(false);
                    alert(error);
                  });
              })
              .catch((error) => {
                setIsLoading(false);
                alert(error);
              });
          }}
          isLoading={isLoading}
        >
          <Text style={{ ...globalFontStyles.OSSB_17, color: "white" }}>
            Done
          </Text>
        </SignInButton>
      </View>
    </BackgroundFaded>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    marginHorizontal: 60,
    minHeight: 120,
  },
  select: {
    flex: 1,
    margin: 2,
  },
});

export default ChoosingOptions;
