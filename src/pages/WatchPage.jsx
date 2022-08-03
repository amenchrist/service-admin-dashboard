import React from 'react'
import FullWidthTabs from '../components/FullWidthTabs'
import GivingForm from '../components/GivingForm'
import LiveChat from '../components/LiveChat'
import VideoPlayer from '../components/VideoPlayer'

function WatchPage() {
  return (
    <>
      <div>
        <div id='service-player-section' style={{width: "100vw", display: "flex"}}>
          <div style={{width: "80%"}} >
            <VideoPlayer />
          </div>
          <FullWidthTabs />
        </div>
      </div>
    </>
  )
}

export default WatchPage