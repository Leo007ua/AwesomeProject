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
  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validationSchema = object().shape({
    login: string().required("Введіть логін"),
    email: string().email("Введіть коректну електронну пошту").required("Введіть електронну пошту"),
    password: string().required("Введіть пароль"),
  });

  const handleSubmitButtonPress = async () => {
    try {
      await validationSchema.validate({ login, email, password });
      navigation.navigate("Home", {
        screen: "PostScreen",
        params: {
          user: "123",
        },
      });
    } catch (error) {
      const errorMessage = error.message;
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
              <InputComponent
                placeholder={"Адреса електронної пошти"}
                type={"email"}
                name={"email"}
                value={email}
                onChangeText={setEmail}
              />

              <View style={{ position: "relative" }}>
                <InputComponent
                  placeholder={"Пароль"}
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
