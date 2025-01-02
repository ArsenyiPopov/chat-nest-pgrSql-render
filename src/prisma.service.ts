import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // Слушаем событие завершения работы
    process.on('SIGINT', async () => {
      console.log('Gracefully shutting down Prisma connection...');
      await this.$disconnect();
      await app.close();
    });

    process.on('SIGTERM', async () => {
      console.log('Gracefully shutting down Prisma connection...');
      await this.$disconnect();
      await app.close();
    });
  }
}
