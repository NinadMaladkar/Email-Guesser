import { Body, Controller, Get, Query } from '@nestjs/common';

import { EmailService } from './email.service';
import { EmailGuesserDto } from '../dtos/email-gusser.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get()
  async getPersonEmail(
    @Query('firstName') firstName: string,
    @Query('lastName') lastName: string,
    @Query('companyDomain') companyDomain: string,
  ) {
    console.log(
      'Service call to email guesser',
      firstName,
      lastName,
      companyDomain,
    );
    return this.emailService.getPersonEmail(firstName, lastName, companyDomain);
  }
}
