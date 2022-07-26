import React from 'react';
import { Map } from '../../components/Map';
import { SelectComponent } from '../../components/Select';
import { VStack, Flex } from 'native-base';

export const Home = () => {
  return(
    <VStack flex={1} alignItems="center" px={8} pt={30}>
      <Flex flexDirection="row">
        <SelectComponent/>
        <SelectComponent/>
      </Flex>
      <Map/>
    </VStack>
  )
}