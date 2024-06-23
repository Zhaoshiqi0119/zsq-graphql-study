import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request,Response,NextFunction } from 'express';
import * as cors from 'cors'
import * as session from 'express-session'
import {ResponseInterceptor} from "./common/response"
import {HttpExecptionFilter} from "./common/exceptionFilter"
import * as cookieParser from 'cookie-parser';

const whiteList = ['/user/login','/user/register']

function MiddlewareAll(req:Request,res:Response,next:NextFunction){
    console.log(req.originalUrl);
    let flag:boolean = false
    whiteList.map((item,index)=>{
      console.log(item)
      if(req.originalUrl.indexOf(item) != -1){
        flag = true
        return
      }
    })
    if(flag){
      next()
    }else{
      // res.send({message:"抱歉，你可能未登录呢！"})
      next()
    }
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.use(cors())  
  app.enableCors({ //npm install cors
    origin: 'http://localhost:3000', // 允许的前端地址
    credentials: true, // 允许携带凭据
  });
  // app.enableCors
  app.use(MiddlewareAll) //nestjs自己会帮我们调用函数，并传入所需的函数参数
  // app.useStaticAssets('public')//配置静态资源目录
  app.useStaticAssets('public/images',{
    prefix:'/static/'  //使用static替换路径public/images
  })//配置静态资源虚拟目录，访问static/1.jpeg，实际访问的是public中的1.jpeg
  
  // app.useGlobalFilters(new HttpExecptionFilter())
  // app.useGlobalInterceptors(new ResponseInterceptor())

  app.use(cookieParser());//确保可以解析cookie  npm install cookie-parser

  app.use(session({secret:"SessionTest",rolling:true,name:"mysession",cookie:{ maxAge:99999999 }})) 
  //secret就是签名，类似于jwt串前面的签名，都是放在 令牌串 的最前面
  //rolling是每次请求的时候重置session的过期时间
  //name就是这个session在前端cookie中存放是时候的名字。cookie是key-value形式，name就是它的key
  //maxage是过期时间
  await app.listen(9999);
}
bootstrap();
