// src/imgbb/imgbb.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ImgbbController } from './imgbb.controller';
import { ImgbbService } from './imgbb.service';

describe('ImgbbController', () => {
  let controller: ImgbbController;
  let service: ImgbbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImgbbController],
      providers: [
        {
          provide: ImgbbService,
          useValue: {
            uploadImage: jest.fn(), // Mock do serviço
          },
        },
      ],
    }).compile();

    controller = module.get<ImgbbController>(ImgbbController);
    service = module.get<ImgbbService>(ImgbbService);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });
});
