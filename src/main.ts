import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// global['fetch'] = require('node-fetch');

async function bootstrap() {
    console.log(process.env.MYSQL_DB_USER);
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
}
bootstrap();
