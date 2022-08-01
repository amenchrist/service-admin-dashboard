import React from 'react'
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
    </>
  )
}

export default WatchPage