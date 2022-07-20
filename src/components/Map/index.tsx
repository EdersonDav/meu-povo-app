import React, { useState, useEffect } from 'react';
import { MapContainer, MapContent } from './style';
import * as Location from 'expo-location';
import { Alert, StyleSheet, View, Text, Dimensions } from 'react-native';
import { VStack } from 'native-base';
import Constants from 'expo-constants';
import MapView,{Marker} from 'react-native-maps';

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
    <>
      <VStack flex={1} alignItems="center" px={8} pt={28}>
        <Text style={styles.title}>Bem Vindo.</Text>
        <View style={styles.mapContainer}>
          {initialPosition[0] !== 0 && (

            <MapView style={styles.map}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
            </MapView>
          )}
        </View>
        <View style={styles.title}></View>

      </VStack>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight
  },

  title: {
    fontSize: 20,
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
  },

  mapContainer: {
    flex: 1,
    width: Dimensions.get('window').width - 50,
    height: Dimensions.get('window').height,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80,
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto-Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});
