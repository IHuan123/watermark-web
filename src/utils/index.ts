import { NoticeRef } from "@/components/Notice/Notice"
export function isUndef(v:any):boolean{
    return v===null||v===undefined
}

// 复制方法
export function copy(text:string){
    let inputEl = document.createElement('input');
    inputEl.id = 'copyInput'
    document.body.appendChild(inputEl);
    inputEl.setAttribute('style','position:fixed;top:100px;right:100px;opacity:1');
    inputEl.value = text;
    let key:any = document.getElementById("copyInput");//获取文本框id
    try{
      key.select();
      document.execCommand("Copy");
      NoticeRef.current?.open({
        message: "复制成功",
        type: "success",
        origin: { horizontal: "center", vertical: "top" },
    })
    }catch (e){
      console.log(e)
      NoticeRef.current?.open({
        message: "复制失败",
        type: "error",
        origin: { horizontal: "center", vertical: "top" },
    })
    }
    inputEl.remove();
  }