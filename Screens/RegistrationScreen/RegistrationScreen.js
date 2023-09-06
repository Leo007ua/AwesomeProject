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
  Image,
} from "react-native";

import { styles } from "./RegistrationScreenStyled";
import * as ImagePicker from "expo-image-picker";

import InputComponent from "../../components/Input/InputComponent";
import ImageAddButton from "../../components/Button/ImageAddButton/ImageAddButton";
import Background from "../../assets/img/app_background.jpg";
import { useDispatch, useSelector } from "react-redux";
import { registration } from "../../redux/auth/authOperations";
import { selectIsAuthorized } from "../../redux/auth/authSelectors";
import ImageRemoveButton from "../../components/Button/ImageRemoveButton/ImageRemoveButton";

const RegistrationScreen = () => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const [userAvatar, setUserAavatar] = useState(null);
  const isAutorized = useSelector(selectIsAuthorized);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRemoveImage = () => {
    setUserAavatar(null);
  };

  const handleSubmitButtonPress = () => {
    if (!login || !email || !password) {
      alert("Please enter valid credentials!");
      return;
    }
    if (!userAvatar) {
      alert("Please add user photo!");
      return;
    }
    dispatch(
      registration({
        userName: login,
        email: email,
        password: password,
        userPhoto: userAvatar,
      })
    ).then((result) => {
      if (result.type === "authorization/registration/fulfilled") {
        navigation.navigate("Home", {
          screen: "PostScreen",
        });
      } else if (result.type === "authorization/registration/rejected") {
        console.error("Registration failed:", result.error);
        alert("Registration failed: " + result.error.message);
      }
    });

    isAutorized &&
      navigation.navigate("Home", {
        screen: "PostScreen",
      });
  };

  const uploadAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) setUserAavatar(result.assets[0].uri);
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
              {userAvatar && (
                <Image
                  source={{ uri: userAvatar }}
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 16,
                  }}
                />
              )}
              {!userAvatar ? (
                <ImageAddButton onPress={uploadAvatar}></ImageAddButton>
              ) : (
                <ImageRemoveButton
                  onPress={handleRemoveImage}
                ></ImageRemoveButton>
              )}
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
