import React, { useEffect, useState } from "react"
import "./index.scss"
import { getVideoUrl } from "@/api/watermark"
import { connect } from "react-redux"
import { NoticeRef } from "@/components/Notice/Notice"
import CustomizedInputBase from "@/components/CustomizedInputBase/CustomizedInputBase";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { isUndef, copy } from "@/utils"
import LinkIcon from '@mui/icons-material/Link';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Grow from '@mui/material/Grow';
import VideoJS from "@/components/Video/index"


const mapStateToProps = (state: any) => {
    return {
        user: state.user.user
    }
}


// let dy = "6.97 seB:/ 这玩意1k块一片？？？%韩景枫51king %汽车人共创计划  https://v.douyin.com/FukHgap/ 复制此链接，打开Dou音搜索，直接观看视频！"
// let test = "https://h5.pipigx.com/pp/post/586650137345?zy_to=copy_link&share_count=1&m=b9eccbe426b99e6de23138ad0d2c946b&app=&type=post&did=efe1c4fa89bfb38bef0867a779f7150c&mid=7848952219026&pid=586650137345"

interface VideoProps {
    path: string
}
interface IProps {
    show: boolean
    data: VideoProps
}
const Info: React.FC<IProps> = ({ show, data }) => {
    const videoReady = () => { 
        console.log("videojs ready")
    }
    const videoOptions = {
        controls: true,
           playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
           autoplay: true, // 如果true,浏览器准备好时开始回放。
           muted: false, // 默认情况下将会消除任何音频。
           loop: true, // 导致视频一结束就重新开始。
           preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
           language: 'zh-CN',
           aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
           fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
           sources: [
             {
               src: data.path,
               type: 'video/mp4'
             }
           ],
           width: document.documentElement.clientWidth,
           notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
           controlBar: {
             timeDivider: true,
             durationDisplay: true,
             remainingTimeDisplay: true,
             fullscreenToggle: true // 全屏按钮
           }
    }
    return (
        <Grow in={show} mountOnEnter unmountOnExit>
            <div className="video-info">
                <Card sx={{ minWidth: 700, boxSizing: "border-box", background: "rgba(0,0,0,0.3)", backdropFilter: "blur(10px)", }}>
                    <CardContent>
                        <VideoJS onReady={videoReady} options={videoOptions} url={data.path}/>
                        <Box sx={{ width: "100%", fontSize: "14px",m:"10px 0", backgroundColor: "#5F679C", color: "#fff", borderRadius: "4px", p: 2, boxSizing: "border-box", display: "flex", alignItems: "center" }}>
                            <IconButton color="primary" sx={{ p: '5px 5px ', color: "#eee" }} aria-label="directions">
                                <LinkIcon fontSize={'small'} color="inherit" />
                            </IconButton>
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <span style={{ flex: 1, margin: "0 10px", wordBreak: "break-all", color: "inherit" }}>{data?.path}</span>
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton color="primary" sx={{ p: '10px', color: "#eee" }} aria-label="directions" onClick={() => { copy(data.path) }}>
                                <ContentCopyIcon fontSize={'small'} color="inherit" />
                            </IconButton>
                        </Box>
                        <Alert severity="info" sx={{m:"10px 0 0"}}>如果解析的视频无法播放可尝试在浏览器中直接访问!</Alert>
                    </CardContent>
                </Card>
            </div>

        </Grow>
    )
}


const Home: React.FC<any> = () => {
    const [url, setUrl] = useState<string>("")
    const [videoInfo, setVideoInfo] = useState<any>(null)
    useEffect(() => { })
    const getVideo: () => Promise<boolean> = () => {
        if (!isUndef(videoInfo)) setVideoInfo(null);
        return new Promise<boolean>((resolve, reject) => {
            if (url === "") {
                NoticeRef.current?.open({
                    message: "请输入链接",
                    type: "warning",
                    origin: { horizontal: "center", vertical: "top" },
                })
                reject(false)
            }
            getVideoUrl({ key_words: url }).then(res => {
                console.log(res)
                if (!isUndef(res)) setVideoInfo(res)
                resolve(!isUndef(res))
            }).catch(e => {
                console.log("error", e)
                reject(false)
            })
        })

    }
    const onChagne = (e: any) => {
        setUrl(e.target.value)
    }
    const onClear = () => {
        setUrl("")
        setVideoInfo(null)
    }
    return (<div className="home-page">
        <div className="form-box">
            <CustomizedInputBase value={url} onChange={onChagne} onConfirm={getVideo} onClear={onClear} />

            <Info show={!isUndef(videoInfo)} data={{ path: videoInfo?.path }} />
        </div>

    </div>)
}

export default connect(mapStateToProps)(Home)