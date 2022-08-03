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
import { User } from './entities/user.entity';

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
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number.parseInt(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USERNAME,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DATABASE,
            entities: [User],
            migrations: ['dist/database/migrations/*{.ts,.js}'],
            migrationsRun: true,
            logging: true,
            synchronize: true
        }),

        // TypeOrmModule.forRoot({
        //     type: 'mysql',
        //     host: process.env.MYSQL_DB_HOST,
        //     port: Number.parseInt(process.env.MYSQL_DB_PORT),
        //     username: process.env.MYSQL_DB_USER,
        //     password: process.env.MYSQL_DB_PASS,
        //     database: process.env.MYSQL_DB_NAME,
        //     entities: [User],
        //     migrations: ['dist/database/migrations/*{.ts,.js}'],
        //     migrationsRun: true,
        //     logging: true,
        //     synchronize: true
        // }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            playground: { settings: { 'request.credentials': 'include' } }
        }),
        AuthModule,
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
