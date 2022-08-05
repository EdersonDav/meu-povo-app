import React, { useEffect, useState } from 'react';
import {StyleSheet} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Map } from '../../components/Map';
import { SelectComponent } from '../../components/Select';
import { VStack, Flex } from 'native-base';
import { initialValuesClass } from '../../services/InitialValues';
import { ICategory, ICountry } from '../../@types/interfaces';
import { selectCommerce, clearSelected, useSelectCommerce } from '../../redux/sliceSelectedCommerce'
import { setCommerces, clearCommerces, useCommerce } from '../../redux/sliceCommerce'
import { commerceClass } from '../../services/Commerces';

export const Home = () => {
  const dispatch = useDispatch()
  const [categories, setCategories] = useState<ICategory[]>()
  const [countries, setCountries] = useState<ICountry[]>([])
  const [nationality, setNationality] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  
  useEffect(() => {
    const initialCategory = {
      code:'',
      name:'all',
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

  return(
    <VStack flex={1} alignItems="center" px={8} pt={30} style={style.container}>
      <Flex flexDirection="row">
        <SelectComponent 
          label="Commerce category" 
          itens={categories}
          service={category}
          setService={setCategory}
          required={false}
        />
        <SelectComponent 
          label="Commerce country" 
          itens={countries}
          service={nationality}
          setService={setNationality}
          required={true}
        />
      </Flex>
      <Map/>
    </VStack>
  )
}

const style = StyleSheet.create({
  container:{
    backgroundColor: "#fefefe"
  }
})