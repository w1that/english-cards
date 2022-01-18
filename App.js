import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Provider, useDispatch } from "react-redux";
import BottomNavigationBar from "./components/BottomNavigationBar";
import TopBar from "./components/TopBar";
import HomeScreen from "./screens/HomeScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { setCurrentUser } from "./slices/userSlice";
import { store } from "./store";

export default function App() {
  const Stack = createNativeStackNavigator();
  


  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
      <NavigationContainer >
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown:false}}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <BottomNavigationBar />
      <TopBar/>
    </View>
    </Provider>
  );
}
