import React, { useRef } from "react"
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "./index.scss"


// Options: {
//     controls: true,
//     playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
//     autoplay: false, // 如果true,浏览器准备好时开始回放。
//     muted: false, // 默认情况下将会消除任何音频。
//     loop: false, // 导致视频一结束就重新开始。
//     preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
//     language: 'zh-CN',
//     aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
//     fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
//     sources: [
//         {
//             src: data.path,
//             type: 'video/mp4'
//         }
//     ],
//     // width: document.documentElement.clientWidth,
//     notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
//     controlBar: {
//         timeDivider: true,
//         durationDisplay: true,
//         remainingTimeDisplay: true,
//         fullscreenToggle: true // 全屏按钮
//     }
// }
export const VideoJS = (props: any) => {
  const videoRef = useRef(null);
  const playerRef = useRef<any>(null);
  const { options, onReady } = props;
  const setVideoHeaders = () => {
    //  全局拦截器
    videojs.Vhs.xhr.beforeRequest = function (options: any) {
      let headers = options.headers || {};
      headers['X-Arbitrary'] = 'some-arbitrary-header-text'
      headers['User-Agent'] = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
      options.headers = headers;
      return options;
    };
  }
  // const disposeVideo = (player:any)=>{
  //   player && videoRef.current && player.dispose()
  // }
  React.useEffect(() => {
    let player: any
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
      player.autoplay(false);
    }

    // return ()=>{
    //    videoRef.current && player.dispose()
    // }
  }, [options, videoRef]);



  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-box video-js vjs-big-play-centered" />
    </div>
  );
}

export default VideoJS