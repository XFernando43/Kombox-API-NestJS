import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product-managment/infracestructura/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './product-managment/infracestructura/category.module';
import { AccountsModule } from './Authentication-Managment/infracestructura/user.module';
import { AuthenticationModule } from './Authentication-Managment/infracestructura/authentication.module';

@Module({
  imports: [
    ProductModule,
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'123456789',
      database:'kombox-api',
      entities:[__dirname+'/**/*.entity{.ts,.js}'],
      synchronize:false, 
    }),
    CategoryModule,
    AccountsModule,
    AuthenticationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
