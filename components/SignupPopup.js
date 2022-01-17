import React from 'react'
import { Button, Modal, StyleSheet, Text, View } from 'react-native';

export default function SignupPopup({signupVisible, setSignupVisible}) {
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
        <Modal
        animationType="slide"
        transparent={true}
        visible={signupVisible}
      >
          <View style={styles.container}>
          <Text>Signup</Text>
          <Button title={'kapat'} onPress={()=>setSignupVisible(false)}></Button>
          </View>
      </Modal>
    )
}
