import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { db } from "../firebase";

export default function WordsModal({
  selectedSetCardId,
  setModalVisible,
  modalVisible,
}) {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [front, setFront] = useState(true);
  const getWords = () => {
    const wordsRef = collection(db, "words");
    const q = query(wordsRef, where("setId", "==", selectedSetCardId));
    getDocs(q).then((res) => {
      res.forEach((doc) => {
        setWords((prev) => [
          ...prev,
          {
            id: doc.id,
            word: doc.data().word,
            definition: doc.data().definition,
            example: doc.data().example,
          },
        ]);
        
      });
      setLoading(false);
    });
  };

  useEffect(() => {
    if (modalVisible === false) {
      setWords([]);
    }
    if (modalVisible === true && words.length === 0) {
      getWords();
    }
  }, [modalVisible]);

  const styles = StyleSheet.create({
    closeButton: {
      position: "absolute",
      bottom: 0,
      right: 20,
      backgroundColor: "red",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: 10,
    },
    earlyReturnContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    earlyReturnText: {
      borderRadius: 50,
      backgroundColor: "gray",
      padding: 30,
      fontSize: 30,
    },
    mainContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F0ECE3",
    },
    scrollViewContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    wordCardContainer: {
      height: 400,
      width: Dimensions.get("screen").width,

      justifyContent: "center",
      paddingHorizontal: 10,
      alignItems: "center",
    },
    wordCardInnerContainer: {
      backgroundColor: "#C8E3D4",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      borderRadius: 20,
    },
    wordText: { fontSize: 30, textAlign: "center" },
    descriptionText: {
      fontSize: 30,
      padding: 20,
      backgroundColor: "#87AAAA",
      textAlign: "center",
    },
    exampleText: {
      fontSize: 24,
      paddingHorizontal: 20,
      paddingTop: 20,
      textAlign: "center",
    },
  });

  if (loading) {
    return (
      <View style={styles.earlyReturnContainer}>
        <Text style={styles.earlyReturnText}>LOADING</Text>
      </View>
    );
  }
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.mainContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          contentContainerStyle={styles.scrollViewContainer}
        >
          {(!loading && words.length===0)?<View style={{flex:1,justifyContent:"center", alignItems:"center"}}><Text>It looks like here is empty</Text></View>:words.map((word) => {
            return (
              <View key={word.id} style={styles.wordCardContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setTimeout(() => {
                      setFront((prev) => !prev);
                    }, 100);
                  }}
                  activeOpacity={0.7}
                  style={styles.wordCardInnerContainer}
                >
                  {front ? (
                    <Text style={styles.wordText}>{word.word}</Text>
                  ) : (
                    <View>
                      <Text style={styles.descriptionText}>
                        {word.definition}
                      </Text>
                      <Text style={styles.exampleText}>{word.example}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setModalVisible(false)}
        style={styles.closeButton}
      >
        <Icon name="close" size={30} />
      </TouchableOpacity>
    </Modal>
  );
}
