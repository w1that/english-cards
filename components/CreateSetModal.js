import { doc, setDoc } from "firebase/firestore";
import { nanoid } from "nanoid/non-secure";
import React, { useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import { db } from "../firebase";

export default function CreateSetModal({
  createSetVisible,
  setCreateSetVisible,
}) {
  const [title, setTitle] = useState('');
  const user = useSelector(state=>state.user.currentUser);
    const styles = StyleSheet.create({
        mainContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
        innerContainer: { backgroundColor: "gray", width: "80%", height: "60%" },
      });
    const handleCreateSet =()=>{
      if(title.length<4){
        alert('Title contains at least 4 characters!')
        return
      }
      setDoc(doc(db, "sets", nanoid()), {
        userId:user.id,
        title: title
      }).then(res=>{
        setTitle('');
      });
      alert('New set created! Add words into it.')
      setCreateSetVisible(false);
    }
  return (
    <Modal animationType="slide" transparent={true} visible={createSetVisible}>
      <View style={styles.mainContainer}>
        <View style={styles.innerContainer}>
          <Text>Create Set</Text>
          <TextInput value={title} onChangeText={(text)=>setTitle(text)} placeholder="set title"></TextInput>
          <Button onPress={handleCreateSet} title="add empty set"></Button>
          <Button onPress={() => setCreateSetVisible(false)} title="close">
            {" "}
          </Button>
        </View>
      </View>
    </Modal>
  );
}
