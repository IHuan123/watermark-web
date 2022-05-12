import request from "@/utils/request";

interface VideoParams {
    key_words:string
}

export function getVideoUrl(params:VideoParams){
    return request.get<VideoParams>({
        url:"/api",
        params
    })
}