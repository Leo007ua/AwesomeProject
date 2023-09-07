import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { object, string } from "yup";

import InputComponent from "../../components/Input/InputComponent";
import Background from "../../assets/img/app_background.jpg";
import { styles } from "./LoginScreenStyled";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthorized } from "../../redux/auth/authSelectors";
import { login } from "../../redux/auth/authOperations";
import { auth } from "../../firebase/config";
import { selectUserData } from "../../redux/auth/authSelectors";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const isAutorized = useSelector(selectIsAuthorized);
  const [isLoading, setIsLoading] = useState(false);

  const userData = useSelector(selectUserData);

  const navigateToPostsScreen = () => {
    navigation.navigate("Home", {
      screen: "PostsScreen",
    });
  };

  useEffect(() => {
    if (isAutorized) {
      navigateToPostsScreen();
    }
  }, [isAutorized]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = object().shape({
    email: string()
      .email("Введіть коректну електронну пошту")
      .required("Введіть електронну пошту"),
    password: string()
      .min(5, "Пароль повинен містити принаймні 5 символів")
      .required("Введіть пароль"),
  });

  const handleSubmitButtonPress = async () => {
    if (!login || !email || !password) {
      alert("Будь ласка, введіть коректні дані!");
      return;
    }
    setIsLoading(true); // Включити індикацію завантаження
    (async ()=> {try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      dispatch(setUser(user))
      setIsLoading(false);
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      alert (errorMessage)
      setIsLoading(false);
    }})()
  };
  useEffect(() => {
    userData &&
      navigation.navigate("Home", {
        screen: "PostsScreen",
      });
  }, [userData?.uid]);

  return (
    <ImageBackground
      source={Background}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    >
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.loginContainer}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.loginFormHeader}>Увійти</Text>

            <View style={styles.loginForm}>
              <InputComponent
                placeholder={"Адреса електронної пошти"}
                autoCompleteType="email"
                textContentType="emailAddress"
                type={"email"}
                name={"email"}
                value={email}
                onChangeText={setEmail}
              />

              <View style={{ position: "relative" }}>
                <InputComponent
                  placeholder={"Пароль"}
                  autoCompleteType="password"
                  textContentType="password"
                  type={"password"}
                  name={"password"}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    right: 16,
                    top: 16,
                  }}
                  onPress={togglePasswordVisibility}
                >
                  <Text style={{ color: "#1B4371" }}>
                    {showPassword ? "Приховати" : "Показати"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleSubmitButtonPress}
              style={styles.loginFormSubmitButton}
              title="Зареєструватися"
            >
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  color: "#ffffff",
                }}
              >
                Увійти
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                gap: 3,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "#1B4371",
                  textAlign: "center",
                }}
              >
                Немає аккаунту?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Registration")}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#1B4371",
                    textAlign: "center",
                    textDecorationLine: "underline",
                  }}
                >
                  Зареєструватися
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default LoginScreen;
