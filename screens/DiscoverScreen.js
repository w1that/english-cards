import React, { useEffect, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { useSelector } from "react-redux";
import BottomNavigationBar from "../components/BottomNavigationBar";
import TopBar from "../components/TopBar";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function DiscoverScreen({ navigation }) {
  const theme = useSelector((state) => state.theme.darkTheme);
  const [allSets, setAllSets] = useState([]);
  const [allWords, setAllWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gotAllSets, setGotAllSets] = useState(false);

  function getAllSets() {
    getDocs(collection(db, "sets"))
      .then((res) => {
        res.forEach((doc) => {
            
            
            setAllSets((prev) => [
              ...prev,
              {
                id: doc.id,
                title: doc.data().title,
                userId: doc.data().userId,
                words: allWords.filter((word) => word.data.setId === doc.id),
              },
            ])
        });
      })
      // .then(() => setLoading(false))  
  }
  function getAllWords() {
    getDocs(collection(db, "words"))
      .then((res) => {
        res.forEach((doc) => {
          setAllWords((prev) => [...prev, { id: doc.id, data: doc.data() }]);
        });
        
      }).then(()=>setGotAllSets(true))
  }
  
  useEffect(() => {
    if (allWords.length === 0) {
      getAllWords();
    }
  }, []);

  useEffect(() => {
    if(gotAllSets){
      getAllSets();
      setLoading(false);
    }
  }, [allWords, gotAllSets]);
  

  if (loading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text>LOADING</Text> 
      </View>
    );
  }

  return (
    <View
      style={{
        height: Dimensions.get("screen").height,
        backgroundColor: theme ? "#fff4f0" : "#544179",
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <View>
        

        {allSets.map((set) => {  
          return (
            <View key={set.id}>
              <Text>{set.title}</Text>
              <Text>{set.words.length}</Text>
            </View>
          );
        })}
      </View>
      <BottomNavigationBar navigation={navigation} />
      <TopBar />
    </View>
  );
}
