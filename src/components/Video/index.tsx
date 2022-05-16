import React from "react"
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "./index.scss"
export const VideoJS = (props: any) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef<any>(null);
  const { options, onReady, path } = props;

  const setVideoHeaders = () => {
    //  全局拦截器
    videojs.Vhs.xhr.beforeRequest = function (options: any) {
      let headers = options.headers || {};
      headers['X-Arbitrary'] = 'some-arbitrary-header-text'
      headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
      headers["Referer"] = path
      options.headers = headers;
      return options;
    };
  }
  let player:any
  React.useEffect(() => {
    // make sure Video.js player is only initialized once
    setVideoHeaders()
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;
      player = playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
      });
    } else {
      // you can update player here [update player through props]
      player = playerRef.current;
      player.src(options.sources[0].src);
      // player.autoplay(true);
    }
    return ()=>{
      player.dispose()
    }
  }, [options, videoRef]);



  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-box video-js vjs-big-play-centered" />
    </div>
  );
}

export default VideoJS