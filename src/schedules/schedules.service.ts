import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SchedulesService {
    constructor(private databaseService: DatabaseService) {}
  
    async createSchedule(createScheduleDto: CreateScheduleDto) {
      try {
        // Convert date and time to Date objects
        const dateObj = new Date(createScheduleDto.date);
        const timeObj = new Date(createScheduleDto.time);
    
        // Check for an existing session with the same time and interview type
        const existingSession = await this.databaseService.session.findFirst({
          where: {
            interviewType: createScheduleDto.interviewType, // Ensure interviewType is properly used
            date: dateObj,
            time: timeObj,
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
          console.log("Interview Type before session creation:", createScheduleDto.interviewType);
          console.log("Practice before session creation:", createScheduleDto.practiceLevel);
          const newSession = await this.databaseService.session.create({
            data: {
              interviewType: createScheduleDto.interviewType, // ✅ Ensure this field is correctly assigned
              date: dateObj,
              time: timeObj,
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
            date: dateObj,
            time: timeObj,
            userId: createScheduleDto.userId,
            sessionId,
            
          },
          include: {
            user: true,
            session: true,
          },
        });
    
      } catch (error) {
        throw new Error(`Failed to create schedule: ${error.message}`);
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


      async getUserSchedules(userId: string) {
        try {
            const schedules = await this.databaseService.schedule.findMany({
                where: { userId },
                include: {
                    session: true, // Include session details
                    user: true, // Include user details
                },
            });

            return schedules;
        } catch (error) {
            throw new Error(`Failed to fetch schedules: ${error.message}`);
        }
    }
}
