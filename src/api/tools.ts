import axios from "axios";
// import qs from "qs"
export function download(url:string) {
    return axios({
        url,
        method:"get",
        responseType: 'blob',
    })
}

