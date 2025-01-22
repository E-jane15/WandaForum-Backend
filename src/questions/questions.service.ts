// src/questions/questions.service.ts
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';

import { PrismaService } from 'prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto, userId: string) {
    const { tags, ...questionData } = createQuestionDto;

    const question = await this.prisma.question.create({
      data: {
        ...questionData,
        userId,
        tags: tags
          ? {
              create: tags.map((tagName) => ({
                tag: {
                  connectOrCreate: {
                    where: { name: tagName },
                    create: { name: tagName },
                  },
                },
              })),
            }
          : undefined,
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
        user: {
          select: {
            id: true,
            userName: true,
          },
        },
      },
    });

    return question;
  }

  async findAll() {
    return this.prisma.question.findMany({
      include: {
        user: {
          select: {
            id: true,
            userName: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        _count: {
          select: {
            likes: true,
            answers: true,
            savedByUsers: true,
          },
        },
      },
    });
  }

  async findSavedQuestions(userId: string) {
    return this.prisma.question.findMany({
      where: {
        savedByUsers: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            userName: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        _count: {
          select: {
            likes: true,
            answers: true,
            savedByUsers: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const question = await this.prisma.question.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            userName: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
        answers: {
          include: {
            user: {
              select: {
                id: true,
                userName: true,
              },
            },
          },
        },
        _count: {
          select: {
            likes: true,
            answers: true,
            savedByUsers: true,
          },
        },
      },
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    return question;
  }

  async update(
    id: string,
    updateQuestionDto: UpdateQuestionDto,
    userId: string,
  ) {
    const question = await this.prisma.question.findUnique({
      where: { id },
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    if (question.userId !== userId) {
      throw new ForbiddenException('You can only update your own questions');
    }

    const { tags, ...questionData } = updateQuestionDto;

    return this.prisma.question.update({
      where: { id },
      data: {
        ...questionData,
        tags: tags
          ? {
              deleteMany: {},
              create: tags.map((tagName) => ({
                tag: {
                  connectOrCreate: {
                    where: { name: tagName },
                    create: { name: tagName },
                  },
                },
              })),
            }
          : undefined,
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  async remove(id: string, userId: string) {
    const question = await this.prisma.question.findUnique({
      where: { id },
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    if (question.userId !== userId) {
      throw new ForbiddenException('You can only delete your own questions');
    }

    await this.prisma.question.delete({
      where: { id },
    });
  }

  async saveQuestion(id: string, userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        savedQuestions: {
          connect: { id },
        },
      },
    });
  }

  async unsaveQuestion(id: string, userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        savedQuestions: {
          disconnect: { id },
        },
      },
    });
  }

  async likeQuestion(id: string, userId: string) {
    await this.prisma.questionLike.create({
      data: {
        userId,
        questionId: id,
      },
    });
  }

  async unlikeQuestion(id: string, userId: string) {
    await this.prisma.questionLike.delete({
      where: {
        userId_questionId: {
          userId,
          questionId: id,
        },
      },
    });
  }
}
