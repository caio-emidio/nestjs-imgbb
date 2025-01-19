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

  describe('uploadImage', () => {
    it('deve fazer upload de uma imagem com sucesso', async () => {
      const mockFile = { buffer: Buffer.from('fake-image') } as any;
      const mockResponse = { success: true, data: { url: 'https://fakeurl.com/image.jpg' } };

      jest.spyOn(service, 'uploadImage').mockResolvedValueOnce(mockResponse);

      const result = await controller.uploadImage(mockFile);

      expect(result).toEqual(mockResponse);
      expect(service.uploadImage).toHaveBeenCalledWith(mockFile.buffer);
    });

    it('deve lançar erro se nenhum arquivo for enviado', async () => {
      await expect(controller.uploadImage(undefined)).rejects.toThrowError('Nenhum arquivo enviado!');
    });
  });
});
