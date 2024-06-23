import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports:[MulterModule.register({
    storage:diskStorage({  //设置文件的储存位置，即存储文件的名字
      destination:'public/images',
      filename:(_,file,callback) => {
        const fileName = `${new Date().getTime() + extname(file.originalname)}` //extname是Node.js的path模块中的一个函数，用于从原始文件名中提取扩展名
        return callback(null,fileName)
      }
    })
    
  })],
  controllers: [UploadController]
})
export class UploadModule {}
