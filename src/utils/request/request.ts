import axios, { AxiosInstance } from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios"
import type { RequestConfig, RequestInterceptors } from "./types"

class Request {
    instance: AxiosInstance
    // 拦截器对象
    interceptorsObj?: RequestInterceptors
 
    constructor(config: RequestConfig) {
        this.instance = axios.create(config)
        this.interceptorsObj = config.intercepotrs
        this.instance.interceptors.request.use(
            (res: AxiosRequestConfig) => {
                console.log('全局请求拦截器')
                return res
            },
            (err: any) => err,
        )
        //拦截器
        this.instance.interceptors.request.use(
            this.interceptorsObj?.requestInterceptors,
            this.interceptorsObj?.requestInterceptorsCatch
        )
        this.instance.interceptors.response.use(
            this.interceptorsObj?.responseInterceptors,
            this.interceptorsObj?.responseInterceptorsCatch
        )
        // 全局响应拦截器保证最后执行
        this.instance.interceptors.response.use(
            // 因为我们接口的数据都在res.data下，所以我们直接返回res.data
            (res: AxiosResponse) => {
                console.log('全局响应拦截器')
                return res.data
            },
            (err: any) => err,
        )
    }

    request(config:RequestConfig){
        return this.instance.request(config)
    }
    get<T=any>(config:{url:string,params?:T,data?:T}){
        return this.request({
            method:"get",
            ...config
        })
    }
    post<T=any>(config:{url:string,params?:T,data?:T}){
        return this.request({
            method:"post",
            ...config
        })
    }
    put<T=any>(config:{url:string,params?:T,data?:T}){
        return this.request({
            method:"put",
            ...config
        })
    }
    delete<T=any>(config:{url:string,params?:T,data?:T}){
        return this.request({
            method:"delete",
            ...config
        })
    }
}

export default Request