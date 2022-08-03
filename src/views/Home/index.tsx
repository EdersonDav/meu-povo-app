import React, { useEffect, useState } from 'react';
import {StyleSheet} from 'react-native';

import { Map } from '../../components/Map';
import { SelectComponent } from '../../components/Select';
import { VStack, Flex } from 'native-base';
import { initialValuesClass } from '../../services/InitialValues';
import { ICategory, ICountry } from '../../@types/interfaces';

export const Home = () => {
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
  },[])

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
      <Map searchParamns={{category, nationality}}/>
    </VStack>
  )
}

const style = StyleSheet.create({
  container:{
    backgroundColor: "#fefefe"
  }
})