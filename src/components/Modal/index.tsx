import React from 'react';
import {Center, Modal as ModalContainer} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';

import {useModal, closeModal} from '../../redux/sliceOpenModal';

export const Modal = () => {
  const dispatch = useDispatch();
  const showModal = useSelector(useModal)
  return (
    <Center>
      <ModalContainer size='xl' isOpen={showModal} onClose={() => dispatch(closeModal())} _backdrop={{
      _dark: {
        bg: "coolGray.800"
      },
      bg: "warmGray.50"
    }}>
        <ModalContainer.Content maxWidth="350" maxH="212">
          <ModalContainer.CloseButton />
          <ModalContainer.Header>Return Policy</ModalContainer.Header>
          <ModalContainer.Body>
            Create a 'Return Request' under “My Orders” section of App/Website.
            Follow the screens that come up after tapping on the 'Return’
            button. Please make a note of the Return ID that we generate at the
            end of the process. Keep the item ready for pick up or ship it to us
            basis on the return mode.
          </ModalContainer.Body>
        </ModalContainer.Content>
      </ModalContainer>
    </Center>
  );
};