import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class HttpExecptionFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {
        const context = host.switchToHttp()
        const request = context.getRequest<Request>()
        const response  = context.getResponse<Response>()

        const status = exception.getStatus()
        response.status(status).json({
            success:false,
            time:new Date(),
            data:exception.message,
            status,
            path:request.url
        })

    }
}