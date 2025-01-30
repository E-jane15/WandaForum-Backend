import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SchedulesService {
    constructor(private databaseService: DatabaseService) {}
  
    async createSchedule(createScheduleDto: CreateScheduleDto) {
      try{
      return await this.databaseService.schedule.create({
        data: {
          interviewType: createScheduleDto.interviewType,
          peerType: createScheduleDto.peerType,
          practiceLevel: createScheduleDto.practiceLevel,
          date: createScheduleDto.date,
          time: createScheduleDto.time,
          userId:createScheduleDto.userId
        },
        })
      } catch (error){
        throw new Error (`Failed to create schedule:${error.message}`)
      }
      
    }
  }
