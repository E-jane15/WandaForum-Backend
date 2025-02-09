import { Injectable } from '@nestjs/common';
import { Cron,CronExpression } from '@nestjs/schedule';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AvailabilitiesService {
  constructor(private databaseService: DatabaseService) {}

  /*@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT) // Run at midnight every day
  async handleCron() {
    await this.clearExpiredAvailabilities();
  }*/

  @Cron(CronExpression.EVERY_MINUTE) // Run every minute
  async handleCron() {
    await this.updateExpiredSlots();
  }


  async createAvailability(createAvailabilityDto: CreateAvailabilityDto) {
    try {
      
    return this.databaseService.availability.create({
      data: {
        userId: createAvailabilityDto.userId, // userId is now a string
        focusArea: createAvailabilityDto.focusArea,
        meetingPlatform: createAvailabilityDto.meetingPlatform,
        meetingLink: createAvailabilityDto.meetingLink,
        rolePreference: createAvailabilityDto.rolePreference,
        startTime: createAvailabilityDto.startTime,
        endTime: createAvailabilityDto.endTime,
        status: createAvailabilityDto.status || 'available',
        date: createAvailabilityDto.date,
      },
    });
    } catch (error) {
      console.log('Error creating availabilities', error)
      throw new error(`Failed to create avilability${error.message}`)
    }
    
  }

  async getAvailabilities() {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
  
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
  
    return this.databaseService.availability.findMany({
      where: {
        date: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
    });
  }
  

  async getAvailabilityByUserId(userId: string) {
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD
    const formattedDate = new Date(currentDate); // Convert to Date object
  
    return this.databaseService.availability.findFirst({
      where: {
        userId: userId,  // Pass userId dynamically
        date: formattedDate,  // Use a Date object, not a string
      },
    });
  }

  async clearExpiredAvailabilities() {
    const currentDate = new Date();
    
    await this.databaseService.availability.deleteMany({
      where: {
        date: {
          lt: currentDate, // Pass a Date object, not a string
        },
      },
    });
  }

  async updateExpiredSlots() {
    const currentDate = new Date()//.toISOString().split('T')[0]; // Get current date
    const currentTime = new Date()//.toLocaleTimeString('en-US', { hour12: false }); // Get current time in HH:MM:SS format

    // Find all availabilities for the current day that have expired
    const expiredSlots = await this.databaseService.availability.findMany({
      where: {
        date: currentDate,
        endTime: { lt: currentTime }, // Slots where endTime is less than current time
        status: 'available', // Only update slots that are still marked as available
      },
    });

    // Update the status of expired slots to 'unavailable'
    for (const slot of expiredSlots) {
      await this.databaseService.availability.update({
        where: { id: slot.id },
        data: { status: 'unavailable' },
      });
    }
  }
}


