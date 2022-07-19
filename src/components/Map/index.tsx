import * as React from 'react';
import { MapContainer, MapContent } from './style';
import { Dimensions } from 'react-native';

export const Map = () => {
  return (
    <MapContainer>
      {console.log((Dimensions.get('window').height).toFixed(2))}
      <MapContent heightContante={(Dimensions.get('window').height).toFixed(2)}/>
    </MapContainer>
  );
}
