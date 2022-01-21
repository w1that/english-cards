import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useSelector } from "react-redux";
import AddWordModal from "./AddWordModal";
import CreateSetModal from "./CreateSetModal";

export default function CreateCardField() {
  const theme = useSelector((state) => state.theme.darkTheme);
  const [addWordVisible, setAddWordVisible] = useState(false);
  const [createSetVisible, setCreateSetVisible] = useState(false);

  const styles = StyleSheet.create({
      container:{width:"100%", flexDirection:"column", alignItems:"center"},
    selectionButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "60%",
      marginVertical: 10,
      backgroundColor: theme?'#ffc2c2':"#7b5fb3",
      borderWidth:1,
      borderColor:theme?'#ffa6a6':'black',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    selectionTitle:{ fontSize: 20,color:theme?"black":'white' }
  });
  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={()=>setCreateSetVisible(prev=>!prev)} style={styles.selectionButton}>
          <Icon name="addfolder" size={30} />
          <Text style={styles.selectionTitle}>Create New Set</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setAddWordVisible(prev=>!prev)} style={styles.selectionButton}>
          <Icon name="addfile" size={30} />
          <Text style={styles.selectionTitle}>Add New Word</Text>
        </TouchableOpacity>
        <AddWordModal addWordVisible={addWordVisible} setAddWordVisible={setAddWordVisible}/>
        <CreateSetModal createSetVisible={createSetVisible} setCreateSetVisible={setCreateSetVisible}/>
      </View>
    </View>
  );
}
