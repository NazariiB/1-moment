import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file'))
  public addWarningImg(
    @Body() body: any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/png' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log('Sending warning image');
    return this.appService.saveImage(file, JSON.stringify(body));
  }

  @Get('test')
  public test() {
    return {
      success: true,
      message: 'Test successful',
    };
  }
}
