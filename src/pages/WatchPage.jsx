import React from 'react'
import FullWidthTabs from '../components/FullWidthTabs'
import GivingForm from '../components/GivingForm'
import LiveChat from '../components/LiveChat'
import VideoPlayer from '../components/VideoPlayer'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AttendanceForm from '../components/AttendanceForm';

import { useStateContext } from '../contexts/ContextProvider';

function WatchPage() {

  const { attendanceSubmitted } = useStateContext();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={12} md={8}>        
                <VideoPlayer />
          </Grid>
          <Grid item xs={12} md={4}>
            {attendanceSubmitted? <FullWidthTabs /> : <AttendanceForm /> }
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default WatchPage