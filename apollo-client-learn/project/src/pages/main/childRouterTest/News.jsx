import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Detail from './Detail'
export default function News() {
  const [messages] = useState([
    { id: '001', title: "消息1", content: '锄禾日当午' },
    { id: '003', title: "消息2", content: "谁知盘中餐" },
    { id: '002', title: "消息3", content: "汗滴禾下土" },
    { id: '004', title: "消息4", content: "粒粒皆辛苦" },
  ])
  const navigate = useNavigate()
  function clickHandle(m) {
    navigate("detail", {
      replace: false,
      state: {
        id: m.id,
        title: m.title,
        content: m.content
      }
    })
  }
  return (
    <div>
      <h5>News列表</h5>
      <ul>
        {
          messages.map((m) => {
            return (
              <li key={m.id}>
                <Link to="detail"
                  state={{
                    id: m.id,
                    title: m.title,
                    content: m.content
                  }}>{m.title}</Link>
                <button onClick={() => clickHandle(m)}>点我跳转</button>
              </li>
            )
          })
        }
      </ul>
      <hr />
      <Outlet></Outlet>


    </div>
  )
}
