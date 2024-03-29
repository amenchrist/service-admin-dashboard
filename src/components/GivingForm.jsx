import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Button from '@mui/material/Button';

import Link from '@mui/material/Link';

function GivingForm() {

  const [category, setCategory] = React.useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  function LoveworldPay(){
    return (
      <div>
        <h2 >Giving</h2>
        <Box sx={{ minWidth: 120, marginTop: '15px' }}  >
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

            <TextField id="outlined-basic" label="Amount" variant="outlined" sx={{marginTop: '15px'}} />
            <TextField id="outlined-basic" label="Email*" variant="outlined" sx={{marginTop: '15px'}} />

            <Button variant="contained" sx={{marginTop: '15px', mb: '15px'}}>Approve Payment</Button>
          </FormControl>
          <Link href="#" variant="body2" >
            See Giving Records
          </Link>
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

  


  return (
    <>
    <iframe src='https://kingspayweb.com/' width={'100%'} height={'800px'} ></iframe>
    </>
  )
}

export default GivingForm

