import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { useFonts } from "expo-font";
import { StyleSheet, View } from "react-native";

import RegistrationScreen from "./Screens/RegistrationScreen/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
// import PostsScreen from "./Screens/PostsScreen/PostsScreen";
// import CommentsScreen from "./Screens/CommentsScreen/CommentsScreen";
// import MapScreen from "./Screens/MapScreen/MapScreen";
// import Home from "./Screens/Home/Home";

const MainStack = createStackNavigator(); // вказує на групу навігаторів

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="Login">
          {/* <MainStack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          /> */}
          <MainStack.Screen
            options={{ headerShown: false }}
            name="Registration"
            component={RegistrationScreen}
          />
          <MainStack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          {/* <MainStack.Screen
            options={{ headerShown: false }}
            name="Posts"
            component={PostsScreen}
          /> */}
          {/* <MainStack.Screen
            options={{ headerShown: false }}
            name="Create Post"
            component={CreatePostsScreen}
          /> */}
          {/* <MainStack.Screen
            options={{ headerShown: false }}
            name="Comments"
            component={CommentsScreen}
          /> */}
          {/* <MainStack.Screen
            options={{ headerShown: false }}
            name="Profile"
            component={ProfileScreen}
          /> */}
          {/* <MainStack.Screen name="Map" component={MapScreen} /> */}
        </MainStack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    position: "absolute",
    width: "100%",
    flex: 1,
    justifyContent: "center",
  },
});
