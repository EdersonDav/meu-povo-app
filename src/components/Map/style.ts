import styled from "styled-components/native";
import MapView from 'react-native-maps';

export const MapContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 80%;
  border-radius: 10px;
  overflow: hidden;
`

export const MapContent = styled(MapView)`
  width: 100%;
  height: 100%;
`