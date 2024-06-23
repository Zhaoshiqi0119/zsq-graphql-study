import { Navigate } from "react-router-dom";
// import Main from "../pages/main/main.jsx"
// import Login from "../pages/user/Login.jsx"
// import Register from "../pages/user/Register.jsx"
// import About from "../pages/main/childRouterTest/About.jsx";
// import Detail from "../pages/main/childRouterTest/Detail.jsx"
// import Home from "../pages/main/test/Home.jsx"
// import Message from "../pages/main/childRouterTest/Message.jsx"
// import News from "../pages/main/childRouterTest/News.jsx"
// import TableFilter from "../pages/main/tableFilter/TableFilter.jsx"
// import UseEffectTest from "../pages/main/hooks/UseEffectTest.jsx";
// import UseStateTest from "../pages/main/hooks/UseStateTest.jsx";    
import React from "react";
import warning from "antd/es/_util/warning.js";

const Main = React.lazy(() => import("../pages/main/main.tsx"));
const Login = React.lazy(() => import("../pages/user/Login.tsx"));
const Register = React.lazy(() => import("../pages/user/Register.tsx"));
const About = React.lazy(() => import("../pages/main/childRouterTest/About.jsx"));
const Detail = React.lazy(() => import("../pages/main/childRouterTest/Detail.jsx"));
const Home = React.lazy(() => import("../pages/main/test/Home.jsx"));
const Message = React.lazy(() => import("../pages/main/childRouterTest/Message.jsx"));
const News = React.lazy(() => import("../pages/main/childRouterTest/News.jsx"));
const TableFilter = React.lazy(() => import("../pages/main/tableFilter/TableFilter.jsx"));
const UseEffectTest = React.lazy(() => import("../pages/main/hooks/UseEffectTest.jsx"));
const UseStateTest = React.lazy(() => import("../pages/main/hooks/UseStateTest.jsx"));
const Counter = React.lazy(() => import("../pages/main/counter/Counter.jsx"));
const Search = React.lazy(() => import("../pages/main/searchComponent/Search.jsx"));
const FileDownload = React.lazy(() => import("../pages/main/fileDownload/FileDownload.tsx"))
export default [
    {
        path: "/login",
        element: <Login></Login>
    }, {
        path: "/register",
        element: <Register></Register>
    }, {
        path: "/main",
        element: <Main></Main>,
        children: [ 
            {
                path: "about",
                element: <About></About>,
                children: [
                    {
                        path: "news",
                        element: <News />,
                        children: [
                            {
                                path: "detail",
                                element: <Detail />
                            }
                        ]
                    }, {
                        path: "message",
                        element: <Message />
                    }
                ]
            }, {
                path: "home",
                element: <Home></Home>
            }, {
                path: "tableFilter",
                element: <TableFilter></TableFilter>
            },{
                path:"useEffectTest",
                element:<UseEffectTest/>
            },{
                path:"useStateTest",
                element:<UseStateTest/>
            },{
                path:"counter",
                element:<Counter/>
            },{
                path:"search",
                element:<Search></Search>
            },{
                path:'FileDownload',
                element:<FileDownload></FileDownload>
            }
        ]
    }, {
        path: "/",
        element: <Navigate to="/login"></Navigate>
    },
]


