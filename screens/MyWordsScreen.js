import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import BottomNavigationBar from '../components/BottomNavigationBar';
import TopBar from '../components/TopBar';

export default function MyWordsScreen({navigation, route}) {
    const theme = useSelector(state=>state.theme.darkTheme);

  return <View style={{
    height: Dimensions.get("screen").height,
    backgroundColor: theme?"#fff4f0":'#544179',
    position: "relative",
    justifyContent:"center", 
    alignItems:"center",
    flex:1
  }}>
      <BottomNavigationBar navigation={navigation}/>
      <TopBar/>
      <Text>My Words</Text>
  </View>;
}
