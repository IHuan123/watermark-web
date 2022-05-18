import React, { useEffect, useState } from "react"
import "./index.scss"
import { getVideoUrl } from "@/api/watermark"
import { download } from "@/api/tools"
import { connect } from "react-redux"
import { NoticeRef } from "@/components/Notice/Notice"
import CustomizedInputBase from "@/components/CustomizedInputBase/CustomizedInputBase";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { isUndef, copy ,downloadFile } from "@/utils"
import LinkIcon from '@mui/icons-material/Link';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Grow from '@mui/material/Grow';
import VideoJS from "@/components/Video/index"
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

const mapStateToProps = (state: any) => {
    return {
        user: state.user.user
    }
}

interface VideoProps {
    path: string
}
interface IProps {
    show: boolean
    data: VideoProps
}
const Info: React.FC<IProps> = ({ show, data }) => {
    const downloadVideo = (url:string,)=>{
        download(url).then(res=>{
            downloadFile(res.data,"video","mp4")
        })
    }
    return (
        <Grow in={show} mountOnEnter unmountOnExit>
            <div className="video-info">
                <Card sx={{ minWidth: 700, boxSizing: "border-box", background: "rgba(0,0,0,0.3)", backdropFilter: "blur(10px)", }}>
                    <CardContent>
                        <VideoJS url={data?.path}/>
                        {/* <video src={data.path} className="video-box" controls={true}></video> */}
                        <Box sx={{ width: "100%", fontSize: "14px", m: "10px 0", backgroundColor: "#5F679C", color: "#fff", borderRadius: "4px", p: 2, boxSizing: "border-box", display: "flex", alignItems: "center" }}>
                            <IconButton color="primary" sx={{ p: '5px 5px ', color: "#eee" }} aria-label="directions">
                                <LinkIcon fontSize={'small'} color="inherit" />
                            </IconButton>
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <span style={{ flex: 1, margin: "0 10px", wordBreak: "break-all", color: "inherit" }}>{data?.path}</span>
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton color="primary" sx={{ p: '10px', color: "#eee" }} aria-label="directions" onClick={() => { copy(data.path) }}>
                                <ContentCopyIcon fontSize={'small'} color="inherit" />
                            </IconButton>
                            <Divider sx={{ height: 28, m: 0.5,display:'none'  }} orientation="vertical" />
                            <IconButton color="primary" sx={{ p: '10px', color: "#eee",display:'none' }} aria-label="directions" onClick={() => { downloadVideo(data.path) }}>
                                <DownloadForOfflineIcon fontSize={'small'} color="inherit" />
                            </IconButton>
                        </Box>
                        <Alert severity="info" sx={{ m: "10px 0 0" }}>如果解析的视频无法播放可尝试在浏览器中直接访问!</Alert>
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
                if (!isUndef(res)) {
                    setTimeout(() => {
                        setVideoInfo(res)
                    }, 300)
                }
                resolve(!isUndef(res))
            }).catch(e => {
                console.log("error", e)
                reject(false)
            })
        })

    }
    const onChagne = (e: any) => {
        if (!isUndef(videoInfo)) setVideoInfo(null)
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