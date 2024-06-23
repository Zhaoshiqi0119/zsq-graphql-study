import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Detail() {
  //连续解构赋值：useLocation中有state对象，state中又可以解构出id,title,content
  const {state:{id,title,content}} = useLocation()
  return (
    <div>
      <ul>
        <li>{id}</li>
        <li>{title}</li>
        <li>{content}</li>
      </ul>
    </div>
  )
}
