import React, { useEffect } from "react";
import { Dimensions, StatusBar, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import BottomNavigationBar from "../components/BottomNavigationBar";
import CreateCardField from "../components/CreateCardField";
import SettingsModal from "../components/SettingsModal";
import TopBar from "../components/TopBar";
import { setCurrentScreen } from "../slices/screenRouteSlice";

export default function HomeScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.darkTheme);

  useEffect(() => {
    dispatch(setCurrentScreen("Home"));
  }, []);

  const styles = StyleSheet.create({
    container: {
      height: Dimensions.get("screen").height,
      backgroundColor: theme ? "#fff" : "black",
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    shape1: {
      width: 500,
      height: 500,
      backgroundColor: theme ? "white" : "black",
      borderWidth: 3,
      position: "absolute",
      right: -300,
      borderRadius: 400,
      zIndex: 0,
      borderColor: "#FF7800",
    },
    shape2: {
      width: 600,
      height: 600,
      backgroundColor: "transparent",
      borderWidth: 3,
      position: "absolute",
      right: -400,
      bottom: 50,
      borderRadius: 400,
      zIndex: 0,
      borderColor: "#FFE300",
    },
    shape3: {
      width: 700,
      height: 700,
      backgroundColor: "transparent",
      borderWidth: 3,
      position: "absolute",
      right: -500,
      borderRadius: 400,
      zIndex: 0,
      borderColor: "#AE4CCF",
    },
    shape4: {
      width: 200,
      height: 200,
      backgroundColor: theme ? "white" : "black",
      borderWidth: 5,
      position: "absolute",
      left: -150,
      top: 0,
      borderRadius: 400,
      zIndex: 0,
      borderColor: "#B958A5",
    },
  });

  return (
    <View style={styles.container}>
      <BottomNavigationBar navigation={navigation} />
      <TopBar />
      <SettingsModal navigation={navigation} />
      <StatusBar hidden />
      <CreateCardField />
      <View style={styles.shape1} />
      <View style={styles.shape2} />
      <View style={styles.shape3} />
      <View style={styles.shape4} />
    </View>
  );
}
