import type { InternalAxiosRequestConfig,AxiosRequestConfig, AxiosResponse } from "axios"

interface ResData {
    code:number,
    data:any,
    msg:string
}
export interface RequestInterceptors {
    baseURL?:string
    // 请求拦截
    requestInterceptors?: ( config: InternalAxiosRequestConfig )=> InternalAxiosRequestConfig
    requestInterceptorsCatch?: (err:any)=>any
    //响应拦截
    responseInterceptors?: <T extends ResData>( res:AxiosResponse<T> )=> T
    responseInterceptorsCatch?: (err:any)=>any
}

export interface CancelRequestSource {
    [index: string]: () => void
}


export interface RequestConfig extends AxiosRequestConfig {
    intercepotrs?: RequestInterceptors


}