import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Dimensions } from "react-native";

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import * as Location from "expo-location";
import { styles } from "./MapScreenStyled";

const MapScreen = () => {
  const {
    params: {
      params: { geoLocation },
    },
  } = useRoute();
  const [photoLocation, setPhotoLocation] = useState(
    geoLocation ? geoLocation : null
  );

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
      setPhotoLocation(coords);
    })();
  }, []);

  return (
    <View style={styles.containerFullView}>
      <MapView
        style={styles.mapStyles}
        region={{
          ...photoLocation,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={1}
        onMapReady={() => console.warn("Map is ready")}
        onRegionChange={() => console.warn("Region change")}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
      >
        {photoLocation && (
          <Marker
            title="Локація фотографії"
            coordinate={photoLocation}
            description="Локація"
          />
        )}
      </MapView>
    </View>
  );
};

export default MapScreen;
