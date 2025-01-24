import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';
// import { AuthGuard } from '@nestjs/passport';

@Controller('questions')
@UseGuards(JwtAuthGuard) // This ensures all routes are protected by default
// @UseGuards(AuthGuard('jwt'))
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto, @Req() req: Request) {
    return this.questionsService.create(createQuestionDto, req.user['id']);
  }

  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @Get('saved')
  findSavedQuestions(@Req() req: Request) {
    return this.questionsService.findSavedQuestions(req.user['id']);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
    @Req() req: Request,
  ) {
    return this.questionsService.update(id, updateQuestionDto, req.user['id']);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.questionsService.remove(id, req.user['id']);
  }

  @Post(':id/save')
  saveQuestion(@Param('id') id: string, @Req() req: Request) {
    return this.questionsService.saveQuestion(id, req.user['id']);
  }

  @Delete(':id/save')
  unsaveQuestion(@Param('id') id: string, @Req() req: Request) {
    return this.questionsService.unsaveQuestion(id, req.user['id']);
  }

  @Post(':id/like')
  likeQuestion(@Param('id') id: string, @Req() req: Request) {
    return this.questionsService.likeQuestion(id, req.user['id']);
  }

  @Delete(':id/like')
  unlikeQuestion(@Param('id') id: string, @Req() req: Request) {
    return this.questionsService.unlikeQuestion(id, req.user['id']);
  }
}
