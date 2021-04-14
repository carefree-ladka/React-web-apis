import React from "react";
import VideoInput from "./VideoInput";
import VideoPlayer from "./VideoPlayer";
import api from "./Utils";

export default function Search() {
  const [videosMetaInfo, setVideosMetaInfo] = React.useState([]);
  const [selectedVideo, setSelectedVideo] = React.useState(null);
  const onSearch = async (keyword) => {
    const response = await api.get("/search", {
      params: {
        q: keyword
      }
    });
    setVideosMetaInfo(response.data.items);
    setSelectedVideo(response.data.items[0].id.videoId);
    console.log(videosMetaInfo);
    console.log(selectedVideo);
  };
  return (
    <>
      <VideoInput onSearch={onSearch} />
      <VideoPlayer videoId={selectedVideo} />
    </>
  );
}
