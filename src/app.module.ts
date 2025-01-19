import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ImgbbModule } from './imgbb/imgbb.module';

@Module({
  imports: [
    ImgbbModule.forRoot(process.env.IMGBB_API_KEY),
  ],
  controllers: [AppController],
})
export class AppModule {}
