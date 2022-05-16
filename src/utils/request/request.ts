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
         // 全局响应拦截器保证最后执行
        this.instance.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                // console.log('全局请求拦截器')
                return config
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
                // console.log('全局响应拦截器',res)
                return res.data
            },
            (err: any) => err,
        )
    }

    request<T=any>(config:RequestConfig){
        return this.instance.request<T>(config)
    }
    get<T=any,U=any>(config:{url:string,params?:T,data?:T}){
        return this.request<U>({
            method:"get",
            ...config
        })
    }
    post<T=any,U=any>(config:{url:string,params?:T,data?:T}){
        return this.request<U>({
            method:"post",
            ...config
        })
    }
    put<T=any,U=any>(config:{url:string,params?:T,data?:T}){
        return this.request<U>({
            method:"put",
            ...config
        })
    }
    delete<T=any,U=any>(config:{url:string,params?:T,data?:T}){
        return this.request<U>({
            method:"delete",
            ...config
        })
    }
}

export default Request