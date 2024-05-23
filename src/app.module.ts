import { AppRoutingModule } from './app.routing-module';
import { ConfigurationModule } from './infrastructure/configuration/configuration.module';
import { Module } from '@nestjs/common';
//import { UserService } from '../user/user.service';

import { Task } from './model/task';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user';

import { ConfigurationService } from './infrastructure/configuration/configuration.service';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigurationModule],
            useFactory: (configService: ConfigurationService) => ({
                type: 'postgres',
                host: 'localhost',
                port: 24000,
                username: 'postgres',
                password: 'postgres',
                database: configService.databaseConfig['DATABASE_NAME'],
                entities: [User, Task],
                synchronize: true,
            }),
            inject: [ConfigurationService],
        }),
        AppRoutingModule,

    ],
})
export class AppModule {}
