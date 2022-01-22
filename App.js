import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {View } from "react-native";
import { Provider} from "react-redux";
import { db } from "./firebase";
import DiscoverScreen from "./screens/DiscoverScreen";
import HomeScreen from "./screens/HomeScreen";
import MyWordsScreen from "./screens/MyWordsScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
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
          <Stack.Screen name="Discover" component={DiscoverScreen} />
          <Stack.Screen name="MyWords" component={MyWordsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* <BottomNavigationBar /> */}
      {/* <TopBar/> */}
    </View>
    <StatusBar hidden={true}/>
    </Provider>
  );
}
