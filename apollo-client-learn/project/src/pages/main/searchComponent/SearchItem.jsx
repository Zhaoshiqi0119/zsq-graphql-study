import React from 'react'

export default function SearchItem(props) {
  const {dataText} = props
  return (
    <div>
        <div style={{width:"400px",height:"50px",paddingLeft:"20px",lineHeight:"50px",fontSize:"20px"}}>{dataText}</div>
    </div>
  )
}
