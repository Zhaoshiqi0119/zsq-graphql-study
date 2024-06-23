import { wait } from '@testing-library/user-event/dist/utils'
import React from 'react'
import { useEffect,useState } from 'react'
export default function UseStateTest() {

    const [count,setCount] = useState(0)
    // 定义一个变量为count,将count放入state中管理，通过setCount方法可以修改count,useState(0)是设置count的初始值为0

    //定义一个普通变量
    let t = 1
    useEffect(() => {
        console.log("useEffect执行")
        return () => {
          console.log("组件卸载")
        }
      }, [])
    
    function btn_click(){
        setCount(count + 1)

        //此处输出count实际是0，因为react是异步渲染的，在console.log(count)执行的时候，异步渲染还未完成。后面无法使用更新的count
        console.log(count)
    }
    function t_click(){
        //在类组件中，是通过this.state.setState(t,2);来将t的值修改为2
        //然而函数组件中this不能正常使用，注定不能直接修改变量，需要使用useState钩子
        t = t + 1
        /*这个+1操作是无效的 */
    }
  return (
    <div>
        <h1>{count}</h1>
        <button onClick={btn_click}> 点我+1 </button>
        <h1>{t}</h1>
        <button onClick={t_click}>点我给t+1</button>
    </div>
  )
}
