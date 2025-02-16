import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { DatabaseService } from 'src/database/database.service';
import { DateTime } from 'luxon'; // Importing Luxon for date manipulation

@Injectable()
export class AvailabilitiesService {
  constructor(private databaseService: DatabaseService) {}

  // Cron job to clear expired availabilities every minute
  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    await this.clearExpiredAvailabilities();
  }

  // Create or update availability
  async createAvailability(createAvailabilityDto: CreateAvailabilityDto) {
    try {
      // Get current date in ISO format to ensure it's valid for the date field
      const currentDate = DateTime.now().toISO();  // Full ISO format (date and time)

      // Combine current date with the provided start and end time
      const startTime = DateTime.fromISO(`${DateTime.now().toISODate()}T${createAvailabilityDto.startTime}`).toISO();
      const endTime = DateTime.fromISO(`${DateTime.now().toISODate()}T${createAvailabilityDto.endTime}`).toISO();

      return this.databaseService.availability.upsert({
        where: { id: createAvailabilityDto.userId },
        update: {
          focusArea: createAvailabilityDto.focusArea,
          meetingPlatform: createAvailabilityDto.meetingPlatform,
          meetingLink: createAvailabilityDto.meetingLink,
          rolePreference: createAvailabilityDto.rolePreference,
          startTime: startTime,  // Corrected format for start time
          endTime: endTime,      // Corrected format for end time
          status: 'available',
          // Set current date automatically for update, using full datetime format
          date: currentDate,
        },
        create: {
          userId: createAvailabilityDto.userId,
          focusArea: createAvailabilityDto.focusArea,
          meetingPlatform: createAvailabilityDto.meetingPlatform,
          meetingLink: createAvailabilityDto.meetingLink,
          rolePreference: createAvailabilityDto.rolePreference,
          startTime: startTime,  // Corrected format for start time
          endTime: endTime,      // Corrected format for end time
          status: 'available',
          // Set current date automatically for create, using full datetime format
          date: currentDate,
        },
      });
    } catch (error) {
      console.log('Error creating availability:', error);
      throw new Error(`Failed to create availability: ${error.message}`);
    }
  }

  // Get all availabilities
  async getAvailabilities() {
    return this.databaseService.availability.findMany();
  }

  // Get availability by user ID
  async getAvailabilityByUserId(userId: string) {
    return this.databaseService.availability.findFirst({
      where: { userId },
    });
  }

  // Update the availability status (e.g., change to 'unavailable')
  async updateStatus(id: string, newStatus: string) {
    return this.databaseService.availability.update({
      where: { id },
      data: { status: newStatus },
    });
  }

  // Clear expired availabilities (those with an end time in the past)
  async clearExpiredAvailabilities() {
    const currentTime = new Date();

    await this.databaseService.availability.deleteMany({
      where: {
        endTime: { lt: currentTime },
      },
    });
  }
}
