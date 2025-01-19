
# Imgbb-NestJS

A NestJS module to easily integrate the [ImgBB API](https://imgbb.com/) for uploading images to ImgBB and retrieving the URLs of the uploaded images.

This module provides a simple service and controller to upload images to ImgBB directly from your NestJS application.

## Features

- Upload images to ImgBB via the API.
- Easy integration with NestJS projects.
- Support for image uploads via HTTP POST requests.
- Configurable options for API key and additional settings.

## Installation

To use the `imgbb-nestjs` module in your NestJS project, follow these steps:

1. Install the module via npm:

   ```bash
   npm install imgbb-nestjs
   ```

2. Install the required dependencies for `multer` (for file uploads):

   ```bash
   npm install @nestjs/platform-express multer
   ```

## Setup

1. Import the `ImgbbModule` in your NestJS `AppModule` and configure it with options:

   ```typescript
   import { Module } from '@nestjs/common';
   import { ImgbbModule } from 'imgbb-nestjs';

   @Module({
     imports: [
       ImgbbModule.forRoot({
         apiKey: 'YOUR_IMGBB_API_KEY',
         options: {
           // Additional options, if needed (e.g., image size, expiration)
           maxSize: 10 * 1024 * 1024,  // Max file size in bytes (e.g., 10MB)
           expiration: 3600,  // Expiration time for the image link (in seconds)
         },
       }),
     ],
   })
   export class AppModule {}
   ```

   Replace `'YOUR_IMGBB_API_KEY'` with your actual ImgBB API key. You can also pass additional options like `maxSize` and `expiration` based on your use case.

## Usage

Once the module is set up, you can use it in your controllers.

### Example Controller

```typescript
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImgbbService } from 'imgbb-nestjs';

@Controller()
export class AppController {
  constructor(private readonly imgbbService: ImgbbService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No image uploaded');
    }

    const result = await this.imgbbService.uploadImage(file.buffer);
    return result;
  }
}
```

### Upload Image Endpoint

- **POST** `/upload`: Uploads an image to ImgBB.

To test the `uploadImage` endpoint, use the following `curl` command:

```bash
curl --location --request POST 'http://localhost:3000/upload' \
--form 'image=@"/path/to/your/image.jpg"'
```

Replace `"/path/to/your/image.jpg"` with the path to the image file you want to upload.

### Configuration Options

The `ImgbbModule.forRoot()` method accepts the following options:

- **`apiKey`**: Your ImgBB API key (required).
- **`options`** (optional): Additional configuration options for the upload.
  - `maxSize` (optional): Maximum allowed image size in bytes. Default is unlimited.
  - `expiration` (optional): The expiration time of the uploaded image link in seconds. Default is 0 (no expiration).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```