import React, { Fragment, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Center, Heading, Modal as ModalContainer, VStack, Image, Text, Box } from 'native-base';
import {useDispatch, useSelector} from 'react-redux';

import { useSelectCommerce } from '../../redux/sliceSelectedCommerce'
import { useModal, closeModal } from '../../redux/sliceOpenModal';

import { formatObject, IReturnObject, formatValues, capitalized, isEmptyObject } from '../../helpers';

export const Modal = () => {
  const dispatch = useDispatch();
  const showModal = useSelector(useModal)
  const commerce = useSelector(useSelectCommerce);
  const [infos, setInfos] = useState<IReturnObject[]>([])
  const [address, setAddress] = useState<IReturnObject[]>([])

  useEffect(()=>{
    if(!isEmptyObject(commerce)){
      const infosObject = {
        nationality: formatValues(commerce.nationality).toUpperCase(),
        phone: formatValues(commerce.phone),
        site: formatValues(commerce.site),
      }
  
      const addressData = commerce.address
      const addressObject = {
        country: formatValues(addressData.country),
        number: formatValues(addressData.address_number),
        township: formatValues(addressData.township),
        street: formatValues(addressData.street),
        code: formatValues(addressData.postalCode),
        city: formatValues(addressData.city),
        complement: formatValues(addressData.complement),
      }
  
      setInfos(formatObject(infosObject))
      setAddress(formatObject(addressObject))
    }
    

  },[commerce])

  const formatDescription = (data: IReturnObject): JSX.Element =>{
    return(
      <>
        {!!data ? (
          <Box style={style.descriptionContent}>
            <Text color= {"muted.700"} marginRight={1} style={style.description}>
              {capitalized(data.label)}:
            </Text>
          <Text color= {"muted.500"} style={style.description}>
            {data.value}
          </Text>
        </Box>
        ): <></>}
      </>
    )
  }

  return (
    <Center>
      <ModalContainer size='xl' isOpen={showModal} onClose={() => dispatch(closeModal())} _backdrop={{
      _dark: {
        bg: "coolGray.800"
      },
      bg: "warmGray.50"
    }}>
        <ModalContainer.Content maxWidth="350" style={style.modalContent}>
          <ModalContainer.CloseButton />
          <ModalContainer.Body>
            <VStack style={style.modalHeader}>
              <Image source={{
                uri: commerce.image
              }} alt="image" size="lg" resizeMode={"contain"} borderRadius={10}/>
              <Heading size="md" color={"muted.500"} style={style.title}>
                {commerce.name}
              </Heading>
              <Text color= {"muted.500"} style={style.description}>
                {commerce.descripition}
              </Text>
            </VStack>
            <VStack style={style.descriptionContainer}>

              {infos.length ? infos.map(item => (
                <Fragment key={item.label}>
                  {formatDescription(item)}
                </Fragment>
              )): null}

              {address.length ? address.map(item => (
                <Fragment key={item.label}>
                  {formatDescription(item)}
                </Fragment>
              )): null}
            </VStack>
          </ModalContainer.Body>
        </ModalContainer.Content>
      </ModalContainer>
    </Center>
  );
};

const style = StyleSheet.create({
  modalContent:{
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: .6,
    shadowRadius: 50,
    shadowOffset: { width:0, height: 0 },
    elevation: 5,
    overflow:'hidden',
  },
  title:{
    fontSize: 18,
    marginTop: 10
  },
  description:{
    fontSize: 12 
  },
  descriptionContent:{
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingRight: 50
  },
  modalHeader:{
    justifyContent:'center',
    alignItems:'center'
  },
  descriptionContainer:{

  }
})
