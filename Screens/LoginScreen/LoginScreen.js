import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";

import { styles } from "./LoginScreenStyled";
import InputComponent from "../../components/Input/InputComponent";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmitButtonPress = () => {
    console.log({ email, password });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={styles.loginContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.loginFormHeader}>Увійти</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.loginForm}
        >
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
        </KeyboardAvoidingView>

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
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              color: "#1B4371",
              textAlign: "center",
            }}
          >
            Немає аккаунту? Зареєструватися
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;