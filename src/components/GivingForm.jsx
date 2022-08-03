import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Button from '@mui/material/Button';

function GivingForm() {

  const [category, setCategory] = React.useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };


  return (
    <div>GivingForm
      <Box sx={{ minWidth: 120, }}  >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value={"Tithe"}>Tithe</MenuItem>
          <MenuItem value={"Offering"}>Offering</MenuItem>
          <MenuItem value={"First Fruit"}>First Fruit</MenuItem>
          <MenuItem value={"Partnership"}>Partnership</MenuItem>
        </Select>

        <TextField id="outlined-basic" label="Amount" variant="outlined" />
        <TextField id="outlined-basic" label="Email*" variant="outlined" />

        <Button variant="contained">Contained</Button>
      </FormControl>
    </Box>
      {/* <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      >
        <TextField id="outlined-basic" label="Amount" variant="outlined" />
        <TextField id="outlined-basic" label="Email*" variant="outlined" />
      </Box> */}
    </div>
  )
}

export default GivingForm

