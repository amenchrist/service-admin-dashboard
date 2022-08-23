import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
import { useStateContext } from '../contexts/ContextProvider';

function VideoPlayer() {

  const { attendanceSubmitted } = useStateContext();

  const aspectRatio = 0.5625;

  let youtube = 'https://www.youtube.com/watch?v=ysz5S6PUM-U'
  const barking = "https://vcpout-sf01-altnetro.internetmultimediaonline.org/vcp/av5xgmrwkg/playlist.m3u8"
  const barking2 = "https://vcpout-sf01-altnetro.internetmultimediaonline.org/vcp/e877c883/playlist.m3u8"
  
  const [width, setWidth] = useState('100');
  const [height, setHeight] = useState(width*aspectRatio)
  const [divHeight, setDivHeight] = useState('100%')

  function changeDivHeight(){
    if(window.innerWidth > 900){
      setDivHeight("95vh")
    } else {
      setDivHeight('')
    }
  }

  useEffect(()=>{
    let videoWidth = document.getElementById("video-player").clientWidth
    setWidth(videoWidth)
    window.addEventListener("resize", function(){
      let videoWidth = document.getElementById("video-player").clientWidth
      setWidth(videoWidth)
      setHeight(videoWidth*aspectRatio);
    });
    changeDivHeight()
  }, [])

  useEffect(()=>{
    setHeight(width*aspectRatio);
    
    changeDivHeight()
  }, [width])

  function MutedVideoPlayer() {
    return (
      <ReactPlayer url={barking} playing={true} width={"100%"} height={height} id={"video-player"} volume={0} muted={true} />
    )
  }

  return (
    <>
      <div style={{backgroundColor: "black", display:"flex", height:divHeight, flexDirection: 'column', justifyContent: 'center'}}>
        {attendanceSubmitted? 
        <ReactPlayer url={barking} playing={true} width={"100%"} height={height} controls id={"video-player"} />
        :
        <MutedVideoPlayer />
        }
        <div style={{border: '2px solid grey', width: '100%', height: '50px', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
            <div style={{color: "white"}}>SHARE</div>
            <div style={{color: "white"}}>CHURCH DASHBOARD</div>
            <div style={{color: "white"}}>MY DASHBOARD</div>
          {/* <Link to="/admin-dashboard" className="link">
            <div style={{color: "white"}}>CHURCH DASHBOARD</div>
          </Link>
          <Link to="/my-dashboard" className="link">
            <div style={{color: "white"}}>MY DASHBOARD</div>
          </Link> */}
        </div>
      </div>
    </>
  )
}

export default VideoPlayer