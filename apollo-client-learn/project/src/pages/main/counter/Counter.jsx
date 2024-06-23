import React from 'react'
import { useRecoilState } from 'recoil'
import {counter} from '../../../store/couter.js'
import CountShow from './CountShow.jsx'
export default function Counter() {
  const [countData,setCountData] = useRecoilState(counter)
  console.log(countData)//countData输出的就是被管理的数据，分别为count和title
  return (

    <div>
        <h1>Recoil状态管理插件实现计数器</h1>
        <CountShow></CountShow>
        <button
            onClick={()=>{
                setCountData({count: countData.count+1})
            }}
        >点击我给计数器加1</button>
    </div>
  )
}
