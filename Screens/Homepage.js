import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
  StyleSheet,
  Text,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfilePage from "./HomepageScreens/ProfilePage";
import AskPage from "./HomepageScreens/AskPage";
import ModulePage from "./HomepageScreens/ModulePage";
import Planner from "../Screens/HomepageScreens/Planner/Planner"
import FocusArea from "./HomepageScreens/FocusArea";
import {globalFontStyles} from "../Component/GlobalFont";
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSafeArea } from 'react-native-safe-area-context';


const textToReturn = (str) => {
    if (str === 'Planner') {
        return 'calendar'
    } else if (str === 'Focus') {
        return 'crosshairs'
    } else if (str === 'Module') {
        return 'book'
    } else if (str === 'Ask') {
        return 'comments'
    } else {
        return 'user-circle'
    }
}

const TabDesign = (props) => {
    return (
        <View style={{height: "100%", justifyContent: "center", alignItems: "center",}}>
            <Icon name={props.iconName} size={19} style={{ color: props.isCurrent ? '#FB5581' : '#979797'}}/>
            <Text style={props.isCurrent ? {...globalFontStyles.OSB_13, color :  '#FB5581', top: 5}
                : {...globalFontStyles.OSSB_13, color: '#8E8E8E', top: 5}}
            >
                {props.name}
            </Text>
        </View>
    );
};

const TabBar = ({state, descriptors, navigation}) => {
    const [translateValue] = useState(new Animated.Value(0));
    const totalWidth = Dimensions.get("window").width;
    const tabWidth = totalWidth / state.routes.length;

    return (
        <View style={[style.tabContainer, {width: totalWidth}]}>
            <View style={{ flexDirection: "row" }}>
                <Animated.View
                    style={[style.slider, {
                        transform: [{ translateX: translateValue }],
                        width: tabWidth - 20}]}
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
                            activeOpacity= {0.875}
                        >
                            <TabDesign
                                iconName={textToReturn(label.toString())}
                                isCurrent={isFocused}
                                name={label.toString()}
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

export const TabBar = ({ state, descriptors, navigation }) => {
  const [translateValue] = useState(new Animated.Value(0));
  const totalWidth = Dimensions.get("window").width;
  const tabWidth = totalWidth / state.routes.length;

  return (
    <View style={[style.tabContainer, { width: totalWidth }]}>
      <View style={{ flexDirection: "row" }}>
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
      </View>
    </View>
  );
};

const HomeTabNavigator = () => {

    const Tab = createBottomTabNavigator();

    return (
        <View style={{ flex: 1}}>
            <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
                <Tab.Screen name="Planner" component={Planner}/>
                <Tab.Screen name="Focus" component={FocusArea}/>
                <Tab.Screen name="Module" component={ModulePage}/>
                <Tab.Screen name="Ask" component={AskPage}/>
                <Tab.Screen name="Profile" component={ProfilePage}/>
            </Tab.Navigator>
            {useSafeArea().bottom > 0 && (<View style={{height: useSafeArea().bottom - 5, backgroundColor: "white",}}/>)}
        </View>
    );
};

const Homepage = () => {
    return (
        HomeTabNavigator()
    )
}

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
