// src/imgbb/imgbb.service.ts
import { HttpService } from '@nestjs/axios';
import { Injectable, Inject } from '@nestjs/common';
import * as FormData from 'form-data';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ImgbbService {
  constructor(
    @Inject('IMGBB_API_KEY') private readonly apiKey: string,
    private readonly httpService: HttpService
  ) {}

  async uploadImage(image: Buffer): Promise<any> {
    const formData = new FormData();
    formData.append('key', this.apiKey);
    formData.append('image', image.toString('base64'));

    try {
      const response = await firstValueFrom(
        this.httpService.post('https://api.imgbb.com/1/upload', formData, {
          headers: formData.getHeaders(), 
        })
      );
      return response.data; 
    } catch (error) {
      throw new Error(`Erro no upload para ImgBB: ${error.message}`);
    }
  }
}
