import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { VStack, Flex, Button, useSafeArea, Text } from 'native-base';

import { Map } from '../../components/Map';
import { SelectComponent } from '../../components/Select';
import { Modal } from '../../components/Modal';

import { ICategory, ICountry } from '../../@types/interfaces';

import { clearSelected } from '../../redux/sliceSelectedCommerce'
import { setCommerces, clearCommerces } from '../../redux/sliceCommerce'
import { useLanguages, setChangeLangages } from '../../redux/sliceLanguages'

import { initialValuesClass } from '../../services/InitialValues';
import { commerceClass } from '../../services/Commerces';

export const Home = () => {
  const dispatch = useDispatch()
  const [categories, setCategories] = useState<ICategory[]>()
  const [countries, setCountries] = useState<ICountry[]>([])
  const [nationality, setNationality] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const language = useSelector(useLanguages);
  
  useEffect(() => {
    const initialCategory = {
      code:'',
      name:{
        en: 'all',
        pt: 'todas'
      },
      _id:''
    }
    initialValuesClass.getInitialValues().then(res => {
      setCategories([...res.categories, initialCategory]);
      setCountries(res.countries)
    });
  },[]);

  useEffect(()=>{
    if(nationality){
      dispatch(clearSelected())
      dispatch(clearCommerces())
      commerceClass.searchCommerce(nationality, category).then((res)=>{
        dispatch(setCommerces(res))
      })
    }
  },[nationality, category])
  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
  });
  return(
    <VStack {...safeAreaProps} marginTop={5} flex={1} alignItems="center" px={8} pt={30} style={style.container}>
      <Flex style={style.controls}>
        <SelectComponent 
          label="Commerce category" 
          itens={categories}
          service={category}
          setService={setCategory}
          required={false}
        />
        <Button style={style.languageButton} onPress={() => dispatch(setChangeLangages(language))}>
          <Text color="muted.500">{language.buttonLabel.toUpperCase()}</Text>
        </Button>

        <SelectComponent 
          label="Commerce country" 
          itens={countries}
          service={nationality}
          setService={setNationality}
          required={true}
        />
      </Flex>
      <Map/>
      <Modal/>
    </VStack>
  )
}

const style = StyleSheet.create({
  container:{
    backgroundColor: "#fefefe",
  },
  controls:{
    flexDirection:"row",
    marginTop: 0,
    paddingTop: 0,
    alignItems: "center"
  },
  languageButton:{
    width: 30,
    height: 45,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 40,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    backgroundColor: '#fff',
    shadowColor: "#000",
    shadowOpacity: .6,
    shadowRadius: 10,
    shadowOffset: { width:0, height: 0 },
    elevation: 2
  }
})