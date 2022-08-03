import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Alert, StyleSheet, Dimensions } from 'react-native';
import { VStack, Text } from 'native-base';
import Constants from 'expo-constants';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import {commerceClass} from '../../services/Commerces';
import { ICommerce, ISearch } from '../../@types/interfaces';
import {Pin} from './style';
import { isEmptyObject } from '../../helpers/isEmptyObject';
import { Modal } from '../Modal/index';

interface MapProps{
  searchParamns: ISearch;
}

export const Map = ({searchParamns}: MapProps) => {
  const [initialPosition, setinitialPosition] = useState<[number, number]>([0, 0]);
  const [commerces, setCommerces] = useState<ICommerce[]>([])
  const [commerceSelected, setCommerceSelected] = useState<ICommerce>()
  
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

  useEffect(()=>{
    if(searchParamns.nationality){
      commerceClass.searchCommerce(searchParamns.nationality, searchParamns.category).then((res)=>{
        setCommerces(res);
      })
    }
  },[searchParamns])

  const handleNavigateToDetail = (id: string) => {
    
    const commerceFind = commerces.find(commerce => commerce._id === id)
    if(commerceFind){
      
      setCommerceSelected(commerceFind)
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
            >
              {commerces.map(commerce => (
                <Marker
                  key={String(commerce._id)}
                  // style={styles.mapMarker}
                  onPress={() => handleNavigateToDetail(commerce._id)}
                  coordinate={{
                    latitude: commerce.address.latitude,
                    longitude: commerce.address.longitude
                  }} >

                  <Pin>
                  </Pin>
                </Marker>
              ))}
            </MapView>
          )}
        </VStack>
        <VStack style={!isEmptyObject(commerceSelected) ? styles.detail : styles.ads}>
          {!isEmptyObject(commerceSelected) ? (
            <Modal commerce={commerceSelected}/>
          ):null}
        </VStack>
        

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
    width: 20,
    height: 20,
  },

  mapMarkerContainer: {
    width: 30,
    height: 30,
    backgroundColor: '#333',
    overflow: 'hidden',
    textAlign:'center'
  },

  mapMarkerImage: {
    fontSize:100,
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

  detail:{
    height: 200,
  },

  ads:{
    height: 50,
  }
});
