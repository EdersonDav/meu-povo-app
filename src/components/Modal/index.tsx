import React, { Fragment, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Center, Heading, Modal as ModalContainer, VStack, Image, Text, Box } from 'native-base';
import {useDispatch, useSelector} from 'react-redux';

import { useSelectCommerce } from '../../redux/sliceSelectedCommerce'
import { useModal, closeModal } from '../../redux/sliceOpenModal';

import { formatObject, IReturnObject, formatValues, capitalized, isEmptyObject } from '../../helpers';
import { WorkingTime, formatWorkingTime } from '../../helpers/formatWorkingTime';

export const Modal = () => {
  const dispatch = useDispatch();
  const showModal = useSelector(useModal)
  const commerce = useSelector(useSelectCommerce);
  const [infos, setInfos] = useState<IReturnObject[]>([])
  const [address, setAddress] = useState<IReturnObject[]>([])
  const [workingTime, setWorkingTime] = useState<WorkingTime[]>([])

  useEffect(()=>{
    if(!isEmptyObject(commerce)){
      const infosObject = {
        nationality: formatValues(commerce.nationality).toUpperCase(),
        phone: formatValues(commerce.phone),
        site: formatValues(commerce.site),
      }

      const addressData = commerce.address
      const number = formatValues(addressData.address_number)
      const street = formatValues(addressData.street)
      const city = formatValues(addressData.city)
      const info = formatValues(addressData.complement)
      const code = formatValues(addressData.postalCode)
      const addressObject = {
        locale: `${street} ${number}, ${info}, ${code} ${city}`,
      }
  
      setInfos(formatObject(infosObject))
      setAddress(formatObject(addressObject))
      setWorkingTime(formatWorkingTime(commerce.working_time))
    }
    

  },[commerce])

  const formatDescription = (data: IReturnObject): JSX.Element =>{
    return(
      <>
        {!!data ? (
          <Box style={style.descriptionContent}>
            {data.label !== 'locale' ? (
              <Text color= {"muted.700"} marginRight={1} style={style.description}>
                {capitalized(data.label)}:
              </Text>
            ):null}
            
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
              <Text style={style.infoTitles} color={"muted.500"}>Contact</Text>
              {infos.length ? infos.map(item => (
                <Fragment key={item.label}>
                  {formatDescription(item)}
                </Fragment>
              )): null}
              <Text style={style.infoTitles} color={"muted.500"}>Address</Text>
              {address.length ? address.map(item => (
                <Fragment key={item.label}>
                  {formatDescription(item)}
                </Fragment>
              )): null}
              <Text style={style.infoTitles} color={"muted.500"}>Working Time</Text>
              <VStack style={style.weekBoxConatiner}>
                {workingTime.length ? workingTime.map(item => (
                  <Box key={item.id} style={item.start === '-' ? style.weekBoxDisable : style.weekBox}>
                    <Text style={style.weekTitles}>{item.week}</Text>
                    <Text style={style.weekHours}>{item.start}</Text>
                    <Text style={style.weekHours}>{item.end}</Text>
                  </Box>
                )): null}
              </VStack>
            </VStack>
          </ModalContainer.Body>
        </ModalContainer.Content>
      </ModalContainer>
    </Center>
  );
};

const style = StyleSheet.create({
  modalContent:{
    paddingHorizontal: 3,
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
    paddingRight: 30
  },
  modalHeader:{
    justifyContent:'center',
    alignItems:'center'
  },
  descriptionContainer:{
    width:'100%'
  },
  infoTitles:{
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
    fontWeight: 'bold',
    borderTopWidth: 1,
    paddingTop: 10,
    borderTopColor: '#d5d5d5'
  },
  weekBoxConatiner:{
    flex: 1,
    flexDirection: 'row',
    height: 80,
    justifyContent:'space-between',
  },
  weekBox:{
    backgroundColor: '#e5e5e5',
    flexDirection: 'column',
    width: '12%',
    padding: 1,
    borderRadius: 10,
    justifyContent:'center',
    alignItems:'center'
  },
  weekTitles:{
    fontSize: 12,
    color:'#212121'
  },
  weekHours:{
    fontSize: 10,
    color:'#212121'
  },
  pipe:{
    backgroundColor:'#212121',
    height: 6,
    width: 1
  },
  weekBoxDisable:{
    backgroundColor: '#e5e5e5',
    flexDirection: 'column',
    width: '12%',
    padding: 1,
    borderRadius: 10,
    justifyContent:'center',
    alignItems:'center',
    opacity: .3
  }
})
