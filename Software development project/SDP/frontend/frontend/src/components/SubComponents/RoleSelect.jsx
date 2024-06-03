import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import PropTypes from "prop-types"; // Import PropTypes for type checking

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const roleOptions = [
  { label: "admin", value: 1 },
  { label: "cashier", value: 2 },
  { label: "warehouse handler", value: 3 },
];

function getStyles(role, selectedRoles, theme) {
  return {
    fontWeight:
      selectedRoles.indexOf(role.value) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const RoleSelect = ({ roles, setRoles ,register}) => {
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setRoles(
      typeof value === "string" ? value.split(",").map(v => parseInt(v)) : value
    );
  };

  return (
    <FormControl sx={{ m: 1, width: 200 }}>
      <InputLabel id="role-select-label">Role</InputLabel>
      <Select
        labelId="role-select-label"
        id="role-select"
        multiple
        value={roles}
        register
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Role" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => {
              const role = roleOptions.find((r) => r.value === value);
              return <Chip key={value} label={role ? role.label : value} />;
            })}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {roleOptions.map((role) => (
          <MenuItem
            key={role.value}
            value={role.value}
            style={getStyles(role, roles, theme)}
          >
            {role.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

RoleSelect.propTypes = {
  roles: PropTypes.array.isRequired,
  setRoles: PropTypes.func.isRequired,
};

export default RoleSelect;
