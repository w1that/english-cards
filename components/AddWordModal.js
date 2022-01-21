import { collection, doc, getDocs, query, runTransaction, setDoc, where } from "firebase/firestore";
import { nanoid } from "nanoid/non-secure";
import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Keyboard,
  Modal,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import Icon from "react-native-vector-icons/AntDesign";

export default function AddWordModal({ addWordVisible, setAddWordVisible }) {
  const [selectedSet, setSelectedSet] = useState({ data:{title: ""},id:'' });
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const [example, setExample] = useState("");
  const [wordSets, setWordSets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSets();
  }, []);

  

  function getSets() {
    setWordSets([]);
    const wordSetsRef = collection(db, "sets");
    // const q = query(wordSetsRef, where("userId", "==", user.id));
    const q = query(
      wordSetsRef,
      where("userId", "==", "CEoMZcSsumgB2piOCJwzviFoEjz2")
    );
    getDocs(q).then((res) =>
      res.forEach((doc) => {
        setWordSets((prev) => [...prev, { data: doc.data(), id: doc.id }]);
        setLoading(false);
      })
    );
  }

  const theme = useSelector((state) => state.theme.darkTheme);
  const [refreshing, setRefreshing] = useState(false);
  let wait
  const onRefresh = useCallback(() => {
    getSets();
    setRefreshing(true);
    wait = setTimeout(() => {
      setRefreshing(false);
      clearTimeout(wait);
    }, 1000);
  }, []);

  function resetStates() {
    setDefinition("");
    setExample("");
    setWord("");
    setSelectedSet({ data:{title:''}, id:'' });
    clearTimeout(wait);
  }


  function handleAddToSet(){
    setDoc(doc(db,'words',nanoid()),{
      word:word,
      definition:definition,
      example:example,
      setId:selectedSet.id
    }).then(res=>console.log(res))
    setWord('')
    setDefinition('')
    setExample('')
  }

  useEffect(() => {
    clearTimeout(wait);
  }, [selectedSet]);

  
  const styles = StyleSheet.create({
    mainContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    mainTitle: {
      marginTop:30,
      fontSize: 20,
      borderBottomWidth: 1,
      paddingBottom: 10,
      marginBottom: 10,
      color: theme ? "black" : "white",
    },
    innerContainer: {
      backgroundColor: theme ? "#F8F5F1" : "#3F3351",
      width: "100%",
      height: "100%",
      padding: 10,
      position: "relative",
    },
    exitButton: {
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
    setsContainer: {
      justifyContent: "center",
      flex: 1,
      alignItems: "center",
      flexDirection: "row",
      flexWrap: "wrap",
      width: "100%",
    },
    setButton: {
      width: "70%",
      margin: 10,
      backgroundColor: theme ? "white" : "black",
      borderColor:theme?'#ff5959':'black',
      borderWidth:1,
      borderRadius: 10,
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    setTitle: { fontSize: 20, textAlign: "center", color: theme?"black":'white' },
    addWordContainer: {
      flexDirection: "column",
      justifyContent: "space-evenly",
      alignItems: "center",
      height: "90%",
    },
    buttonsContainer: {
      justifyContent: "space-around",
      flexDirection: "row",
      width: "100%",
    },
    selectAnotherButton: {
      // backgroundColor: theme ? "white" : "black",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      padding: 10,
    },
    selectAnotherText: {
      color: theme ? "black" : "white",
      fontSize:16
    },
    addWordButton: {
      backgroundColor: theme ? "#9B0000" : "#9900ff",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      padding: 10, borderRadius:10,
    },
    addWordText: {
      color: theme ? "white" : "white",
      fontWeight: "bold", borderRadius:10,
      fontSize:18
    },
    input: {
      borderWidth: 1,
      height: 50,
      padding: 10,
      marginBottom: 10,
      borderRadius: 10,
      borderColor: theme ? "#bababa" : "#1f0033",
      color: "white",
      fontSize:18
    },
  });

  if(wordSets.length ===0){
    return <></>
  }


  return (
    <Modal animationType="slide" transparent={true} visible={addWordVisible}>
      <View style={styles.mainContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.mainTitle}>Add Word to an Existing Set</Text>
          {selectedSet.data.title.length === 0 ? (
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              contentContainerStyle={styles.setsContainer}
            >
              {wordSets.map((wordSet) => {
                return wordSets.length === 0 ? (
                  <Text>Loading</Text>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setSelectedSet(wordSet)}
                    style={styles.setButton}
                    key={wordSet.id}
                  >
                    <Text style={styles.setTitle}>{wordSet.data.title}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          ) : (
            <View style={styles.addWordContainer}>
              <View
                style={{
                  width: "100%",
                  height: "30%",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: theme ? "black" : "white",
                    fontSize: 20,
                    marginBottom: 10,
                  }}
                >
                  Add New Words to {selectedSet.data.title}
                </Text>
                <TextInput
                value={word}
                  style={styles.input}
                  onChangeText={(text) => setWord(text)}
                  placeholder="word"
                  placeholderTextColor={theme ? "gray" : "#e0e0e0"}
                ></TextInput>
                <TextInput
                value={definition}
                  style={styles.input}
                  onChangeText={(text) => setDefinition(text)}
                  placeholder="definition"
                  placeholderTextColor={theme ? "gray" : "#e0e0e0"}
                ></TextInput>
                <TextInput
                value={example}
                  style={styles.input}
                  onChangeText={(text) => setExample(text)}
                  placeholder="example sentence"
                  placeholderTextColor={theme ? "gray" : "#e0e0e0"}
                ></TextInput>
              </View>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => resetStates()}
                  contentContainerStyle={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View style={styles.selectAnotherButton}>
                    <Text style={styles.selectAnotherText}>
                      Select another set
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  contentContainerStyle={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={handleAddToSet}
                >
                  <View style={styles.addWordButton}>
                    <Text style={styles.addWordText}>
                      Add to {selectedSet.data.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.exitButton}
            onPress={() => {
              setAddWordVisible(false);
              resetStates()
            }}
          >
            <Icon name="close" size={30} color={'white'}/>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
