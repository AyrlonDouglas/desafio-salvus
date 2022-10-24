import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { configuration } from 'env';
import { ProfessionalsModule } from './professionals/professionals.module';
import { Professional } from './professionals/entities/professional.entity';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Professional],
      synchronize: true,
      autoLoadEntities: true,
     
    }),
    UsersModule,
    AuthModule,
    ProfessionalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
