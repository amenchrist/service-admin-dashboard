import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';

function VideoPlayer() {

  const aspectRatio = 0.5625;

  let youtube = 'https://www.youtube.com/watch?v=ysz5S6PUM-U'
  const barking = "https://vcpout-sf01-altnetro.internetmultimediaonline.org/vcp/av5xgmrwkg/playlist.m3u8"
  
  const [width, setWidth] = useState('100');
  const [height, setHeight] = useState(width*aspectRatio)
  const [divHeight, setDivHeight] = useState('100%')

  function changeDivHeight(){
    if(window.innerWidth > 900){
      setDivHeight("100vh")
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

  return (
    <>
      <div style={{backgroundColor: "black", display:"flex", alignItems:"center", height:divHeight}}>
        <ReactPlayer url={barking} playing={true} width={"100%"} height={height} controls id={"video-player"} />
      </div>
    </>
  )
}

export default VideoPlayer