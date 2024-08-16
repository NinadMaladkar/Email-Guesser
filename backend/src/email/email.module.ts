import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { ContactPerson } from '../entities/contact-person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContactPerson])],
  providers: [EmailService],
  controllers: [EmailController],
})
export class EmailModule {}
