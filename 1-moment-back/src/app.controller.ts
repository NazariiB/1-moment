import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MomentStatus } from './enum/momentStatus';

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
    return this.appService.saveImage(file, JSON.stringify(body));
  }

  @Post('moment')
  public createMoment(
    @Body()
    body: {
      fid: string;
      name: string;
      status: MomentStatus;
      momentId: string;
    },
  ) {
    return this.appService.createMoment(body);
  }

  @Put('moment')
  public updateMoment(
    @Body()
    body: {
      status: MomentStatus;
      momentId: string;
    },
  ) {
    return this.appService.updateMoment(body);
  }

  @Get('test')
  public test() {
    return {
      success: true,
      message: 'Test successful',
    };
  }
}
