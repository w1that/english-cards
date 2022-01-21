import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

export default function BottomNavigationBar({navigation}) {
  const theme = useSelector((state) => state.theme.darkTheme);
  const screen = useSelector(state => state.screen.currentScreen);

  if(screen==='Welcome'){
    return <></>
  }

  const styles = StyleSheet.create({
    container: {
      height: 70,
      width: "100%",
      backgroundColor: theme?"#deddf0":'#1F1D36',
      position: "absolute",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      bottom: 0,
    },
    middleButton: {
      width: 70,
      height: 70,
      borderRadius: 50,
      backgroundColor: theme?"#D9D7F1":'#3F3351',
      borderWidth:1,
      borderColor:"#c0beeb",
      position: "absolute",
      top: -35,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10,
    },
    exploreButton: {
      width: 70,
      height: 70,
      borderRadius: 50,
      // position: "absolute",
      // // top: -30,
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      left: "10%",
    },
    myWordsButton: {
      width: 70,
      height: 70,
      borderRadius: 50,
      position: "absolute",
      justifyContent: "center",
      alignItems: "center",
      right: "10%",
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>navigation.navigate('Home')} activeOpacity={0.7} style={styles.middleButton}>
        <Icon name="add" size={60} color={theme?"#000":'white'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('MyWords')} style={styles.myWordsButton} activeOpacity={0.7}>
        <Icon name="bookmarks-outline" size={40} color={"#ff8b00"} />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Discover')} style={styles.exploreButton} activeOpacity={0.7}>
        <Icon name="flash-outline" size={40} color={"#00b803"} />
      </TouchableOpacity>
    </View>
  );
}
