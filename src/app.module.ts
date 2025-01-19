import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImgbbModule } from './imgbb/imgbb.module';

@Module({
  imports: [
    ImgbbModule.forRoot('cb5d6907d5a16cd22cd6a7fa3807fe89'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
