import { Box, CheckIcon, Select, useSafeArea, FormControl } from "native-base";
import React, { useState } from "react";


export const SelectComponent = () => {
  let [service, setService] = useState("");
  const safeAreaProps = useSafeArea({
    safeAreaTop: true,
  });
  return(
    <FormControl maxW="160" m="2" {...safeAreaProps}>
      <FormControl.Label>Choose service</FormControl.Label>
      <Select selectedValue={service} minWidth="150" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
      bg: "teal.600",
      endIcon: <CheckIcon size="5" />
    }} mt={1} onValueChange={itemValue => setService(itemValue)}>
        <Select.Item label="UX Research" value="ux" />
        <Select.Item label="Web Development" value="web" />
        <Select.Item label="Cross Platform Development" value="cross" />
        <Select.Item label="UI Designing" value="ui" />
        <Select.Item label="Backend Development" value="backend" />
      </Select>
    </FormControl>
  )
};