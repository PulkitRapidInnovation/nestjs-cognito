import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';

require('dotenv').config();
@Module({
    imports: [
        // GraphQLModule.forRoot({
        //     autoSchemaFile: true,
        //     installSubscriptionHandlers: true,
        //     uploads: false,
        //     context: ({ req }) => ({ req }),
        //     debug: false
        // }),
        ConfigModule.forRoot({
            isGlobal: true
        }),

        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.MYSQL_DB_HOST,
            port: Number.parseInt(process.env.MYSQL_DB_PORT),
            username: process.env.MYSQL_DB_USER,
            password: process.env.MYSQL_DB_PASS,
            database: process.env.MYSQL_DB_NAME,
            entities: ['dist/entities/*{.ts,.js}'],
            migrations: ['dist/database/migrations/*{.ts,.js}'],
            migrationsRun: true,
            logging: true
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            playground: { settings: { 'request.credentials': 'include' } }
        }),
        AuthModule,
        UsersModule,

    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
