import React from "react";
import "./index.scss";
import Player from "xgplayer";

interface VideoProps {
  url: string;
}

export const VideoJS = ({ url }: VideoProps) => {
  let player: any = null;
  const initVideo = () => {
    player = new Player({
      id: "video",
      lang: 'zh-cn',
      url,
      autoplay: true,
      playbackRate: [0.5, 0.75, 1, 1.5, 2],
      defaultPlaybackRate: 1,
      videoInit: true,
      download: true, //设置download控件显示
      fluid: true,
      playsinline: true,
      whitelist: [""],
    });
  };

  React.useEffect(() => {
    if (!player) {
      console.log(url);
      initVideo();
    }
    return () => {
      player?.destroy(true);
    };
  }, []);

  return <div id="video" className="video-box"></div>;
};

export default VideoJS;
