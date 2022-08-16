import { CheckIcon, Select, useSafeArea, FormControl } from "native-base";
import React from "react";
import { useSelector } from "react-redux";
import { useLanguages } from "../../redux/sliceLanguages";

interface SelectComponentProps{
  itens: SelectItemProps[];
  label: string;
  service: string;
  setService: (value: string)=> void;
  required: boolean;
}

interface SelectItemProps{
  name: {
    en: string;
    pt: string;
  };
  code: string;
}

export const SelectComponent = ({label, itens, service, setService,required}: SelectComponentProps) => {
  const language = useSelector(useLanguages);
  return(
    <FormControl maxW="160" m="2" isRequired={required}>
      <FormControl.Label>{label}</FormControl.Label>
      <Select selectedValue={service} minWidth="140" accessibilityLabel={label} placeholder='-' 
        _selectedItem={{
          bg: "gray.200",
          endIcon: <CheckIcon size="5"/>,
          color: "blue.300",
        }}
        color= {"muted.500"}
        mt={1} 
        onValueChange={itemValue => setService(itemValue)}
      >
        {itens?.length ?  itens.map(item =>(
          <Select.Item label={item.name[language.buttonLabel]} value={item.code} key={item.code} />
        )) : null}
      </Select>
    </FormControl>
  )
};