// src/imgbb/imgbb.module.ts
import { Module, DynamicModule } from '@nestjs/common';
import { ImgbbService } from './imgbb.service';
import { ImgbbController } from './imgbb.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [ImgbbService],
    exports: [ImgbbService], // Certifique-se de exportar o serviço aqui
  })
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
