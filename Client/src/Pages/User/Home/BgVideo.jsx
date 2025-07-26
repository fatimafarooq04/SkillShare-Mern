import React from 'react'

const BgVideo = () => {
  return (
    <video
        className="video-bg"
        autoPlay
        muted
        loop
        playsInline
        src="/hero.mp4"
        type="video/mp4"
      ></video>
  )
}

export default BgVideo