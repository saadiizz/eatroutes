import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField } from "@mui/material";
import "./addLeadSlect.css";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
// import { PrimarySaleData } from '../../../utils/commonData';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(accesData, personName, theme) {
  return {
    fontWeight:
      personName?.indexOf(accesData) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
function regionStyles(accesData, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(accesData) === 0
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function AddLeadSlect({
  formik,
  PrimarySaleData,
  regionData,
  handlestaffAccess,
}) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [region, setRegion] = React.useState([]);
  const [assignStf, setAssignStf] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    if (formik) {
      formik.setFieldValue(
        "saleMethod",
        typeof value === "string" ? value.split(",") : value
      );
    }
  };
  const navigate = useNavigate();

  const handleStaffChange = (event) => {
    const {
      target: { value },
    } = event;
    setRegion(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    if (formik) {
      formik.setFieldValue(
        "regionsSide",
        typeof value === "string" ? value.split(",") : value
      );
    }
  };
  React.useEffect(() => {
    setRegion(formik?.values?.regionsSide);
    setPersonName(formik?.values?.saleMethod);
  }, []);
  return (
    <>
      {PrimarySaleData?.length ? (
        <div>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-multiple-name-label">
              Primary method of sale
            </InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              // native
              value={personName || []}
              onChange={handleChange}
              //   placeholder='Primary method of sale'
              input={
                <OutlinedInput label="Primary method of sale" />
              }
              MenuProps={MenuProps}
            >
              {PrimarySaleData?.map((name, ind) => (
                <MenuItem
                  key={ind}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      ) : (
        ""
      )}
      {regionData?.length ? (
        <div>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-multiple-name-label">
              In which regions do they sell?
            </InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              // native
              value={region || []}
              onChange={handleStaffChange}
              //   placeholder='Primary method of sale'
              input={<OutlinedInput label="In which regions do they sell?" />}
              MenuProps={MenuProps}
            >
              {regionData?.map((item, ind) => (
                <MenuItem
                  key={ind}
                  value={item?.name}
                  style={regionStyles(item?.name, region, theme)}
                >
                  {item?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
