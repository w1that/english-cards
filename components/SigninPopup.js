import React, { useState } from "react";
import {
  View,
  Modal,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useDispatch} from "react-redux";

export default function SigninPopup({
  signinVisible,
  setSigninVisible,
  navigation,
}) {
  const users = [
    { username: "username", password: "password" },
    { username: "username1", password: "password1" },
    { username: "u", password: "p" },
  ];

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const dispatch = useDispatch();

  const handleSignIn = () => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username && users[i].password === password) {
        const currentUser = users[i];
        // dispatch(setCurrentUser(currentUser));
        setUserExists(true);
        navigation.navigate("Home", { currentUser: currentUser });
        setSigninVisible(false);
        setUsername('');
        setPassword('');
        return
      } 
    }
    Alert.alert(
      "",
      "Your username and password didn't match. Try again.",
      [
        { text: "OK" },
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      width: "90%",
      alignItems: "center",
      justifyContent: "space-between",
      alignSelf: "center",
      height: "100%",
      backgroundColor: "#fff",
      borderRadius: 10,
      paddingVertical: 50,
    },
    input: {
      padding: 10,
      backgroundColor: "#e0e0e0",
      width: "80%",
      textAlign: "center",
      marginVertical: 10,
      borderRadius: 10,
      color: "black",
      fontSize: 16,
      fontFamily: "monospace",
    },
    closeButton: {
      borderRadius: 50,
      // position:"absolute",
      backgroundColor: "white",
      top: 0,
      right: 0,
    },
    signinButton: {
      width: "60%",
      backgroundColor: "#ff8b00",
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      fontSize: 16,
      borderRadius: 10,
    },
    innerContainer: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    eyeButton: { position: "absolute", right: 50, bottom: 24 },
    bottomButtonsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "80%",
    },
    signinText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
      fontFamily: "monospace",
    },
  });

  return (
    <Modal animationType="slide" transparent={true} visible={signinVisible}>
      <TouchableWithoutFeedback touchSoundDisabled onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={{ fontSize: 30 }}>SIGNIN</Text>
          <View style={styles.innerContainer}>
            <TextInput
              onChangeText={(text) => setUsername(text)}
              value={username}
              style={styles.input}
              placeholder="username"
            />
            <TextInput
              secureTextEntry={passwordVisible ? false : true}
              onChangeText={(text) => setPassword(text)}
              value={password}
              style={styles.input}
              placeholder="password"
            />
            <Pressable
              style={styles.eyeButton}
              onPress={() => setPasswordVisible((prev) => !prev)}
            >
              <Icon size={20} name={passwordVisible ? "eye" : "eyeo"} />
            </Pressable>
          </View>

          <View style={styles.bottomButtonsContainer}>
            <TouchableOpacity
              onPress={() => {
                setPassword(""), setPasswordVisible(false);
                setUsername("");
                setSigninVisible(false);
              }}
              style={styles.closeButton}
            >
              <Icon color={"red"} size={30} name="close" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signinButton}
              onPress={handleSignIn}
            >
              <Text style={styles.signinText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
