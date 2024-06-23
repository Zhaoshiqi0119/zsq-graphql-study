import React from 'react'
import { useRecoilValue } from 'recoil'
import {counter} from '../../../store/couter.js'
export default function CountShow() {
    const {count} = useRecoilValue(counter)
  return (
    <div>
        <h3>当前的数值为：{count}</h3>
    </div>
  )
}
