import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import BottomNavigationBar from '../components/BottomNavigationBar';
import TopBar from '../components/TopBar';
import { collection, getDocs, query, where } from "firebase/firestore";
import {db} from '../firebase'
import SetCard from '../components/SetCard';

export default function MyWordsScreen({navigation, route}) {
    const theme = useSelector(state=>state.theme.darkTheme);
    const user = useSelector(state=>state.user.currentUser);
    const [sets, setSets] = useState([]);


    const getWords =()=>{
      const setsRef = collection(db, "sets");
      const q = query(setsRef, where("userId", "==", user.id));
      getDocs(q)
      .then(res=>{
        res.forEach(doc=>{
          setSets(prev=>[...prev, {data:doc.data(), id:doc.id}]);
        })
      })
      
      
      
    }

    useEffect(() => {
      getWords();
    }, []);

    if(sets.length===0){
      return <Text>Loading...</Text>
    }

  return <View style={{
    // height: Dimensions.get("screen").height,
    // backgroundColor: theme?"#fff4f0":'#544179',
    // position: "relative",
    // justifyContent:"center", 
    // alignItems:"center",
    flex:1,
  }}>
      <BottomNavigationBar navigation={navigation}/>
      <TopBar/>
      <ScrollView pagingEnabled contentContainerStyle={{alignSelf:"center"}} horizontal>
        
      {sets.map(set=>{
        return <SetCard title={set.data.title} id={set.id} />
      })}
      </ScrollView>
      
  </View>;
}
