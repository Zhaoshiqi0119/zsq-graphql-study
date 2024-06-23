import { Controller, Post, UploadedFile,Request, UseInterceptors, Res, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { zip } from 'compressing';//compressing 压缩
@Controller('upload')
export class UploadController {
    
    @Post("fileUpload")
    @UseInterceptors(FileInterceptor('file')) //‘file’是期望处理的参数名，即接受到post请求后，我们希望对其中属性为'file'的字段进行处理
    fileUpload(@Request() res){
        console.log(res['file'])
        return "文件上传成功"
    }

    // //语法糖写法
    // @Post("fileUpload")
    // @UseInterceptors(FileInterceptor('file')) 
    // fileUpload(@UploadedFile() file){
    //     console.log(file)
    //     return "文件上传成功"
    // }
    @Get("download")
    download(@Res() res:Response){
        const url = 'public/images/1717590503714.jpg'
        res.download(url)
    }
    @Get("streamDownload")
    async streamDownload(@Res() res:Response){
        const url = 'public/images/1717590503714.jpg'
        const tarStream = new zip.Stream()
        await tarStream.addEntry(url)
        res.setHeader('Content-Type','application/octet-stream')
        res.setHeader(
            'Content-Dispostion',
            `attachment;filename=123456xxx`
        )
        tarStream.pipe(res) //通过管道输出流
    }

}
