import ReactPlayer from "react-player";

const VideoPlayer = ({ video }) => {
  return (
    <ReactPlayer
      light
      url={video}
      width="100%"
      height="240px"
      playing
      controls
    />
  );
};

export default VideoPlayer;
