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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWords(user, setSets, setLoading);
  }, []);

  

  const styles = StyleSheet.create({
    earlyReturnContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:theme?'white':'#544179'
    },
    earlyReturnTextContainer: {
      borderRadius: 20,
      marginHorizontal:10,
      backgroundColor: theme?"white":'#544179',
      color:theme?'black':'white',
      padding: 30,
      fontSize: 30,
    },
    scrollViewContainer: { alignSelf: "center" },
    mainContainer: {
      flex: 1,
    },
  });

  if (loading) {
    
    return <View style={{flex:1, justifyContent:"center", alignItems:"center",backgroundColor:theme?'white':'black'}}><Text style={{color:theme?'black':'white'}}>LOADING</Text></View>
  }

  if(sets.length===0 && loading===false){
    return (
      <View style={styles.earlyReturnContainer}>
        <TopBar/>
        <BottomNavigationBar navigation={navigation} />
        <Text style={styles.earlyReturnTextContainer}>
This place looks empty. Create new sets and start practicing!</Text>
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
            key={set.id}
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
