import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { toggleOptionsVisibility } from "../slices/modalsSlice";

export default function TopBar() {
  const user = useSelector((state) => state.user.currentUser);
  const theme = useSelector((state) => state.theme.darkTheme);
  const screen = useSelector((state) => state.screen.currentScreen);
  const dispatch = useDispatch();

  if (screen === "Welcome") {
    return <></>;
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme ? "#deddf0" : "#1F1D36",
      height: 70,
      width: "100%",
      position: "absolute",
      top: 0,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      zIndex:2
    },
    innerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      paddingHorizontal: 30,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={{ color: theme ? "black" : "white" }}>
          {user.username}
        </Text>
        <Pressable onPress={() => dispatch(toggleOptionsVisibility())}>
          <Icon size={30} name="setting" color={theme ? "black" : "white"} />
        </Pressable>
      </View>
    </View>
  );
}
