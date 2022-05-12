import Request from "./request";

const request = new Request({
    timeout:3000,
    intercepotrs:{
        requestInterceptors(config){
            console.log("index request 拦截")
            return config
        },
        requestInterceptorsCatch(e){
            return e
        },
        responseInterceptors(res){
            console.log("index response 拦截")
            console.log(res)
            return res
        },
        responseInterceptorsCatch(e){
            return e
        },
    }
})
export default request