import { Body, Controller, Get, Query, ValidationPipe } from '@nestjs/common';

import { EmailService } from './email.service';
import { EmailGuesserDto } from '../dtos/email-gusser.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get()
  async getPersonEmail(
    @Query(new ValidationPipe({ transform: true }))
    emailGuesserDto: EmailGuesserDto,
  ) {
    const { firstName, lastName, companyDomain } = emailGuesserDto;
    return this.emailService.getPersonEmail(firstName, lastName, companyDomain);
  }
}
