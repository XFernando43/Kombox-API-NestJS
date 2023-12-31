import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
  .setTitle('Kombox-API')
  .setDescription('Kombox-api web seller')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('api/docs',app,document,{
    explorer:true,
    swaggerOptions:{
      filter:true,
      showRequestDuration:true,

    }
  });
  app.use(cookieParser());
  app.enableCors({
    origin:'http://localhost:3000',
    credentials:true
  })
  await app.listen(3000);
}
bootstrap();
