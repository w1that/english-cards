import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import  Icon  from "react-native-vector-icons/AntDesign";
import { db } from "../firebase";

export default function SetCard({ title, id, setSelectedSetCardId, setModalVisible }) {
  const [words, setWords] = useState([]);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const wordsRef = collection(db, "words");
    const q = query(wordsRef, where("setId", "==", id));
    getDocs(q).then((res) => {
      res.forEach((doc) => {
        setWords((prev) => [...prev, doc.data()]);
      });
    });
  }, []);

  const handleDeleteSet =()=>{
    deleteDoc(doc(db, "sets", id)).then(res=>{
      alert("Selected set has been removed")
      setDeleted(true);
    });
  }

  const styles = StyleSheet.create({
    container: {
      width: Dimensions.get("screen").width,
      backgroundColor: "white",
      height: Dimensions.get("screen").height,
      justifyContent: "center",
      alignItems: "center",
    },
    innerContainer: {
      backgroundColor: "#e0e0e0",
      width: "80%",
      height: "50%",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      padding: 10,
      position:"relative"
    },
    title: {
      fontFamily: "monospace",
      fontSize: 40,
    },
    wordLength: {
      fontFamily: "monospace",
      fontSize: 30,
    },
    deleteSetButton:{
      position:"absolute",
      bottom:0, right:0,
      backgroundColor:"red",
      borderBottomRightRadius:20,
      borderTopLeftRadius:20,
      padding:10,
      justifyContent:"center",
       alignItems:"center"
    }
  });

  if(deleted){
    return <></>
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>{
        setSelectedSetCardId(id);
        setModalVisible(true);
      }} style={styles.innerContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.wordLength}>{words.length.toString()} Words</Text>
        <TouchableOpacity onPress={handleDeleteSet} style={styles.deleteSetButton}><Icon name='delete' color={'white'} size={30}/></TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
}
