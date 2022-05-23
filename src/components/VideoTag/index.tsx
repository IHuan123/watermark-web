import { FC } from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import douYinLogo from "/static/images/douyin.png"
import kaiyanLogo from "/static/images/weishi.png"
import bilibiliLogo from "/static/images/bilibili.png"
import huoshanLogo from "/static/images/huosan.png"
import kuaishouLogo from "/static/images/kuaishou.png"
import pipixLogo from "/static/images/pipixia.png"
import weishiLogo from "/static/images/kaiyan.png"
import ppgxLogo from "/static/images/ppgx.png"
import qmkgLogo from "/static/images/kg.png"
import zuiyouLogo from "/static/images/zuiyou.png" 
const types = new Map([
  ["douyin",{ name: "抖音",icon:douYinLogo }],
  ["BiliBili",{ name: "BiliBili",icon:bilibiliLogo }],
  ["huoshan",{ name: "火山",icon:huoshanLogo }],
  ["kuaishou",{ name: "快手",icon:kuaishouLogo }],
  ["pipix",{ name: "皮皮虾",icon:pipixLogo }],
  ["weishi",{ name: "微视",icon:kaiyanLogo }],
  ["kaiyan",{ name: "开眼",icon: weishiLogo}],
  ["pipigx",{ name: "皮皮搞笑",icon: ppgxLogo}],
  ["kg",{ name: "全民k歌",icon: qmkgLogo}],
  ["zuiyou",{ name: "最右",icon: zuiyouLogo }],
])

interface Platform {
  name:string
  icon:string
}

const getPlatform:(type:string) => Platform|undefined = (type:string):Platform|undefined=>{
  return types.get(type)
}

interface TagProps {
  type: string;
  title?: string;
}



const Tag: FC<TagProps> = ({type,title}) => {
  let platform = getPlatform(type)
  return (
    <Stack direction="row" spacing={1}>
      <Chip
        sx={{
          background:"rgba(255,255,255,0.3)",
          backdropFilter: "blur(10px)",
          color:"#333",
          fontWeight:600
        }}
        avatar={<Avatar alt={platform?.name} src={platform?.icon} />}
        label={title}
        variant="outlined"
      />
    </Stack>
  );
};

export default Tag;
