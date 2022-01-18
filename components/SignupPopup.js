import React from "react";
import {
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";

export default function SignupPopup({ signupVisible, setSignupVisible }) {
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
    },
    bottomButtonsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "80%",
    },
    signupText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
      fontFamily: "monospace",
    },
  });
  return (
    <Modal animationType="slide" transparent={true} visible={signupVisible}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={{ fontSize: 30 }}>SIGNUP</Text>
          <View style={styles.innerContainer}>
            <TextInput style={styles.input} placeholder="username" />
            <TextInput style={styles.input} placeholder="email" />
            <TextInput style={styles.input} placeholder="password" />
            <TextInput style={styles.input} placeholder="password again" />
          </View>

          <View style={styles.bottomButtonsContainer}>
            <TouchableOpacity
              onPress={() => setSignupVisible(false)}
              style={styles.closeButton}
            >
              <Icon color={"red"} size={30} name="close" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.signinButton}>
              <Text style={styles.signupText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
