import { IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  Platform,
  Alert,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { globalFontStyles } from "../Component/GlobalFont";
import SignInButton from "../Component/SignInButton";
import BackgroundFaded from "../Screens/Backgrounds/BackgroundFaded";
import FirebaseDB from "../FirebaseDB";
import { Modules, Mapping, Levels, Codes, Types } from "../Data/Types";
import { Icon } from "react-native-eva-icons";
import { CheckBox } from "@ui-kitten/components";
import { Autocomplete, AutocompleteItem } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { specialisations } from "../Data/Specialisations";
import { database } from "firebase";

const height = Dimensions.get("window").height;

let courseList = [
  { title: "Business Analytics" },
  { title: "Computer Science" },
  { title: "Information Security" },
  { title: "Information Systems" },
  { title: "Computer Engineering" },
  { title: "Chinese Language" },
  { title: "Chinese Studies" },
  { title: "Japanese Studies" },
  { title: "Malay Studies" },
  { title: "South Asian Studies" },
  { title: "Southeast Asian Studies" },
  { title: "English Language" },
  { title: "English Literature" },
  { title: "History" },
  { title: "Philosophy" },
  { title: "Theatre Studies" },
  { title: "Communications & New Media" },
  { title: "Economics" },
  { title: "Geography" },
  { title: "Political Science" },
  { title: "Psychology" },
  { title: "Social Work" },
  { title: "Sociology" },
  { title: "Environmental Studies in Geography" },
  { title: "Global Studies" },
  { title: "Business Administration (Accountancy)" },
  { title: "Business Administration" },
  { title: "Dentistry" },
  { title: "Architecture" },
  { title: "Industrial Design" },

  { title: "Landscape Architecture" },
  { title: "Project & Facilities Management" },
  { title: "Real Estate" },
  { title: "Biomedical Engineering" },
  { title: "Chemical Engineering" },
  { title: "Civil Engineering" },
  { title: "Engineering Science" },
  { title: "Environmental Engineering" },
  { title: "Electrical Engineering" },
  { title: "Industrial and Systems Engineering" },
  { title: "Material Science & Engineering" },
  { title: "Mechanical Engineering" },
  { title: "Undergraduate Law Programme" },
  { title: "Graduate LL.B. Programme" },
  { title: "Medicine" },
  { title: "Nursing" },
  { title: "Music" },
  { title: "Applied Mathematics" },
  {
    title: "Applied Mathematics, specialisation in MMDA",
  },
  {
    title: "Applied Mathematics, specialisation in ORFM",
  },
  { title: "Chemistry" },
  { title: "Chemistry, specialisation in Materials Chemistry" },
  { title: "Chemistry, specialisation in Medicinal Chemistry" },
  { title: "Chemistry, specialisation in Environment and Energy" },
  { title: "Computational Biology" },
  { title: "Data Science and Analytics" },
  { title: "Environmental Studies in Biology" },
  { title: "Food Science and Technology" },
  { title: "Life Sciences" },
  { title: "Life Sciences, specialisation in Biomedical Science" },
  { title: "Life Sciences, specialisation in Environmental Biology" },
  { title: "Life Sciences, specialisation in Molecular & Cell Biology" },
  { title: "Mathematics" },
  { title: "Pharmacy" },
  { title: "Pharmaceutical Science" },
  { title: "Physics" },
  { title: "Physics, specialisation in Astrophysics" },
  { title: "Physics, specialisation in Nanophysics" },
  { title: "Physics, specialisation in Quantum Technologies" },
  { title: "Quantitative Finance" },
  { title: "Statistics" },
  { title: "Statistics, specialisation in Data Science" },
  { title: "Statistics, specialisation in Finance and Business Statistics" },
];

const filter = (item, query) =>
  item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;

const ChoosingOptions = ({ route }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState("");
  const [index1, setIndex1] = useState("4");
  const [index2, setIndex2] = useState("4");

  useEffect(() => {
    if (route.params?.TnCSTATUS) {
      setChecked(route.params?.TnCSTATUS);
    }
  }, [route.params]);

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

  const courseValue = () => {};
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

  const [value, setValue] = React.useState("");
  const [data, setData] = React.useState(courseList);

  const onSelectSearch = (index) => {
    if (value !== "") {
      setData(courseList);
      setValue(data[index].title);
    } else {
      setValue(courseList[index].title);
    }
  };

  const onChangeTextSearch = (query) => {
    setValue(query);
    setData(courseList.filter((item) => filter(item, query)));
  };

  const renderOptionSearch = (item, index) => (
    <AutocompleteItem key={index} title={item.title} />
  );

  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(3));
  const [selectedIndex2, setSelectedIndex2] = useState(new IndexPath(3));

  const YearDisplayValue = yearList[selectedIndex.row].value;
  const SemDisplayValue = semList[selectedIndex2.row].value;

  const renderOption = (title) => (
    <SelectItem title={title.value} key={title.key} />
  );
  const textYear = (
    <Text style={{ ...globalFontStyles.OSSB_17, color: "#232323" }}>
      Year of matriculation
    </Text>
  );
  const textSem = (
    <Text style={{ ...globalFontStyles.OSSB_17, color: "#232323" }}>
      Expected graduation semester
    </Text>
  );

  const textCourse = (
    <Text style={{ ...globalFontStyles.OSSB_17, color: "#232323", bottom: 3 }}>
      Course
    </Text>
  );

  const stringText = "Additional\nDetails";
  const [checked, setChecked] = React.useState(false);
  return (
    <>
      <StatusBar translucent={false} />
      <BackgroundFaded>
        <View style={{ flex: 2, justifyContent: "center" }}>
          <Text style={styles.TitleOfPage}>{stringText}</Text>
        </View>
        <View style={{ flex: 5 }}>
          <View style={{ flex: 1 }}>
            <View style={styles.AllOptionsContainer}>
              <View style={{ flex: 1 }} />
              <View
                style={{
                  flex: 2,
                  marginHorizontal: 64,
                  right: 30,
                  top: 10,
                }}
              >
                {textCourse}
                <Autocomplete
                  size={"large"}
                  placement="bottom"
                  placeholder="Enter your course"
                  placeholderTextColor="#2D4056"
                  value={value}
                  onSelect={onSelectSearch}
                  onChangeText={onChangeTextSearch}
                  //style={{ marginBottom: StatusBar.currentHeight }}
                >
                  {data.map(renderOptionSearch)}
                </Autocomplete>
              </View>
              <View style={{ flex: 2, right: 30 }}>
                <Layout style={styles.container} level="1">
                  <Select
                    size={"large"}
                    label={textSem}
                    style={{
                      ...styles.select,
                      //paddingBottom: StatusBar.currentHeight,
                    }}
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

              <View style={{ flex: 2, right: 30 }}>
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

              <View style={styles.checkBoxDesign}>
                <CheckBox
                  checked={checked}
                  onChange={(nextChecked) => setChecked(nextChecked)}
                />
                <Text style={styles.ihveStyle}>I've agreed to the </Text>
                <Text
                  style={styles.tncStyle}
                  onPress={() => navigation.navigate("TnC")}
                >
                  Terms & Conditions.
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.spaceForButton}>
          <SignInButton
            func={() => {
              if (checked && value !== "") {
                setIsLoading(true);
                FirebaseDB.auth()
                  .createUserWithEmailAndPassword(
                    route.params?.item.email,
                    route.params?.item.password
                  )
                  .then((response) => {
                    console.log(semValue(parseInt(index2)));
                    const uid = response.user.uid;
                    const data = {
                      id: uid,
                      name: route.params?.item.name,
                      password: route.params?.item.password,
                      email: route.params?.item.email,
                      course: value, // required
                      yearOfMatri: yearValue(parseInt(index1)), // required
                      expectedSemGrad: semValue(parseInt(index2)),
                      TargetCAP: 5,
                      totalMCs: 160,
                      CapArray: [],
                      favPlanArray: [],
                      favPlanInfo: [],
                      SelectedPlansInfo: [],
                    };

                    const FB = FirebaseDB.firestore();
                    const batch = FB.batch();
                    const courseAndYear = data.course + " " + data.yearOfMatri;

                    if (Modules[courseAndYear] !== undefined) {
                      // For records
                      const modulesRef = FB.collection("records").doc(uid);
                      const modules = Modules[courseAndYear];
                      modules.notTaken.sort((a, b) => {
                        if (a.code < b.code) {
                          return -1;
                        } else {
                          return 1;
                        }
                      });
                      batch.set(modulesRef, modules);

                      // For records modules mapping
                      const modulesMapping = FB.collection(
                        "modulesMapping"
                      ).doc(uid);
                      batch.set(modulesMapping, Mapping[courseAndYear]);
                      // typeArray
                      const typeRef = FB.collection("typeArray").doc(uid);
                      batch.set(typeRef, Types[courseAndYear]);

                      // codeArray
                      const codeRef = FB.collection("codeArray").doc(uid);
                      batch.set(codeRef, Codes[data.course]);

                      if (data.course !== "Information Security") {
                        // For focus area
                        const focusAreaRef = FB.collection("focusArea").doc(
                          uid
                        );
                        batch.set(focusAreaRef, specialisations[courseAndYear]);
                        // Modules for focusArea
                        const modulesTakenRef = FB.collection(
                          "takenModules"
                        ).doc(uid);
                        batch.set(modulesTakenRef, { Test: null });
                      }
                    } else {
                      const codeRef = FB.collection("codeArray").doc(uid);
                      batch.set(codeRef, Codes["Others"]);
                    }

                    // levelArray
                    const levelRef = FB.collection("levelArray").doc(uid);
                    batch.set(levelRef, Levels);

                    const userRef = FB.collection("users").doc(uid);
                    batch.set(userRef, data);

                    const usersModulesDetailsRef = FB.collection(
                      "usersModulesDetails"
                    ).doc(uid);
                    batch.set(usersModulesDetailsRef, {
                      usersModulesArray: [],
                    });
                    batch.commit().then(setIsLoading(false));
                  })
                  .catch((error) => {
                    setIsLoading(false);
                    alert(error);
                  });
              } else {
                if (!checked) {
                  Alert.alert(
                    "Notice",
                    "Please accept the Terms and Condition before continuing.",
                    [{ text: "Cancel", onPress: () => {} }],
                    { cancelable: false }
                  );
                } else {
                  Alert.alert(
                    "Notice",
                    "Please fill in the course!",
                    [{ text: "Cancel", onPress: () => {} }],
                    { cancelable: false }
                  );
                }
              }
            }}
            isLoading={isLoading}
          >
            <Text style={{ ...globalFontStyles.OSSB_17, color: "white" }}>
              Done
            </Text>
          </SignInButton>
        </View>
      </BackgroundFaded>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    marginHorizontal: 60,
    minHeight: 120,
    backgroundColor: "transparent",
  },
  select: {
    flex: 1,
    margin: 2,
  },
  AllOptionsContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
  },
  spaceForButton: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    bottom: 0.05 * height,
  },
  TitleOfPage: {
    ...globalFontStyles.OSEB_34,
    color: "#686868",
    left: 30,
    top: 30,
  },
  checkBoxDesign: {
    flex: 1,
    left: 33,
    bottom: 0.02 * height,
    flexDirection: "row",
  },
  tncStyle: {
    textDecorationLine: "underline",
    alignSelf: "center",
    left: 5,
    ...globalFontStyles.NB_13,
    color: "#51739B",
    top: 1,
  },
  ihveStyle: {
    alignSelf: "center",
    left: 5,
    ...globalFontStyles.NB_13,
    color: "#2D4056",
    top: 1,
  },
});

export default ChoosingOptions;
