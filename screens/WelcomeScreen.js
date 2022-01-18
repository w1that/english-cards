import { current } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { BackHandler, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SigninPopup from "../components/SigninPopup";
import SignupPopup from "../components/SignupPopup";
import { setCurrentScreen } from "../slices/screenRouteSlice";
import { setCurrentUser } from "../slices/userSlice";

export default function WelcomeScreen({ navigation}) {
  
  
  const [signinVisible, setSigninVisible] = useState(false);
  const [signupVisible, setSignupVisible] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCurrentScreen('Welcome'));
    setSigninVisible(false);
    setSignupVisible(false);
  }, [])


  
  const styles = StyleSheet.create({
    container: {
      paddingTop: 20,
      paddingHorizontal: 20,
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-around",
      alignItems: "center",
    },
    welcomeMessage1: {
      fontSize: 30,
      textAlign: "center",
      marginBottom: 20,
    },
    welcomeMessage2: {
      fontSize: 20,
      textAlign: "center",
    },
    signupButton: {
      backgroundColor: "#00b803",
      width: "40%",
      paddingVertical: 16,
      alignItems: "center",
      borderRadius: 10,
    },
    signinButton: {
      backgroundColor: "#ff8b00",
      width: "40%",
      paddingVertical: 16,
      alignItems: "center",
      borderRadius: 10,
    },
    buttonsContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      zIndex: 1,
    },
    signupText:{
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
      fontFamily: "monospace",
    },
    signinText:{
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
      fontFamily: "monospace",
    },
    bubbleOne:{
      width: 150,
      height: 150,
      backgroundColor: "#ffe0c9",
      position: "absolute",
      left: -75,
      borderRadius: 100,
    },
    bubbleTwo:{
      width: 300,
      height: 300,
      backgroundColor: "#c9e1ff",
      position: "absolute",
      right: -150,
      borderRadius: 150,
      bottom: 0,
    }
  });


  return (
    <View style={styles.container}>
        <SigninPopup navigation={navigation} setSigninVisible={setSigninVisible} signinVisible={signinVisible}/>
        <SignupPopup setSignupVisible={setSignupVisible} signupVisible={signupVisible}/>
      <View style={{ zIndex: 1 }}>
        <Text style={styles.welcomeMessage1}>Welcome to Word Cards!</Text>
        <Text style={styles.welcomeMessage2}>
          The way both you can create your own word cards and see the ones that
          created by others!{" "}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={()=>setSignupVisible(true)} style={styles.signupButton} activeOpacity={0.7}>
          <Text
            style={styles.signupText}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setSigninVisible(true)} style={styles.signinButton} activeOpacity={0.7}>
          <Text
            style={styles.signinText}
          >
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={styles.bubbleOne}
      />
      <View
        style={styles.bubbleTwo}
      />
    </View>
  );
}
