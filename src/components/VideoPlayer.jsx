import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';




function VideoPlayer() {

  let lwusa = "https://www.loveworldusa.org/5b18bd6f-9471-455f-bce2-04730a5cf094"
  let youtube = 'https://www.youtube.com/watch?v=ysz5S6PUM-U'
  const barking = "https://vcpout-sf01-altnetro.internetmultimediaonline.org/vcp/av5xgmrwkg/playlist.m3u8"
  const [width, setWidth] = useState('100%');
  // const [height, setHeight] = useState('')
  const aspectRatio = 0.5625;
  //const width = '100%';
  const height = width*aspectRatio 



  // useEffect(()=>{
  //   // const parentDiv = document.getElementById('service-player').parentElement;
  //   const parentDiv = document.getElementById('member-box');
  //   setWidth(parentDiv.clientWidth);
  //   console.log(width)
  //   console.log(window.innerWidth)
  // }, [window.innerWidth])

  // useEffect(()=>{
  //   setHeight(width*aspectRatio)
  //   console.log(height)
  // }, [width])

  return (
    <>
      <div style={{backgroundColor: "black"}}>
        <ReactPlayer url={barking} playing={true} width={width} height={height} controls />
      </div>
    </>
  )
}

export default VideoPlayer