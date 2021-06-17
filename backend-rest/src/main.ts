import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // config Swagger document's descriptions
   const config = new DocumentBuilder()
   .setTitle('Food Story API')
   .setVersion('1.0')
   .build();

    // create Swagger document
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document); // setup Swagger document at route "/api"

  await app.listen(3000);
}
bootstrap();
