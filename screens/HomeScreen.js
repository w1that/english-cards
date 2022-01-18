import React, { useEffect } from "react";
import {
  Alert,
  BackHandler,
  Dimensions,
  Settings,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CreateCardField from "../components/CreateCardField";
import SettingsModal from "../components/SettingsModal";
import { toggleOptionsVisibility } from "../slices/modalsSlice";
import { setCurrentScreen } from "../slices/screenRouteSlice";
import { setCurrentUser } from "../slices/userSlice";

export default function HomeScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const modals = useSelector((state) => state.modals.optionsVisible);
  const theme = useSelector(state=>state.theme.darkTheme);
    const user = useSelector(state => state.user.currentUser);

  useEffect(() => {
    //when you are home and pressed to back button of the device, then it makes application exits.
    BackHandler.addEventListener("hardwareBackPress", () =>
      BackHandler.exitApp()
    );

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", () =>
        BackHandler.exitApp()
      );
  }, []);

  useEffect(() => {
    dispatch(setCurrentScreen("Home"));
    dispatch(setCurrentUser(route.params.currentUser));
  }, []);

  const styles = StyleSheet.create({
    container: {
      height: Dimensions.get("screen").height,
      backgroundColor: theme?"#fff4f0":'#544179',
      position: "relative",
      justifyContent:"center", 
      alignItems:"center"
    },
  });

  return (
    <View style={styles.container}>
      <SettingsModal navigation={navigation} />
      <StatusBar hidden />
      <CreateCardField/>
    </View>
  );
}
