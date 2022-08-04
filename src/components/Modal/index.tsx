import React from 'react';
import { Box, Stack, Text, Image, Heading, Flex, CloseIcon, Button } from 'native-base';
import {Dimensions, StyleSheet} from 'react-native'
import { ICommerce } from '../../@types/interfaces';

interface ModalProps {
  commerce: ICommerce
  handleOpenDetatil: () => void;
}

export const Modal = ({commerce, handleOpenDetatil}:ModalProps) =>{

  return(
    <Flex direction='row' justifyContent="center" style={style.container}>
        <Button style={style.expandIconButton} onPress={handleOpenDetatil}>
          <Image resizeMode="cover" source={require('../../assets/icons/expand.png')} alt="expand image" size={4}/>
        </Button>
        <Box height="100%" justifyContent="center">
          <Image source={{
            uri: commerce.image
          }} alt="image" size="lg" resizeMode={"contain"} borderRadius={10}/>
        </Box>
        <Stack ml={2} height="100%" style={style.text}>
          <Heading size="md" color={"muted.500"} style={style.title}>
            {commerce.name}
          </Heading>
          <Text color= {"muted.500"} style={style.description}>
            {commerce.descripition}
          </Text>
          <Text color= {"muted.500"} style={style.phone}>
            phone: {commerce.phone}
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
    height: 140,
    marginTop: 5,
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: .6,
    shadowRadius: 50,
    shadowOffset: { width:0, height: 0 },
    elevation: 5
  },
  text:{
    flex:1,
    justifyContent: 'center'
  },
  title:{
    fontSize: 18
  },
  description:{
    fontSize: 12 
  },
  expandIconButton:{
    position: 'absolute',
    right: 10,
    top: 4,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent:'center',
    flex:1,
    padding: 0,
    width: 40,
    height: 40,
  },
  phone:{
    fontSize: 12,
  }
})
