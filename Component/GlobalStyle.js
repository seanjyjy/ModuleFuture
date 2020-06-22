import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#7F8E9E",
    padding: 10,
    marginHorizontal: 50,
    right: 20,
  },
  buttonDesign2: {
    height: 65,
    backgroundColor: "#FB5581",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    width: 160,
    elevation: 20,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.1,
  },
  buttonDesign: {
    height: 65,
    backgroundColor: "#FB5581",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    width: 220,
    elevation: 20,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.1,
  },
  iconDesign: {
    color: "#2D4056",
    top: 5,
  },
});