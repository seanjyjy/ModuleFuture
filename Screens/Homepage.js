import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
  Animated,
  StatusBar,
  Platform,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./HomepageScreens/Profile/Profile";
import Records from "./HomepageScreens/Records/Records";
import ModulePage from "./HomepageScreens/SearchModule/ModulePage";
import Planner from "../Screens/HomepageScreens/Planner/Planner";
import FocusArea from "./HomepageScreens/FocusArea/FocusArea";
import { globalFontStyles } from "../Component/GlobalFont";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSafeArea } from "react-native-safe-area-context";
import FirebaseDB from "../FirebaseDB";

const totalWidth = Dimensions.get("window").width;
const textToReturn = (str) => {
  if (str === "Planner") {
    return "calendar";
  } else if (str === "Focus") {
    return "crosshairs";
  } else if (str === "Module") {
    return "search";
  } else if (str === "Records") {
    return "book";
  } else {
    return "user-circle";
  }
};

const TabDesign = (props) => {
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View />
        <Icon
          name={props.iconName}
          size={19}
          style={{
            color: props.isCurrent ? "#FB5581" : "#979797",
            left:
              !FirebaseDB.auth().currentUser.emailVerified &&
              props.iconName === "user-circle"
                ? 8
                : 0,
            top:
              !FirebaseDB.auth().currentUser.emailVerified &&
              props.iconName === "user-circle"
                ? 2
                : 0,
          }}
        />
        {!FirebaseDB.auth().currentUser.emailVerified &&
        props.iconName === "user-circle" ? (
          <View
            style={{
              backgroundColor: "red",
              height: 15,
              width: 15,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 20,
              bottom: 2,
              left: 0.03 * totalWidth,
            }}
          >
            <Text style={{ color: "white", fontSize: 12, left: 0.5 }}>!</Text>
          </View>
        ) : (
          <View />
        )}
      </View>
      <Text
        style={
          props.isCurrent
            ? {
                ...globalFontStyles.OSB_13,
                color: "#FB5581",
                top: 5,
              }
            : {
                ...globalFontStyles.OSSB_13,
                color: "#8E8E8E",
                top: 5,
              }
        }
      >
        {props.name}
      </Text>
    </View>
  );
};

const TabBar = ({ state, descriptors, navigation }) => {
  const [translateValue] = useState(new Animated.Value(0));
  const tabWidth = totalWidth / state.routes.length;

  return (
    <Animated.View
      style={{
        ...style.tabContainer,
        width: totalWidth,
      }}
    >
      <Animated.View
        style={{
          flexDirection: "row",
        }}
      >
        <Animated.View
          style={[
            style.slider,
            {
              transform: [{ translateX: translateValue }],
              width: tabWidth - 20,
            },
          ]}
        />

        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }

            Animated.spring(translateValue, {
              toValue: index * tabWidth,
              velocity: 10,
              useNativeDriver: true,
            }).start();
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ["selected"] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
              key={index}
              activeOpacity={0.875}
            >
              <TabDesign
                iconName={textToReturn(label.toString())}
                isCurrent={isFocused}
                name={label.toString()}
              />
            </TouchableOpacity>
          );
        })}
      </Animated.View>
    </Animated.View>
  );
};

const Homepage = (data) => {
  const Tab = createBottomTabNavigator();
  const val = useSafeArea().bottom;
  if (Platform.OS === "android") {
    StatusBar.setBackgroundColor("rgba(0,0,0,0)");
    StatusBar.setBarStyle("dark-content");
    StatusBar.setTranslucent(true);
  }
  return (
    <>
      <View style={{ flex: 1 }}>
        <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
          <Tab.Screen name="Planner">
            {(props) => <Planner {...props} extraData={data.extraData} />}
          </Tab.Screen>
          <Tab.Screen name="Records" component={Records} />
          <Tab.Screen name="Focus" component={FocusArea} />
          <Tab.Screen name="Module">
            {(props) => <ModulePage {...props} moduleList={data.moduleList} />}
          </Tab.Screen>
          <Tab.Screen name="Profile">
            {(props) => <Profile {...props} extraData={data.extraData} />}
          </Tab.Screen>
        </Tab.Navigator>
        {val > 0 && (
          <View style={{ height: val - 5, backgroundColor: "white" }} />
        )}
      </View>
    </>
  );
};

export default Homepage;

const style = StyleSheet.create({
  tabContainer: {
    height: 60,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.0,
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 10,
    position: "absolute",
    bottom: 0,
  },
  slider: {
    height: 5,
    position: "absolute",
    top: 0,
    left: 10,
    backgroundColor: "#FB5581",
    borderRadius: 10,
  },
});
