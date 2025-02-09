import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { create } from 'domain';
import { AuthGuard } from '@nestjs/passport';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  
  @Post('save')
  async createSchedule(@Body() createScheduleDto: CreateScheduleDto){
    console.log('Interview received:', createScheduleDto);
    // Handle logic to save or process the interview
  return this.schedulesService.createSchedule(createScheduleDto)
  }

  @Delete(':id')
  async cancelSchedule(@Param('id') scheduleId: string) {
    try {
      const result = await this.schedulesService.cancelSchedule(scheduleId);
      return result; // { message: 'Schedule canceled successfully' }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
