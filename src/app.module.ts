import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImgbbModule } from './imgbb/imgbb.module';

@Module({
  imports: [
    ImgbbModule.forRoot(process.env.IMGBB_API_KEY),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
