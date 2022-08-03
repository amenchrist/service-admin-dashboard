import React from 'react'
import FullWidthTabs from '../components/FullWidthTabs'
import GivingForm from '../components/GivingForm'
import LiveChat from '../components/LiveChat'
import VideoPlayer from '../components/VideoPlayer'

function WatchPage() {
  return (
    <>
        <div>WatchPage</div>
        <VideoPlayer />
        <LiveChat />
        <GivingForm />
        <FullWidthTabs />
    </>
  )
}

export default WatchPage