import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }

  async getQuestionById(questionId: number) {
    return await this.question.findUnique({ where: { 
      id: questionId 
    }
   }
  );
  
  }
}