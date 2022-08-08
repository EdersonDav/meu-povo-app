import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Center, Heading, Modal as ModalContainer, VStack, Image } from 'native-base';
import {useDispatch, useSelector} from 'react-redux';

import { useSelectCommerce } from '../../redux/sliceSelectedCommerce'
import {useModal, closeModal} from '../../redux/sliceOpenModal';

export const Modal = () => {
  const dispatch = useDispatch();
  const showModal = useSelector(useModal)
  const commerce = useSelector(useSelectCommerce);
  return (
    <Center>
      <ModalContainer size='xl' isOpen={showModal} onClose={() => dispatch(closeModal())} _backdrop={{
      _dark: {
        bg: "coolGray.800"
      },
      bg: "warmGray.50"
    }}>
        <ModalContainer.Content maxWidth="350" maxH="212" style={style.modalContent}>
          <ModalContainer.CloseButton />
          <ModalContainer.Body>
            <VStack style={style.modalHeader}>
              <Image source={{
                uri: commerce.image
              }} alt="image" size="lg" resizeMode={"contain"} borderRadius={10}/>
              <Heading size="md" color={"muted.500"} style={style.title}>
                {commerce.name}
              </Heading>
            </VStack>
            <VStack style={style.descriptionContent}>
              {}
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
    elevation: 5
  },
  title:{
    fontSize: 18,
    marginTop: 10
  },
  description:{
    fontSize: 12 
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
  },
  modalHeader:{
    justifyContent:'center',
    alignItems:'center'
  },
  descriptionContent:{

  }
})
