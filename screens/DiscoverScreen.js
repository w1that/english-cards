import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import BottomNavigationBar from '../components/BottomNavigationBar';
import TopBar from '../components/TopBar';

export default function DiscoverScreen({navigation}) {
      const theme = useSelector(state=>state.theme.darkTheme);

  return <View style={{
    height: Dimensions.get("screen").height,
    backgroundColor: theme?"#fff4f0":'#544179',
    position: "relative",
    justifyContent:"center", 
    alignItems:"center",
    flex:1
  }}>
      <Text>Discover</Text>
      <BottomNavigationBar navigation={navigation}/>
      <TopBar/>
  </View>
}
