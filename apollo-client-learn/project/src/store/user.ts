import { atom } from "recoil";

interface User {
    avatar?: string;
    username: string;
  }

export const userStore = atom<User>({
    key:'userStore',
    default: {
        avatar: '',
        username: ''
      }
    //key相当于该状态的id
    //default是该状态的默认数据
})