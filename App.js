import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import BottomNavigationBar from "./components/BottomNavigationBar";
import WelcomeScreen from "./screens/WelcomeScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <BottomNavigationBar />
    </View>
  );
}
