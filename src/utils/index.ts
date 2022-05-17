import { NoticeRef } from "@/components/Notice/Notice"
export function isUndef(v: any): boolean {
  return v === null || v === undefined
}

// 复制方法
export function copy(text: string) {
  let inputEl = document.createElement('input');
  inputEl.id = 'copyInput'
  document.body.appendChild(inputEl);
  inputEl.setAttribute('style', 'position:fixed;top:100px;right:100px;opacity:1');
  inputEl.value = text;
  let key: any = document.getElementById("copyInput");//获取文本框id
  try {
    key.select();
    document.execCommand("Copy");
    NoticeRef.current?.open({
      message: "复制成功",
      type: "success",
      origin: { horizontal: "center", vertical: "top" },
    })
  } catch (e) {
    console.log(e)
    NoticeRef.current?.open({
      message: "复制失败",
      type: "error",
      origin: { horizontal: "center", vertical: "top" },
    })
  }
  inputEl.remove();
}

export class Debounce {
  /**
* @param func 需要包装的函数
* @param delay 延迟时间，单位ms
* @param immediate 是否默认执行一次(第一次不延迟)
*/
  public use = (fn:Function, delay: number = 500, immediate: Boolean = false) => {
    let timer: NodeJS.Timeout | null
    return (...args: any) => {
      if (timer) clearTimeout(timer)
      if (immediate) {
        if (!timer) fn.apply(this, args);
        timer = setTimeout(function () { timer = null }, delay)
      } else {
        timer = setTimeout(() => {
          fn.apply(this, args)
        }, delay)
      }
    }
  }
}

//节流
export class Throttle {
  public use = (fn: Function, delay: number = 500, immediate: Boolean = false) => {
    let pre = Date.now();
    return (...args: any) => {
      let cur = Date.now();
      if (immediate) {
        fn.apply(this, [...args])
        immediate = false
      }
      if (cur - pre >= delay) {
        fn.apply(this, [...args])
        pre = Date.now()
      }
    }
  }
}


// 下载文件
export function downloadFile(obj:any, name:string, suffix:string) {
  const url = window.URL.createObjectURL(new Blob([obj]))
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  const fileName = new Date() + '-' + name + '.' + suffix
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}