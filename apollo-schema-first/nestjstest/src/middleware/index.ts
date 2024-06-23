//sre/middleware/index.ts
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request,Response,NextFunction } from "express";

@Injectable()
export class Logger implements NestMiddleware{
    use(req:Request, res:Response, next:NextFunction){
        console.log("触发了拦截器，该拦截器旨在拦截所有访问/user的请求")
        next()//放行
    }
}