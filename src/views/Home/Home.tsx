import React, { useEffect, useState } from "react"
import "./index.scss"
import { getVideoUrl } from "@/api/watermark"
import { connect } from "react-redux"
import { NoticeRef } from "@/components/Notice/Notice"
// import CButton from "@/components/CButton/CButton";
import CustomizedInputBase from "@/components/CustomizedInputBase/CustomizedInputBase";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { isUndef,copy } from "@/utils"
import LinkIcon from '@mui/icons-material/Link';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IconButton from '@mui/material/IconButton';

const mapStateToProps = (state: any) => {
    return {
        user: state.user.user
    }
}


// let test = "https://h5.pipigx.com/pp/post/586650137345?zy_to=copy_link&share_count=1&m=b9eccbe426b99e6de23138ad0d2c946b&app=&type=post&did=efe1c4fa89bfb38bef0867a779f7150c&mid=7848952219026&pid=586650137345"
const Home: React.FC<any> = () => {
    const [url, setUrl] = useState<string>("")
    const [videoInfo, setVideoInfo] = useState<any>(null)
    useEffect(() => { })
    const getVideo = () => {
        if (url === "") return NoticeRef.current?.open({
            message: "请输入链接",
            type: "warning",
            origin: { horizontal: "center", vertical: "top" },
        })
        getVideoUrl({ key_words: url }).then(res => {
            console.log(res)
            !isUndef(res) && setVideoInfo(res)
        }).catch(e => {
            console.log("error", e)
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
            {
                !isUndef(videoInfo) && <div className="video-info">
                    <Card sx={{ minWidth: 700, boxSizing: "border-box" }}>
                        <CardContent>
                            <video className="video-box" controls={true}>
                                <source src={videoInfo.path} />
                            </video>
                            <Box sx={{ width: "100%", fontSize: "14px", backgroundColor: "#5F679C", color: "#fff",  borderRadius: "10px", p: 2, boxSizing: "border-box", display: "flex",alignItems:"center" }}>
                                <IconButton color="primary" sx={{ p: '5px 5px ', color: "#eee" }} aria-label="directions">
                                    <LinkIcon fontSize={'small'} color="inherit" />
                                </IconButton>
                                <div style={{flex:1,margin:"0 10px"}}>{videoInfo?.path}</div>
                                <IconButton color="primary" sx={{ p: '10px', color: "#eee" }} aria-label="directions" onClick={()=>{copy(videoInfo.path)}}>
                                    <ContentCopyIcon fontSize={'small'} color="inherit" />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Card>
                </div>
            }
        </div>

    </div>)
}

export default connect(mapStateToProps)(Home)