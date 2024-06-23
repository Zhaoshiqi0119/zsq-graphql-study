import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable,map } from "rxjs";

interface Date<T>{
    data:T
}

//observable 可观察的
//ExecutionContext 执行上下文
/*
1.RxJS 简介
RxJS 是一个用于处理异步数据流的 JavaScript 库，它的设计理念来源于函数式编程。
RxJS 提供了很多操作符，可以方便地处理复杂的异步数据流，例如：Observable、Observer、Subject 等。
2.RxJS 中的 Map 操作
在 RxJS 中，Map 是一种非常常用的操作符，它可以将一个 Observable 转换成另一个 Observable。
Map 操作符接收一个函数作为参数，这个函数会接收一个值，并返回一个新的值。Map 操作符会将这个函数应用于每个元素，并返回一个新的 Observable，其中包含应用函数后的新值。
3.Map 的用途
Map 操作符的主要用途是转换数据流中的每个元素，以便在新的数据流中产生新的值。
这非常有用，例如，当你需要对数据流中的每个元素进行某种操作时，可以使用 Map 操作符来实现。
*/

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler): Observable<Date<T>>{
        return next.handle().pipe(map(data=>{
            return{
                data,
                status:0,
                message:"使用响应拦截器对data进行包装",
                success:true
            }
        }))
    }
}