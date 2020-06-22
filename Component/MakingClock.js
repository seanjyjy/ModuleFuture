import React, { useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { globalFontStyles } from "./GlobalFont";
import { IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components";

const ChoosingOptions = () => {
  const yearList = [
    { key: 2015, value: "2015" },
    { key: 2016, value: "2016" },
    { key: 2017, value: "2017" },
    { key: 2018, value: "2018" },
    { key: 2019, value: "2019" },
    { key: 2020, value: "2020" },
  ];

  const semList = [
    { key: "Y1S1", value: "Y1S1" },
    { key: "Y1S2", value: "Y1S2" },
    { key: "Y2S1", value: "Y2S1" },
    { key: "Y2S2", value: "Y2S2" },
    { key: "Y3S1", value: "Y3S1" },
    { key: "Y3S2", value: "Y3S2" },
    { key: "Y4S1", value: "Y4S1" },
    { key: "Y4S2", value: "Y4S2" },
  ];

  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const [selectedIndex2, setSelectedIndex2] = useState(new IndexPath(0));
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
  return (
      <View style={{ width: "100%", height: "100%", flexDirection: "column" }}>
        <View style={{ flex: 1, right: 30, top: 60 }}>
          <Layout style={styles.container} level="1">
            <Select
                size={"large"}
                label={textYear}
                style={styles.select}
                placeholder="Default"
                value={YearDisplayValue}
                selectedIndex={selectedIndex}
                onSelect={(index) => setSelectedIndex(index)}
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
                onSelect={(index) => setSelectedIndex2(index)}
            >
              {semList.map(renderOption)}
            </Select>
          </Layout>
        </View>
      </View>
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