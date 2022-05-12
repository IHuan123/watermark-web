import React, { useEffect, useState } from "react"
import "./index.scss"
import { getVideoUrl } from "@/api/watermark"
import { connect } from "react-redux"

import { TextField, Button } from "@mui/material";

const mapStateToProps = (state: any) => {
    return {
        user: state.user.user
    }
}


// let test = "https://h5.pipigx.com/pp/post/586650137345?zy_to=copy_link&share_count=1&m=b9eccbe426b99e6de23138ad0d2c946b&app=&type=post&did=efe1c4fa89bfb38bef0867a779f7150c&mid=7848952219026&pid=586650137345"
const Home: React.FC<any> = (props) => {
    const [url, setUrl] = useState<string>("")
    useEffect(() => {
        console.log(url)
    })
    const getVideo = () => {
        if(url===""){
            return ""
        }
        getVideoUrl({ key_words: url }).then(res => {
            console.log(res.data)
        })
    }
    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value)
    }
    return (<div className="home-page">
        <div className="form-box">
        <TextField className="parsing-input" fullWidth id="outlined-basic" label="请输入链接" variant="outlined" value={url} onChange={inputChange} />
            <Button variant="outlined" color="inherit" size="large" onClick={getVideo}>解析</Button>
        </div>
    </div>)
}

export default connect(mapStateToProps)(Home)