import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateUserEvent } from './create-user.event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('userCreated')
  handleUserCreated(payload: CreateUserEvent) {
	  console.log('received new CreateUserEvent', payload);
	  this.appService.handleUserCreated(payload);
  }
}
