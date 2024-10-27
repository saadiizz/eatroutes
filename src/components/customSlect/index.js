import { FormControl } from "@mui/material";
import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";

const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
];

const CustomSlectOption = () => {
  const [selected, setSelected] = useState([]);

  return (
    <FormControl sx={{width:'100%'}}>
      {/* <h1>Select Fruits</h1> */}
      {/* <pre>{JSON.stringify(selected)}</pre> */}
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
    </FormControl>
  );
};

export default CustomSlectOption;