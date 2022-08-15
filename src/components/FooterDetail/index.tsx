import React from 'react';
import { Box, Stack, Text, Image, Heading, Flex, Button } from 'native-base';
import { Dimensions, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { useSelectCommerce } from '../../redux/sliceSelectedCommerce'
import { setOpenModal } from '../../redux/sliceOpenModal'

export const FooterDetail = () =>{
  const dispatch = useDispatch();
  const commerce = useSelector(useSelectCommerce);

  const handleOpenDetatil = () =>{
    dispatch(setOpenModal())
  }

  return(
    <Flex direction='row' justifyContent="center" style={style.container}>
        <Button style={style.expandIconButton} onPress={handleOpenDetatil}>
          <Image resizeMode="cover" source={require('../../assets/icons/expand.png')} alt="expand icon" size={4}/>
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
          <Box style={style.phoneContainer}>
            <Image style={style.phoneIcon} resizeMode="cover" source={require('../../assets/icons/phone.png')} alt="phone icon" size={4}/> 
            <Text color= {"muted.500"} style={style.phone}>
              {commerce.phone}
            </Text>
          </Box>
          
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
    right: 5,
    top: -5,
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    justifyContent:'flex-end',
    flex:1,
    paddingTop: 15,
    width: 50,
    height: 50,
    zIndex: 10
  },
  phone:{
    fontSize: 12,
    justifyContent:'center',
  },
  phoneIcon:{
    marginRight: 5,
  },
  phoneContainer:{
    flexDirection: 'row',
    alignItems: 'center'
  }
})
