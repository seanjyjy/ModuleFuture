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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  buttonDesign: {
    height: 65,
    backgroundColor: "#FB5581",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    width: 220,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  iconDesign: {
    color: "#2D4056",
    top: 5,
  },
});
