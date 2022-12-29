import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { toSentenceCase } from '../../utils/utils';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({ options, onChange = () => {} }) {
  return (
    <div style={{ minWidth: '20rem', width: 'fit-content' }}>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={options}
        disableCloseOnSelect
        onChange={(event, newInputValue) => {
          onChange(newInputValue);
        }}
        getOptionLabel={(option) => toSentenceCase(option)}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
            {toSentenceCase(option)}
          </li>
        )}
        renderInput={(params) => <TextField {...params} label="Event Type Filter" />}
      />
    </div>
  );
}
