import request from "@/utils/request";

interface VideoParams {
    key_words:string
}
export interface VideoRes {
    path: string
    platformInfo: { name: string, platform: string }
}
export function getVideoUrl(params:VideoParams){
    return request.get<VideoParams, VideoRes | null>({
        url:"/parse",
        params
    })
}