import React, { useEffect, useState } from 'react'
import SearchItem from "./SearchItem"
import { Input, Space } from 'antd'

export default function Search() {
    const orginList = ["猪八戒学it", "猪八戒偷西瓜", "孙悟空打代码", "ac狂魔", "孙猴子三打白骨精", "早起每一天"]
    const [dataList, setDataList] = useState([])
    const [searchText, setSearchText] = useState("")
    useEffect(() => {
        setDataList(orginList.filter((item)=>{
            return item.toLowerCase().includes(searchText.toLowerCase());
        }))
    }, [searchText])
    return (
        <div>
            <h1>
                Search案例， 使用useState和useEffect
                <div>
                    <Input style={{ width: "400px" }} placeholder="请输入信息" onChange={(event)=>{setSearchText(event.target.value)}}/>
                    <hr />
                    <div style={{ width: "400px", height: "1100px" }}>
                        {dataList.map((dataText,index) => {
                            return (
                                <SearchItem key={index} dataText={dataText}></SearchItem>
                            )
                        })}
                    </div>
                </div>
            </h1>
        </div>
    )
}
