import React, { useState } from "react";
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

import { styles } from "./LoginScreenStyled";
import InputComponent from "../../components/Input/InputComponent";
import Background from "../../assets/img/app_background.jpg";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmitButtonPress = () => {
    navigation.navigate("Home", {
      screen: "PostScreen",
      params: {
        user: "123",
      },
    });
  };

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
