import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthModule, UserModule } from '@modules';
import { ServerConf, DatabaseConf } from '@configs';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@entities';
import { DatabaseConfig } from '@interfaces';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      load: [ServerConf, DatabaseConf],
      isGlobal: true,
      cache: true,
      validationSchema: Joi.object({
        database: Joi.object({
          host: Joi.string().required(),
          port: Joi.number().default(5432),
          username: Joi.string().required(),
          password: Joi.string().required(),
          database: Joi.string().required(),
        }),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const db = config.get<DatabaseConfig>('database');

        if (!db) {
          throw new Error('Database configuration is missing');
        }

        return {
          type: 'postgres',
          host: db.host,
          port: db.port,
          username: db.username,
          password: db.password,
          database: db.database,
          entities: [User],
          synchronize: false,
        };
      },
    }),

    HealthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
