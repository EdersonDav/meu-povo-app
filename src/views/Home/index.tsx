import React from 'react';
import { Container } from './style';
import { Map } from '../../components/Map'
import { Text } from 'react-native';
import { Dimensions } from 'react-native';

export const Home = () => {
  return(
    <Container>
      {/* <Text>{Dimensions.get('window').height}</Text> */}
      <Map/>
    </Container>
  )
}