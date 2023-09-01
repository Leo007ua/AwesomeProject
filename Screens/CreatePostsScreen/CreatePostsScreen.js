import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";

import { styles } from "./CreatePostsScreenStyled";

const CreatePostsScreen = () => {
  const [postPhoto, setPostPhoto] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [photoLocationName, setPhotoLocationName] = useState("");
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setCurrentGeoLocation(coords);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleSubmit = () => {
    console.log(submit)
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.createPostsScreenContainer}>
          <View style={{ paddingLeft: 16, paddingRight: 16 }}>
            <View style={styles.postPhotoContainer}>
              {postPhoto ? (
                <Image
                  source={{ uri: postPhoto }}
                  style={{
                    width: "100%",
                    height: 240,
                    borderRadius: 8,
                  }}
                />
              ) : (
                <Camera
                  style={{
                    borderRadius: 8,
                    width: "100%",
                    height: 240,
                    alignSelf: "center",
                    backgroundColor: "#F6F6F6",
                  }}
                  type={Camera.Constants.Type.back}
                  ref={cameraRef}
                >
                </Camera>
              )}
            </View>

            <TouchableOpacity>
              <Text
                style={{
                  marginBottom: 32,
                  fontSize: 16,
                  color: "#BDBDBD",
                }}
              ></Text>
            </TouchableOpacity>

            <TextInput
              style={styles.photoMetaInput}
              placeholder="Назва..."
              type={"text"}
              name={"photoName"}
              value={photoName}
            />
            <View style={{ position: "relative", marginBottom: 32 }}>

              <TextInput
                style={[styles.photoMetaInput, { paddingLeft: 28 }]}
                placeholder="Місцевість..."
                type={"text"}
                name={"photoLocation"}
                value={photoLocationName}
              />
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              style={[
                styles.publishButton,
                postPhoto
                  ? {
                      backgroundColor: "#FF6C00",
                    }
                  : {
                      color: "#BDBDBD",
                      backgroundColor: "#F6F6F6",
                    },
              ]}
              title="Опублікувати"
              disabled={!postPhoto}
            >
              <Text
                style={[
                  {
                    fontSize: 16,
                    textAlign: "center",
                    color: "#ffffff",
                  },
                  postPhoto
                    ? {
                        backgroundColor: "#FF6C00",
                      }
                    : {
                        color: "#BDBDBD",
                        backgroundColor: "#F6F6F6",
                      },
                ]}
              >
                Опублікувати
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.removePostButton}></TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;
