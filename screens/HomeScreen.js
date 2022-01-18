import React, { useEffect } from "react";
import { Alert, BackHandler, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentScreen } from "../slices/screenRouteSlice";
import { setCurrentUser } from "../slices/userSlice";

export default function HomeScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const currentScreen = useSelector((state) => state.screen.currentScreen);

  useEffect(() => {
    //when you are home and pressed to back button of the device, then it makes application exits.
    BackHandler.addEventListener("hardwareBackPress", () =>BackHandler.exitApp()
    );
  }, []);

  useEffect(() => {
    dispatch(setCurrentScreen("Home"));
    dispatch(setCurrentUser(route.params.currentUser));
  }, []);

  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}
