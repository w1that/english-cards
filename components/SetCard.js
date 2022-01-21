import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { db } from "../firebase";

export default function SetCard({ title, id }) {
  const [words, setWords] = useState([]);

  useEffect(() => {
    const wordsRef = collection(db, "words");
    const q = query(wordsRef, where("setId", "==", id));
    getDocs(q).then((res) => {
      res.forEach((doc) => {
        setWords((prev) => [...prev, doc.data()]);
        console.log(doc.data);
      });
    });
  }, []);

  const styles = StyleSheet.create({
      container:{
          width:Dimensions.get('screen').width,
        backgroundColor:"white",
        height:Dimensions.get('screen').height,
        justifyContent:"center",
        alignItems:"center",

      },
      innerContainer:{
          backgroundColor:"#e0e0e0",
          width:"80%",
          height:"50%",
          justifyContent:"center",
          alignItems:"center",
          borderRadius:20,
          padding:10
      },
      title:{
          fontFamily:'monospace',
          fontSize:40,
      },
      wordLength:{
          
        fontFamily:'monospace',
        fontSize:30,
      }
  })

  return (
    <View style={styles.container}>
      
      <View style={styles.innerContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.wordLength}>{words.length.toString()} Words</Text>
      </View>
      
    </View>
  );
}
