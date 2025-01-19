// src/imgbb/imgbb.controller.ts
import { Controller, Post, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImgbbService } from './imgbb.service';

@Controller('imgbb')
export class ImgbbController {
  constructor(private readonly imgbbService: ImgbbService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // Intercepta o upload do arquivo
  async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<any> {
    if (!file) {
      throw new Error('Nenhum arquivo enviado!');
    }

    const buffer = file.buffer; // Buffer do arquivo enviado
    return this.imgbbService.uploadImage(buffer, {name: file.originalname});
  }
}
