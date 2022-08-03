import React from 'react';

import { VStack, Text } from 'native-base';
import { ICommerce } from '../../@types/interfaces';

interface ModalProps {
  commerce: ICommerce
}

export const Modal = ({commerce}:ModalProps) =>{
  return(
    <VStack>
      <Text>{commerce.name}</Text>
    </VStack>
  )
}