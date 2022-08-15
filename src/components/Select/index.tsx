import { CheckIcon, Select, useSafeArea, FormControl } from "native-base";
import React from "react";

interface SelectComponentProps{
  itens: SelectItemProps[];
  label: string;
  service: string;
  setService: (value: string)=> void;
  required: boolean;
}

interface SelectItemProps{
  name: string;
  code: string;
}

export const SelectComponent = ({label, itens, service, setService,required}: SelectComponentProps) => {
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
          <Select.Item label={item.name} value={item.code} key={item.code} />
        )) : null}
      </Select>
    </FormControl>
  )
};