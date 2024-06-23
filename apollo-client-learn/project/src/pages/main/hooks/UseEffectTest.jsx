import React from 'react'
import { useEffect,useState } from 'react'
export default function UseEffectTest() {
  /*
    useEffect有两个参数，一个返回值
    第一个参数是一个回调函数，当只有第一个参数时，方法会在初始化和组件更新时执行。
    第二个参数是“数据依赖项”，当传递了第二个参数后，方法只在组件初始化挂载的时候执行
    它可以返回一个函数，返回的函数会在组件卸载时执行（很特殊）

    通过下面的案例，可以看出effect实际是做的对数据项的监听，当数据项发生变化后会执行回调函数
  */
 
    const [count,setCount] = useState(0)
    // 定义一个变量为count,将count放入state中管理，通过setCount方法可以修改count,useState(0)是设置count的初始值为0

    useEffect(() => {
      console.log("useEffect执行")
      return () => {
        console.log("组件卸载")
      }
    })//这个没有传递第二个参数，也就是监听全局变化,在组件初始化和更新时执行
    useEffect(() => {
        console.log("useEffect执行")
        return () => {
          console.log("组件卸载")
        }
      }, [])//这个传递了一个空参数，也就是不监听任何state的变化，只在组件初始化执行一次
      useEffect(() => {
        console.log("监听count变化，值为",count)
      }, [count])//这个传递了参数，将会监听count变量的变化，将会在count初始化和更新时执行
      //也可以同时传递两个变量，[count1,count2]，这样同时监听两个变量的变化
    function btn_click(){
        setCount(count + 1)
    }
  return (
    <div>
        <h1>{count}</h1>
        <button onClick={btn_click}> 点我+1 </button>
    </div>
  )
}
