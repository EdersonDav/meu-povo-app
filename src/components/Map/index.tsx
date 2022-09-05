import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Alert, StyleSheet, Dimensions } from 'react-native';
import { VStack } from 'native-base';
import Constants from 'expo-constants';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { AdMobBanner } from 'expo-ads-admob';

import { selectCommerce, useSelectCommerce } from '../../redux/sliceSelectedCommerce';
import { isEmptyObject } from '../../helpers/isEmptyObject';
import { FooterDetail } from '../FooterDetail/index';
import { useCommerce } from '../../redux/sliceCommerce';

export const Map = () => {
  const dispatch = useDispatch();
  const [initialPosition, setinitialPosition] = useState<[number, number]>([0, 0]);
  const commerces = useSelector(useCommerce);
  const commerceSelected = useSelector(useSelectCommerce)
  
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

  const handleNavigateToDetail = (id: string) => {
    
    const commerceFind = commerces.find(commerce => commerce._id === id)
    if(commerceFind){
      dispatch(selectCommerce(commerceFind))
    }
  }

  return (
    <>
      <VStack flex={1} alignItems="center" px={8} pt={1}>
        <VStack style={styles.mapContainer}>
          {initialPosition[0] !== 0 && (

            <MapView style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >{commerces?.map(commerce => (
              <Marker
                key={String(commerce._id)}
                onPress={() => handleNavigateToDetail(commerce._id)}
                coordinate={{
                  latitude: commerce.address.latitude,
                  longitude: commerce.address.longitude
                }} >
              </Marker>
            ))}
              
            </MapView>
          )}
        </VStack>
        <VStack style={!isEmptyObject(commerceSelected) ? styles.detail : styles.notDetail}>
          {!isEmptyObject(commerceSelected) ? (
            <FooterDetail/>
          ):null}
        </VStack>
        <VStack style={styles.ads}>
          <AdMobBanner
            bannerSize="fullBanner"
            adUnitID="ca-app-pub-3940256099942544/6300978111"
            servePersonalizedAds
          />
        </VStack>
        
      </VStack>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20 + Constants.statusBarHeight,
    
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

  detail:{
    height: 180,
  },

  notDetail:{
    height: 30,
  },

  ads:{
    paddingHorizontal:0,
    height: 65,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
