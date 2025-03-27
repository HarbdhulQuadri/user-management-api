import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'codehunter',
      // password: 'your_password',
      database: 'new',
      autoLoadEntities: true,
      synchronize: true, // Set to false in production
    }),
    UsersModule,
  ],
})
export class AppModule {}