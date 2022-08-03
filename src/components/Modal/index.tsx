import React,{useEffect, useState} from 'react';
import { Box, Stack, Text, Image, Heading, VStack, Flex } from 'native-base';
import {Dimensions, StyleSheet} from 'react-native'

import { ICommerce } from '../../@types/interfaces';

interface ModalProps {
  commerce: ICommerce
}

export const Modal = ({commerce}:ModalProps) =>{

  return(
    <Flex direction='row' alignItems="center" style={style.container}>
        <Box height="100%">
          <Image source={{
            uri: commerce.image
          }} alt="image" size="xl" resizeMode={"contain"} borderRadius={30}/>
        </Box>
        <Stack ml={2} height="100%">
          <Stack>
            <Heading size="md" ml="-1" color= {"muted.500"}>
              {commerce.name}
            </Heading>
          </Stack>
          <Text fontWeight="400" color= {"muted.500"}>
            {commerce.descripition}
          </Text>
        </Stack>
    </Flex>
  )
}


const style = StyleSheet.create({
  container:{
    paddingHorizontal: 5,
    paddingVertical: 5,
    overflow: "hidden",
    width: Dimensions.get('window').width - 50,
    justifyContent:"flex-start",
    height: 150,
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: "#fff"
  },
})
