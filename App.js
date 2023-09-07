import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { useFonts } from "expo-font";
import { StyleSheet, View } from "react-native";

import RegistrationScreen from "./Screens/RegistrationScreen/RegistrationScreen";

import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import PostsScreen from "./Screens/PostsScreen/PostsScreen";
import MapScreen from "./Screens/MapScreen/MapScreen";
import Home from "./Screens/Home/Home";
import CreatePostsScreen from "./Screens/CreatePostsScreen/CreatePostsScreen";
import ProfileScreen from "./Screens/ProfileScreen/ProfileScreen";
import CommentsScreen from "./Screens/CommentsScreen/CommentsScreen";
import store from "./redux/store";
import { Provider } from "react-redux";

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
    <Provider store={store}>
      <View style={styles.container}>
        <NavigationContainer>
          <MainStack.Navigator initialRouteName="LoginScreen">
            <MainStack.Screen
              options={{ headerShown: false }}
              name="Home"
              component={Home}
            />
            <MainStack.Screen
              options={{ headerShown: false }}
              name="Registration"
              component={RegistrationScreen}
            />
            <MainStack.Screen
              options={{ headerShown: false }}
              name="LoginScreen"
              component={LoginScreen}
            />
            <MainStack.Screen
              options={{ headerShown: false }}
              name="Posts"
              component={PostsScreen}
            />
            <MainStack.Screen
              options={{ headerShown: false }}
              name="Create Post"
              component={CreatePostsScreen}
            />
            <MainStack.Screen
              options={{ headerShown: false }}
              name="CommentsScreen"
              component={CommentsScreen}
            />
            <MainStack.Screen
              options={{ headerShown: false }}
              name="Profile"
              component={ProfileScreen}
            />
            <MainStack.Screen
              options={{ headerShown: true }}
              name="MapScreen"
              component={MapScreen}
            />
          </MainStack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
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
