import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import { object, string } from "yup";

import { styles } from "./RegistrationScreenStyled";

import InputComponent from "../../components/Input/InputComponent";
import ImageAddButton from "../../components/Button/ImageAddButton/ImageAddButton";
import Background from "../../assets/img/app_background.jpg";

const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmitButtonPress = async () => {
    setLoginError("");
    setEmailError("");
    setPasswordError("");

    const validationSchema = object().shape({
      login: string()
        .min(3, "Логін повинен містити принаймні 3 символи")
        .required("Введіть логін"),
      email: string()
        .email("Введіть коректну електронну пошту")
        .required("Введіть електронну пошту"),
      password: string()
        .min(5, "Пароль повинен містити принаймні 5 символів")
        .required("Введіть пароль"),
    });

    try {
      await validationSchema.validate({ login, email, password });
      console.warn("Validation successful");
      navigation.navigate("Home", {
        screen: "PostScreen",
        params: {
          user: "123",
        },
      });
    } catch (error) {
      console.warn("Validation error:", error);
      error.inner.forEach((err) => {
        const { path, message } = err;
        if (path === "login") {
          setLoginError(message);
        } else if (path === "email") {
          setEmailError(message);
        } else if (path === "password") {
          setPasswordError(message);
        }
      });
    }
  };
  return (
    <ImageBackground
      source={Background}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    >
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.registrationContainer}>
            <View style={styles.userImageContainer}>
              <ImageAddButton />
            </View>

            <Text style={styles.registrationFormHeader}>Реєстрація</Text>

            <View style={styles.registrationForm}>
              <InputComponent
                placeholder={"Логін"}
                type={"text"}
                name={"login"}
                value={login}
                onChangeText={setLogin}
              />
              {loginError !== "" && (
                <Text style={{ color: "red" }}>{loginError}</Text>
              )}

              <InputComponent
                placeholder={"Адреса електронної пошти"}
                type={"email"}
                name={"email"}
                value={email}
                onChangeText={setEmail}
              />
              {emailError !== "" && (
                <Text style={{ color: "red" }}>{emailError}</Text>
              )}

              <View style={{ position: "relative" }}>
                <InputComponent
                  placeholder={"Пароль"}
                  type={"password"}
                  name={"password"}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                {passwordError !== "" && (
                  <Text style={{ color: "red" }}>{passwordError}</Text>
                )}
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
              style={styles.registrationFormSubmitButton}
              title="Зареєструватися"
            >
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  color: "#ffffff",
                }}
              >
                Реєструватися
              </Text>
            </TouchableOpacity>

            <View
              style={{
                display: "flex",
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
                Вже є акаунт?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text
                  style={{
                    gap: 3,
                    fontSize: 16,
                    color: "#1B4371",
                  }}
                >
                  Увійти
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default RegistrationScreen;
