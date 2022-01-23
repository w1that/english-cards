import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import BottomNavigationBar from '../components/BottomNavigationBar';
import TopBar from '../components/TopBar';
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from '../firebase';

export default function DiscoverScreen({navigation}) {
      const theme = useSelector(state=>state.theme.darkTheme);
      const [allSets, setAllSets] = useState([]);
      const [allWords, setAllWords] = useState([]);
      const [loading, setLoading] = useState(true);

      function getAllSets(){
        getDocs(collection(db, "sets")).then(res=>{
          res.forEach(doc=>{
            setAllSets(prev=>[...prev,{id:doc.id, title:doc.data().title, userId:doc.data().userId }])
          })
        }).then(()=>{
          getAllWords();
        });
      }

      function getAllWords(){
        getDocs(collection(db, 'words')).then(res=>{
          res.forEach(doc=>{
            setAllWords(prev=>[...prev, {id:doc.id, data:doc.data()}])
          })
        }).then(()=>setLoading(false));
      }

      

      useEffect(() => {
        if(allSets.length===0){
          getAllSets();
        }
      }, []);

      
      if(loading){
        return <View style={{justifyContent:"center", alignItems:"center",flex:1}}>
          <Text>LOADING</Text>
          
        </View>
      }

  return <View style={{
    height: Dimensions.get("screen").height,
    backgroundColor: theme?"#fff4f0":'#544179',
    position: "relative",
    justifyContent:"center", 
    alignItems:"center",
    flex:1
  }}>
      <View> 
      <Text>DISCOVER {allSets.length} {allWords.length}</Text> 

      {allSets.map(set=>{
        return <View key={set.id}>
          <Text>{set.title}</Text>
        </View>
      })}
      
      </View>
      <BottomNavigationBar navigation={navigation}/>
      <TopBar/>
  </View>
}
