import React from 'react'
import './FileDownload.less'
export default function FileDownload() {
    const fileFetch = async(url:string)=>{
        const res = await fetch(url).then(res => res.arrayBuffer())
        const blob = new Blob([res])  //Blob（Binary Large Object）是一种用于处理二进制数据的类型
        const Url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = Url
        a.download = 'filename.zip'
        a.click()
    }
    
    function fileDownload(){
        fileFetch('http://localhost:9999/upload/streamDownload')
    }
    function fileDownload2(){
        window.open('http://localhost:9999/upload/download')
    }
  return (
    <div className='fileDownload'>
        <button className='filebutton' onClick={fileDownload}>文件流方式下载文件</button>
        <button className='filebutton' onClick={fileDownload2}>直接下载文件</button>
    </div>
  )
}


