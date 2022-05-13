import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Notice from "@/components/Notice/Notice";
//使用lazy进行组件懒加载
import Home from "@/views/Home/Home"
import "./App.scss"

const App: React.FC = () => {
    return (
        <>
         <Notice></Notice>
            {/* 所有的路由配置均在 BrowserRouter 内部 */}
            <BrowserRouter>
                {/* Link只能在BrowserRouter内部使用 */}
                {/* <Link to="/">Home</Link><br /> */}
                {/* 使用 Routes 替换曾经的 Switch */}
                <Routes>
                    {/* 路由引入组件 element：<Component/> Component() */}
                    <Route path="/" element={<Home />}></Route>
                </Routes>                
            </BrowserRouter>
        </>

    )
}

export default App;