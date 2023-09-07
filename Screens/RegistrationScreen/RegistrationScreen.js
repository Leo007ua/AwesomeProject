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
  ActivityIndicator,
} from "react-native";

import { styles } from "./RegistrationScreenStyled";
import * as ImagePicker from "expo-image-picker";

import InputComponent from "../../components/Input/InputComponent";
import ImageAddButton from "../../components/Button/ImageAddButton/ImageAddButton";
import ImageRemoveButton from "../../components/Button/ImageRemoveButton/ImageRemoveButton";
import Background from "../../assets/img/app_background.jpg";
import { useDispatch, useSelector } from "react-redux";
import { registration } from "../../redux/auth/authOperations";
import { selectIsAuthorized } from "../../redux/auth/authSelectors";

const RegistrationScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userAvatar, setUserAvatar] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isAuthorized = useSelector(selectIsAuthorized);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRemoveImage = () => {
    setUserAvatar(null);
  };

  const handleSubmitButtonPress = () => {
    if (!login || !email || !password) {
      alert("Будь ласка, введіть коректні дані!");
      return;
    }
    if (!userAvatar) {
      alert("Будь ласка, додайте фото користувача!");
      return;
    }

    setIsLoading(true); 

    dispatch(
      registration({
        userName: login,
        email: email,
        password: password,
        userPhoto: userAvatar,
      })
    )
      .then((result) => {
        setIsLoading(false); 

        if (result.type === "authorization/registration/fulfilled") {
          navigation.navigate("Home", {
            screen: "PostScreen",
          });
        } else {
          alert("Некоректні дані");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Реєстрація не вдалася. Спробуйте ще раз пізніше.");
        setIsLoading(false); 
      });
  };

  const uploadAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) setUserAvatar(result.assets[0].uri); 
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
              disabled={isLoading} 
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#ffffff" /> 
              ) : (
                <Text
                  style={{
                    fontSize: 16,
                    textAlign: "center",
                    color: "#ffffff",
                  }}
                >
                  Реєструватися
                </Text>
              )}
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
                Вже є акаунт?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("LoginScreen")}
              >
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
