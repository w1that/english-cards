import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import BottomNavigationBar from "../components/BottomNavigationBar";
import TopBar from "../components/TopBar";
import { getAllSets, getAllWords } from "../firebase";

export default function DiscoverScreen({ navigation }) {
  const theme = useSelector((state) => state.theme.darkTheme);
  const [allSets, setAllSets] = useState([]);
  const [allWords, setAllWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gotAllWords, setGotAllWords] = useState(false);
  const [selectedSetId, setSelectedSetId] = useState("");

  useEffect(() => {
    if (!gotAllWords) {
      getAllWords(setAllWords, setGotAllWords);
    }
  }, []);

  useEffect(() => {
    if (gotAllWords) {
      getAllSets(setAllSets, allWords);
      setLoading(false);
    }
  }, [allWords, gotAllWords]);

  const styles = StyleSheet.create({
    loadingContainer: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    mainContainer: {
      height: Dimensions.get("screen").height,
      backgroundColor: theme ? "#fff" : "#544179",
      position: "relative",
      justifyContent: "flex-start",
      alignItems: "center",
      flex: 1,
    },
    innerScrollContainer: {
      marginHorizontal: 20,
      marginVertical: 100,
      width: "100%",
    },
    setCardContainer: {
      backgroundColor: theme ? "#e0e0e0" : "white",
      justifyContent: "center",
      alignItems: "center",
      width: Dimensions.get("screen").width / 1.5,
      padding: 20,
      margin: 10,
      borderRadius: 10,
      alignSelf: "center",
    },
    setTitleText: { fontSize: 30 },
    setWordsText: { fontSize: 24 },
    wordCardContainer: {
      flex: 1,
      width: "100%",
      height: "100%",
      paddingBottom: 20,
    },
    innerWordCardContainer: {
      backgroundColor: "#f0f0f0",
      marginBottom: 50,
      width: "80%",
      paddingBottom: 30,
      alignItems: "center",
      borderRadius: 20,
      borderWidth: 1,
      borderLeftColor: "#e0e0e0",
      borderRightColor: "#e0e0e0",
      borderBottomColor: "#e0e0e0",
      borderTopColor: "#aa96d6",
    },
    wordCardWordText: {
      fontSize: 30,
      backgroundColor: "#BAABDA",
      width: "100%",
      textAlign: "center",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingVertical: 10,
    },
    wordCardDefinitionText: {
      flexDirection: "column",
      alignSelf: "center",
      justifyContent: "center",
      marginTop: 30,
    },
    backToDiscoverButton: {
      position: "absolute",
      bottom: 0,
      alignSelf: "center",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    backToDiscoverText: {
      fontSize: 22,
      color: theme ? "black" : "white",
      textAlign: "center",
    },
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>LOADING</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        style={styles.innerScrollContainer}
        contentContainerStyle={{
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {!selectedSetId ? (
          allSets.map((set) => {
            return (
              <TouchableOpacity
                onPress={() => setSelectedSetId(set.id)}
                key={set.id}
                style={styles.setCardContainer}
              >
                <Text style={styles.setTitleText}>{set.title}</Text>
                <Text style={styles.setWordsText}>
                  {set.words.length} words
                </Text>
              </TouchableOpacity>
            );
          })
        ) : (
          <ScrollView
            style={styles.wordCardContainer}
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {allSets
              .find((set) => set.id === selectedSetId)
              .words.map((word) => {
                return (
                  <View key={word.id} style={styles.innerWordCardContainer}>
                    <Text style={styles.wordCardWordText}>
                      {word.data.word}
                    </Text>
                    <View style={styles.wordCardDefinitionText}>
                      <Text style={{ fontSize: 24 }}>
                        {word.data.definition}
                      </Text>
                      <Text style={{ fontSize: 24 }}>{word.data.example}</Text>
                    </View>
                  </View>
                );
              })}
            <TouchableOpacity
              onPress={() => setSelectedSetId("")}
              style={styles.backToDiscoverButton}
            >
              <Text style={styles.backToDiscoverText}>Back to Discover</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </ScrollView>
      <BottomNavigationBar navigation={navigation} />
      <TopBar />
    </View>
  );
}
