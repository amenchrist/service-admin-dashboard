import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import './memberDashboard.css';

function MemberDashboard() {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container>
        <Grid item xs={12} md={8}>
            <div className='member-box'>
              MemberDashboard
              xs=12 md-8 VideoPlayer
            </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <Item>xs=4</Item>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MemberDashboard