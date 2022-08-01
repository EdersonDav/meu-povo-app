import { Box, CheckIcon, Select, useSafeArea, FormControl } from "native-base";
import React, { useState } from "react";

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
  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
  });
  return(
    <FormControl maxW="160" m="2" {...safeAreaProps} isRequired={required}>
      <FormControl.Label>{label}</FormControl.Label>
      <Select selectedValue={service} minWidth="150" accessibilityLabel={label} placeholder='-' _selectedItem={{
      bg: "teal.600",
      endIcon: <CheckIcon size="5" />
    }} mt={1} onValueChange={itemValue => setService(itemValue)}>
        {itens?.length ?  itens.map(item =>(
          <Select.Item label={item.name} value={item.code} key={item.code} />
        )) : null}
      </Select>
    </FormControl>
  )
};