import { Body, Controller, Get, Param, Post, Query, Request,ParseIntPipe, Inject, Req, Session, Response } from '@nestjs/common';
import { request } from 'http';
import { json } from 'node:stream/consumers';
import { UserService } from './user.service';
import * as svgCaptcha from 'svg-captcha'

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post('login')
    login(@Body() body, @Session() session){
        const username = body["username"]
        const password = body["password"]
        const code = body["code"]
        console.log("这是我的session")
        console.log(session)
        return this.userService.login(username,password,code,session)
    }
    @Post('register')
    register(@Body() body){
        const username = body["username"]
        const password = body["password"]
        const confirmPassword =body["confirmPassword"]
        return this.userService.register(username,password,confirmPassword)
    }

    @Get('getInfo')
    getInfo(@Request() req){
        console.log(req.query)//输出{ username: '张三', password: '123456' }
        return req.query
    }

    @Get('code')
    createCode(@Response() res, @Session() session) {
        return this.userService.createCode(res,session)
    }


    // @Post('register')
    // register(@Request() req){
    //     console.log(req.body)
    //     return req.body
    // }

    


    // @Get("findById/:id")
    // getByUserId(@Request() req){
    //     console.log(req.params.id)
    //     return req.params.id
    // }

    @Get("findById/:id")
    getByUserId(@Param('id',ParseIntPipe) param){
        console.log(param)
        return param
    }
}
