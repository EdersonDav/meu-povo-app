import styled from "styled-components/native";
import MapView from 'react-native-maps';
import { Dimensions } from 'react-native';

export const MapContainer = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`

export const MapContent = styled(MapView) <{ heightContante: string }>`
  width: ${Dimensions.get('window').width};
  height: ${({ heightContante }) => heightContante ? `calc(80 - ${heightContante})` : '100%'};
`