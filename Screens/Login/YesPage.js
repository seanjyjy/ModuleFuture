import { Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import { globalFontStyles } from "../../Component/GlobalFont";
import { globalStyles } from "../../Component/GlobalStyle";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Formik } from "formik";
import * as yup from "yup";
import SignInButton from "../../Component/SignInButton";
const reviewSchema = yup.object({
  name: yup.string().required(),
});

const YesPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <Formik
        initialValues={{ name: "" }}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          navigation.navigate("DetailsCollection", { item: values });
          actions.resetForm();
        }}
      >
        {(props) => (
          <View>
            <View style={globalStyles.header}>
              <MaterialCommunityIcons
                name="account"
                size={30}
                style={{ ...globalStyles.iconDesign, right: 13 }}
              />
              <TextInput
                placeholder="Name"
                placeholderTextColor="#7F8E9E"
                onChangeText={props.handleChange("name")}
                value={props.values.username}
                style={{
                  ...globalFontStyles.OSR_17,
                  right: 10,
                  flex: 1,
                  top: 7,
                }}
              />
            </View>

            <View style={{ left: 30 }}>
              <Text style={{ ...globalFontStyles.OSR_17, color: "#cc0000" }}>
                {props.touched.name && props.errors.name}
              </Text>
            </View>

            <View style={{ top: 50, left: 25 }}>
              <SignInButton func={props.handleSubmit} isLoading={isLoading}>
                <Text style={{ ...globalFontStyles.OSSB_17, color: "white" }}>
                  Continue
                </Text>
              </SignInButton>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default YesPage;
