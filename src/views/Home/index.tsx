import React, { useEffect, useState } from 'react';
import { Map } from '../../components/Map';
import { SelectComponent } from '../../components/Select';
import { VStack, Flex } from 'native-base';
import { initialValuesClass } from '../../services/InitialValues';
import { ICategory, ICountry } from '../../@types/interfaces';

export const Home = () => {
  const [categories, setCategories] = useState<ICategory[]>([{
    code:'',
    name:'all',
    _id:''
  }])
  const [countries, setCountries] = useState<ICountry[]>([])
  const [nationality, setNationality] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    initialValuesClass.getInitialValues().then(res => {
      setCategories([...categories, ...res.categories]);
      setCountries(res.countries)
    });
  },[])

  return(
    <VStack flex={1} alignItems="center" px={8} pt={30}>
      <Flex flexDirection="row">
        <SelectComponent 
          label="Choose commerce category" 
          itens={categories}
          service={category}
          setService={setCategory}
          required={false}
        />
        <SelectComponent 
          label="Choose commerce country" 
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