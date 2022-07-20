import React, { useState, useEffect } from 'react';
import { MapContainer, MapContent } from './style';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

export const Map = () => {
  const [initialPosition, setinitialPosition] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Ops...', 'Precisamos de sua permissão para continuar com a sua localização');
        return;
      }
      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      setinitialPosition([
        latitude,
        longitude
      ]);
    }
    loadPosition();
  }, []);

  return (
    <MapContainer>
      <MapContent
        initialRegion={{
          latitude: initialPosition[0],
          longitude: initialPosition[1],
          latitudeDelta: 0.014,
          longitudeDelta: 0.014,
        }}
      />
    </MapContainer>
  );
}
