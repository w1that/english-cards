import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import BottomNavigationBar from "../components/BottomNavigationBar";
import TopBar from "../components/TopBar";
import { getWords } from "../firebase";
import SetCard from "../components/SetCard";
import WordsModal from "../components/WordsModal";

export default function MyWordsScreen({ navigation }) {
  const theme = useSelector((state) => state.theme.darkTheme);
  const user = useSelector((state) => state.user.currentUser);
  const [sets, setSets] = useState([]);
  const [selectedSetCardId, setSelectedSetCardId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getWords(user, setSets);
  }, []);

  

  const styles = StyleSheet.create({
    earlyReturnContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    earlyReturnTextContainer: {
      borderRadius: 20,
      marginHorizontal:10,
      backgroundColor: "#e0e0e0",
      padding: 30,
      fontSize: 30,
    },
    scrollViewContainer: { alignSelf: "center" },
    mainContainer: {
      flex: 1,
    },
  });

  if (sets.length === 0) {
    return (
      <View style={styles.earlyReturnContainer}>
        <TopBar/>
        <BottomNavigationBar navigation={navigation} />
        <Text style={styles.earlyReturnTextContainer}>Here is empty. Create new word sets and come again!</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <BottomNavigationBar navigation={navigation} />
      <TopBar />
      <ScrollView
        pagingEnabled
        contentContainerStyle={styles.scrollViewContainer}
        horizontal
      >
        {sets.map((set) => {
          return (
            <SetCard
              setModalVisible={setModalVisible}
              setSelectedSetCardId={setSelectedSetCardId}
              title={set.data.title}
              id={set.id}
            />
          );
        })}
      </ScrollView>
      {selectedSetCardId.length > 0 ? (
        <WordsModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          selectedSetCardId={selectedSetCardId}
        />
      ) : (
        <></>
      )}
    </View>
  );
}
