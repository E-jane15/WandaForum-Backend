import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SchedulesService {
    constructor(private databaseService: DatabaseService) {}
  
    async createSchedule(createScheduleDto: CreateScheduleDto) {
      try{
        // Check for an existing session with the same time and interview type
      const existingSession = await this.databaseService.session.findFirst({
        where: {
          interviewType: createScheduleDto.interviewType,
          date: createScheduleDto.date,
          time: createScheduleDto.time,
        },
        include: { users: true },
      });

      let sessionId: string;
      let meetingLink: string;

      if (existingSession && existingSession.users.length === 1) {
        // Join the existing session
        sessionId = existingSession.id;
        meetingLink = existingSession.meetingLink;
      } else {
        // Create a new session with a unique meeting link
        meetingLink = this.generateMeetingLink();
        const newSession = await this.databaseService.session.create({
          data: {
            interviewType: createScheduleDto.interviewType,
            date: createScheduleDto.date,
            time: createScheduleDto.time,
            meetingLink,
          },
        });
        sessionId = newSession.id;
      }

      // Save the schedule with the session ID
      return await this.databaseService.schedule.create({
        data: {
          interviewType: createScheduleDto.interviewType,
          peerType: createScheduleDto.peerType,
          practiceLevel: createScheduleDto.practiceLevel,
          date: createScheduleDto.date,
          time: createScheduleDto.time,
          userId: createScheduleDto.userId,
          sessionId,
        },
      });
      
      } catch (error){
        throw new Error (`Failed to create schedule:${error.message}`)
      }
      
    }
    private generateMeetingLink(): string {
      return `https://meet.jit.si/${Math.random().toString(36).substring(7)}`;
    }

    //Cancel function
    async cancelSchedule(scheduleId: string) {
      try {
        const schedule = await this.databaseService.schedule.findUnique({
          where: { id: scheduleId },
        });
    
        if (!schedule) {
          throw new Error(`Schedule with ID ${scheduleId} not found`);
        }
    
        // Delete the schedule
        await this.databaseService.schedule.delete({
          where: { id: scheduleId },
        });
    
        return { message: 'Schedule canceled successfully' };
      } catch (error) {
        throw new Error(`Failed to cancel schedule: ${error.message}`);
      }
    }

    
      }
  
