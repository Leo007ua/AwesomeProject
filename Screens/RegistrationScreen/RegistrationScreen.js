import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import Background from "../../assets/img/app_background.jpg";
import ImageAddButton from "../../components/Button/ImageAddButton/ImageAddButton";
import ImageRemoveButton from "../../components/Button/ImageRemoveButton/ImageRemoveButton";
import InputComponent from "../../components/Input/InputComponent";
import { registration } from "../../redux/auth/authOperations";
import { selectIsAuthorized } from "../../redux/auth/authSelectors";
import { styles } from "./RegistrationScreenStyled";
import { setUser } from "../../redux/auth/authSlice";
import { selectUserData } from "../../redux/auth/authSelectors";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";

const RegistrationScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userAvatar, setUserAvatar] = useState(null);
  const isAuthorized = useSelector(selectIsAuthorized);
  const [isLoading, setIsLoading] = useState(false);

  const userData = useSelector(selectUserData);

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
    // if (!userAvatar) {
    //   alert("Будь ласка, додайте фото користувача!");
    //   return;
    // }
    setIsLoading(true); // Включити індикацію завантаження
    (async ()=> {try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
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
  userData && navigation.navigate("Home", {
    screen: "PostsScreen",
  });
}, [userData?.uid])

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
              <ImageAddButton
                onPress={uploadAvatar}
              ></ImageAddButton>
            ) : (
              <ImageRemoveButton
                onPress={handleRemoveImage}
              ></ImageRemoveButton>
            )}
          </View>

          <Text style={styles.registrationFormHeader}>Реєстрація</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
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
          </KeyboardAvoidingView>

          <TouchableOpacity
            onPress={handleSubmitButtonPress}
            style={styles.registrationFormSubmitButton}
            title="Зареєструватися"
            disabled={isLoading} // Вимкнути кнопку під час завантаження
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" /> // Відображення індикатора завантаження під час isLoading
            ) : (
              <Text
                style={{
                  fontSize: 16,
                  textAlign: "center",
                  color: "#ffffff",
                }}
              >
                Зареєструватися
              </Text>
            )}
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
    </ImageBackground>
  );
};

export default RegistrationScreen;
