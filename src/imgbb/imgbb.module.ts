// src/imgbb/imgbb.module.ts
import { Module, DynamicModule } from '@nestjs/common';
import { ImgbbService } from './imgbb.service';
import { ImgbbController } from './imgbb.controller';
import { HttpModule } from '@nestjs/axios';

export class ImgbbModule {
    static forRoot(apiKey: string): DynamicModule {
        return {

            module: ImgbbModule,
            imports: [HttpModule],
            controllers: [ImgbbController],
            providers: [
                {
                    provide: 'IMGBB_API_KEY',
                    useValue: apiKey,
                },
                ImgbbService,
            ],
            exports: [ImgbbService],
        };
    }
}
