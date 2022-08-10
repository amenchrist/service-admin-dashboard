import React from 'react'
import FullWidthTabs from '../components/FullWidthTabs'
import GivingForm from '../components/GivingForm'
import LiveChat from '../components/LiveChat'
import VideoPlayer from '../components/VideoPlayer'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function WatchPage() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={12} md={8}>        
                <VideoPlayer />
          </Grid>
          <Grid item xs={12} md={4}>
            <FullWidthTabs />
          </Grid>
        </Grid>
      </Box>
      {/* <div>
        <div id='service-player-section' style={{width: "100vw", display: "flex"}}>
          <div style={{width: "80%"}} >
            <VideoPlayer />
          </div>
          <FullWidthTabs />
        </div>
      </div> */}
    </>
  )
}

export default WatchPage