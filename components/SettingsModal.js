import React from "react";
import {
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { toggleOptionsVisibility } from "../slices/modalsSlice";
import { setCurrentScreen } from "../slices/screenRouteSlice";
import { toggleTheme } from "../slices/themeSlice";
import { setCurrentUser } from "../slices/userSlice";

export default function SettingsModal({ navigation }) {
  const optionsVisible = useSelector((state) => state.modals.optionsVisible);
  const theme = useSelector((state) => state.theme.darkTheme);
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme ? "#F9E4C8" : "#3F3351",
      height: "80%",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    titleText: {
      color: "black",
      position: "absolute",
      marginTop:20,
      top: 10,
      color: theme ? "black" : "white",
      fontSize: 30,
    },
    settingsVisibilityCloser: {
      position: "absolute",
      bottom: 0,
      right: 5,
      backgroundColor: theme?'white':"black",
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      padding: 10,
    },
    switchContainer: { justifyContent: "center", alignItems: "center" },
    logoutContainer: {
      justifyContent: "space-evenly",
      flexDirection: "row",
      alignItems: "center",
      width: "30%",
      backgroundColor: theme ? "white" : "black",
      padding: 8,
      borderRadius: 10,
    },
    logoutText: { color: theme ? "black" : "white", fontSize: 16 },
    currentThemeText: { color: theme ? "black" : "white", fontSize: 22 },
  });

  return (
    <Modal animationType="fade" transparent={true} visible={optionsVisible}>
      <StatusBar hidden />
      <View style={styles.container}>
        <Text style={styles.titleText}>Options</Text>
        <Pressable
          style={styles.settingsVisibilityCloser}
          onPress={() => dispatch(toggleOptionsVisibility())}
        >
          <Icon size={30} color={"red"} name="close" />
        </Pressable>
        <View style={styles.switchContainer}>
          <Text style={styles.currentThemeText}>
            Current Theme: {theme ? "Light Theme" : "Dark Theme"}
          </Text>
          <Switch
            trackColor={{ false: "black", true: "#81b0ff" }}
            thumbColor={theme ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => dispatch(toggleTheme())}
            value={theme}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            dispatch(setCurrentUser({ username: "", password: "" }));
            dispatch(setCurrentScreen('Welcome'));
            dispatch(toggleOptionsVisibility());
            navigation.navigate('Welcome');
          }}
          activeOpacity={0.7}
          style={styles.logoutContainer}
        >
          <Icon color={theme ? "black" : "white"} name="logout" size={30} />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
