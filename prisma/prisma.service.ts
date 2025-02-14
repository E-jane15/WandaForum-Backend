// import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';

// @Injectable()
// export class PrismaService
//   extends PrismaClient
//   implements OnModuleInit, OnModuleDestroy
// {
//   private readonly logger = new Logger(PrismaService.name);

//   async onModuleInit() {
//     try {
//       await this.$connect();
//       this.logger.log('Database connection established');
//     } catch (error) {
//       this.logger.error('Failed to connect to the database', error.stack);
//     }
//   }

//   async onModuleDestroy() {
//     try {
//       await this.$disconnect();
//       this.logger.log('Database connection closed');
//     } catch (error) {
//       this.logger.error('Failed to disconnect from the database', error.stack);
//     }
//   }
// }

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // Remove the redefinition of emailLog
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}