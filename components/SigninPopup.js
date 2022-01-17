import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Modal, Text, Button, StyleSheet } from "react-native";

export default function SigninPopup({ signinVisible, setSigninVisible }) {
  const styles = StyleSheet.create({
    container: {
      width: "90%",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      height: "100%",
      backgroundColor: "#fff",
      borderRadius: 10,
    },
  });
  return (
    <Modal animationType="slide" transparent={true} visible={signinVisible}>
      <View style={styles.container}>
        <Text>signin</Text>
        <Button
          title={"kapat"}
          onPress={() => setSigninVisible(false)}
        ></Button>
      </View>
    </Modal>
  );
}
