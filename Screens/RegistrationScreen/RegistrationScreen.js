import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./RegistrationScreenStyled";
import InputComponent from "../../components/Input/InputComponent";
import ImageAddButton from "../../components/Button/ImageAddButton/ImageAddButton";

const RegistrationScreen = () => {
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
   
    const handleSubmitButtonPress = () => {
        console.log(login, email, password);
    };
  return (
    <View style={styles.registrationContainer}>
      <View style={styles.userImageContainer}>
         <ImageAddButton/> 
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
          Зареєструватися
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
          Вже є акаунт? Увійти
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistrationScreen;
