import Request from "./request";
import { NoticeRef } from "@/components/Notice/Notice";
const isProd = process.env.NODE_ENV === "production";
const request = new Request({
  baseURL: isProd ? "http://localhost:9000" : "/api",
  timeout: 3000,
  intercepotrs: {
    requestInterceptors(config) {
      // console.log("index request 拦截")
      return config;
    },
    requestInterceptorsCatch(e) {
      return e;
    },
    responseInterceptors(res) {
      let code = res.data.code;
      console.log(res)
      NoticeRef.current?.open({
        message: res.data.msg,
        type: code !== 200 ? "error" : "success",
        origin: { horizontal: "center", vertical: "top" },
      });
      return res.data;
    },
    responseInterceptorsCatch(e) {
      NoticeRef.current?.open({
        message: e.message,
        type: "error",
        origin: { horizontal: "center", vertical: "top" },
      });
      return e;
    },
  },
});

export default request;
