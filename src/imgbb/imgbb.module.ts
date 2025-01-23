// src/imgbb/imgbb.module.ts
import { Module, DynamicModule, ModuleMetadata, Provider } from '@nestjs/common';
import { ImgbbService } from './imgbb.service';
import { ImgbbController } from './imgbb.controller';
import { HttpModule } from '@nestjs/axios';

export interface ImgbbModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory: (...args: any[]) => Promise<string> | string;
    inject?: any[];
}

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

    static forRootAsync(options: ImgbbModuleAsyncOptions): DynamicModule {
        const asyncProviders = this.createAsyncProviders(options);
        return {
            module: ImgbbModule,
            imports: options.imports || [],
            controllers: [ImgbbController],
            providers: [
                ...asyncProviders,
                ImgbbService,
            ],
            exports: [ImgbbService],
        };
    }

    private static createAsyncProviders(options: ImgbbModuleAsyncOptions): Provider[] {
        return [
            {
                provide: 'IMGBB_API_KEY',
                useFactory: options.useFactory,
                inject: options.inject || [],
            },
        ];
    }
}
