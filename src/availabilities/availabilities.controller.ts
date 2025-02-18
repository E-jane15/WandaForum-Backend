import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { AvailabilitiesService } from './availabilities.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';

@Controller('availabilities')
export class AvailabilitiesController {
  constructor(private readonly availabilitiesService: AvailabilitiesService) {}

  @Post('save')
  async createAvailability(@Body() createAvailabilityDto: CreateAvailabilityDto) {
    try {
      
      return this.availabilitiesService.createAvailability(createAvailabilityDto);
    } catch (error) {
      console.log('Error', error)
    }
  }

  @Get('availability')
  async getAvailabilities() {
    return this.availabilitiesService.getAvailabilities();
  }

  @Get(':userId')
  async getAvailabilityByUserId(@Param('userId') userId: string) {
    return this.availabilitiesService.getAvailabilityByUserId(userId);
  }

  @Patch(':userId/status')
  async updateStatus(@Param('userId') userId: string, @Body() body: { status: string }) {
    return this.availabilitiesService.updateStatus(userId, body.status);
  }

  @Delete('clear')
  async clearExpiredAvailabilities() {
    await this.availabilitiesService.clearExpiredAvailabilities();
    return { message: 'Expired availabilities cleared successfully' };
  }
}

