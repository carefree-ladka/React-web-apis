import React from "react";
export default function VideoPlayer({ videoId }) {
  return (
    <>
      <div>
        <iframe
          title={videoId}
          className="video-iframe"
          src={`https://www.youtube.com/embed/${videoId}`}
          allowFullScreen
        />
      </div>
    </>
  );
}
