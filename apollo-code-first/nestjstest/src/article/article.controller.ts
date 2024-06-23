import { Controller, Get } from '@nestjs/common';

@Controller('article')
export class ArticleController {

    @Get('getArticle')
    getArticle(): string{
        return "春眠不觉鸟，处处闻啼鸟，夜来风雨声，花落知多少";
    }
}
