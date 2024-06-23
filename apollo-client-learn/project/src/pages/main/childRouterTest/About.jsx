import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function About() {
  return (
    <div>
      <h2>我是about组件中的内容</h2>
        <div class="home-router-bar" style={{height:"80px"}}>
            <NavLink to="news" style={{width:"100px",height:"40px",lineHeight:"40px",textAlign:"center",borderRadius:"5px 5px",background:"yellow",float:"left"}}>AboutC1</NavLink>
            <NavLink to="message" style={{width:"100px",height:"40px",lineHeight:"40px",textAlign:"center",borderRadius:"5px 5px",background:"yellow",float:"left"}}>AboutC2</NavLink>
        </div>
        <div style={{padding:"50px 50px",margin:"30px 20px",background:"white"}}>
            {/*路由显示区域*/}
            <Outlet ></Outlet>
        </div>
    </div>
  )
}
