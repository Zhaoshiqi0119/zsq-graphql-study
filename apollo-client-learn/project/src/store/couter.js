import { atom } from "recoil";

export const counter = atom({
    key:'counter',
    default:{
        title:"这是一个计数器显示",
        count:1,
    }
    //key相当于该状态的id
    //default是该状态的默认数据
})