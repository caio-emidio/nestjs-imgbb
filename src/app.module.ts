import { Module } from '@nestjs/common';
import { ImgbbModule } from './imgbb/imgbb.module';

@Module({
  imports: [
    ImgbbModule.forRoot(process.env.IMGBB_API_KEY),
  ],
  controllers: [],
})
export class AppModule {}
