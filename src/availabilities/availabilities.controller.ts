import { Controller, Get, Post, Body, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AvailabilitiesService } from './availabilities.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { console } from 'node:inspector';

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
    return this.availabilitiesService.getAvailabilityByUserId(userId); // userId is now a string
  }

  @Delete('clear')
    @HttpCode(HttpStatus.NO_CONTENT) // Returns 204 No Content on success
    async clearExpiredAvailabilities() {
      await this.availabilitiesService.clearExpiredAvailabilities();
      return { message: 'Expired availabilities cleared successfully' };
    }
}


