import { doc, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid/non-secure";
import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import Icon from "react-native-vector-icons/AntDesign";

export default function CreateSetModal({
  createSetVisible,
  setCreateSetVisible,
}) {
  const [title, setTitle] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const theme = useSelector((state) => state.theme.darkTheme);
  const styles = StyleSheet.create({
    mainContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    innerContainer: {
      backgroundColor: theme ? "#F8F5F1" : "#3F3351",
            width: "100%",
      height: "100%",
      padding: 10,
      position: "relative",
      justifyContent:"space-evenly"
    },
    mainTitle: {
      fontSize: 20,
      borderBottomWidth: 1,
      paddingBottom: 10,
      marginBottom: 10,
      textAlign:'center',
      borderColor:theme?'#e0e0e0':'gray',
      color: theme ? "black" : "white",
    },exitButton: {
      justifyContent: "center",
      backgroundColor: theme ? "white" : "red",
      width: 50,
      height: 50,
      borderTopLeftRadius: 10,
      alignItems: "center",
      alignSelf: "center",
      position: "absolute",
      bottom: 0,
      backgroundColor:'#9B0000',
      right: 0,
    },
    setButton: {
      width: "100%",
      margin: 10,
      backgroundColor: theme ? "white" : "black",
      borderColor:theme?'#ff5959':'black',
      borderWidth:1,
      borderRadius: 10,
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
      alignSelf:"center"
    },
    setTitle: { fontSize: 20, textAlign: "center", color: theme?"black":'white' },
    input: {
      borderWidth: 1,
      height: 50,
      padding: 10,
      marginBottom: 10,
      borderRadius: 10,
      borderColor: theme ? "#bababa" : "#1f0033",
      color: theme?"black":'white',
      fontSize:18
    },
  });
  const handleCreateSet = () => {
    if (title.length < 4) {
      alert("Title contains at least 4 characters!");
      return;
    }
    setDoc(doc(db, "sets", nanoid()), {
      userId: user.id,
      title: title,
    }).then((res) => {
      setTitle("");
    });
    alert("New set created! Add words into it.");
    setCreateSetVisible(false);
  };
  return (
    <Modal animationType="slide" transparent={true} visible={createSetVisible}>
      <View style={styles.mainContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.mainTitle}>Create Set</Text>
          <TextInput
          onChangeText={(text)=>setTitle(text)}
                  style={styles.input}
                  placeholder="Title of Set"
                  placeholderTextColor={theme ? "gray" : "#e0e0e0"}
                ></TextInput>
          <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={handleCreateSet}
                    style={styles.setButton}
                  >
                    <Text style={styles.setTitle}>Add Empty Set</Text>
                  </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.exitButton}
            onPress={() => {
              setCreateSetVisible(false);
              
            }}
          >
            <Icon name="close" size={30} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
