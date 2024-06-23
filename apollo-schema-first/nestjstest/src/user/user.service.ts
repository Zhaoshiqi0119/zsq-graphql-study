import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'
import { Response } from 'express';
const prisma = new PrismaClient()
import * as svgCaptcha from 'svg-captcha'
@Injectable()
export class UserService {

    async login(username:string,password:string, code:string,session){
        console.log(username+" "+password + " " + code )
        const user = await prisma.user.findUnique({
            where:{
                username:username
            }
        })
        if(session.code.toLowerCase() != code.toLowerCase()){
            return {
                res:"error",
                message:"验证码错误"
            }
        }
         if(user == null){
            return {
                res:"error",
                message:"用户名错误！"
            }
        }else if(user["password"] !== password){
            return {
                res:"error",
                message:"密码错误！"
            }
        }else{
            const response = {
                res: "success",
                message: "登录成功！",
                user, // 确保返回的响应包含 user 对象
            };
            return response;
        }
    }

    async register(username:string,password:string,repassword:string){
        console.log(username+" "+password + " " + repassword)
        const user = await prisma.user.findUnique({
            where:{
                username:username
            }
        })
        if(user != null){
            return {
                res:"error",
                message:"用户名已经存在！"
            }
        }else if(password !== repassword){
            return {
                res:"error",
                message:"两次密码不一致！"
            }
        }else if(password === repassword){
            const user = prisma.user.create({
                data:{
                    username:username,
                    password:password
                }
            })
            if(user != null){
                await prisma.user.create({
                    data:{
                        username,
                        password
                    }
                })
                return {
                    res:"success",
                    message:"注册成功!"
                }
            }
        }
    }


    getInfo(id:string){
        console.log(`我将要通过${id}id来获取信息`)
    }

    createCode(response, session){
        const captcha = svgCaptcha.create({
            size:4,
            fontSize:40,
            width:100,
            height:40,
            background:'#cc9966'
        })

        session.code = captcha.text
        response.type('image/svg+xml')
        response.send(captcha.data)
        console.log(session)
    }

}
