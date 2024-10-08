import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { ContactPerson } from '../entities/contact-person.entity';
import { EMAIL_FORMAT } from '../config';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(ContactPerson)
    private contactPersonRepository: Repository<ContactPerson>,
  ) {}

  async getPersonEmail(
    firstName: string,
    lastName: string,
    companyDomain: string,
  ) {
    if (!firstName || !lastName || !companyDomain) {
      throw new BadRequestException(
        'firstName, lastName and companyDomain are required',
      );
    }
    const contactPerson = await this.contactPersonRepository.findOne({
      where: { email: Like(`%${companyDomain.toLowerCase()}%`) },
    });

    if (!contactPerson) {
      throw new NotFoundException(
        `No contact person found for ${companyDomain}`,
      );
    }

    const emailFormat = this.getEmailFormat(contactPerson);

    return this.guessUserEmail(firstName, lastName, emailFormat, companyDomain);
  }

  getEmailFormat(contactPerson: ContactPerson) {
    const firstName = contactPerson.firstName.toLowerCase();
    const lastName = contactPerson.lastName.toLowerCase();
    const email = contactPerson.email.toLowerCase();

    if (email.includes(firstName) && email.includes(lastName)) {
      return EMAIL_FORMAT.FIRST_NAME_LAST_NAME;
    } else if (email.startsWith(firstName[0]) && email.includes(lastName)) {
      return EMAIL_FORMAT.FIRST_NAME_INITIAL_LETTER_LAST_NAME;
    } else {
      throw new NotFoundException('No email format found');
    }
  }

  guessUserEmail(
    firstName: string,
    lastName: string,
    emailFormat: string,
    companyDomain: string,
  ) {
    switch (emailFormat) {
      case EMAIL_FORMAT.FIRST_NAME_LAST_NAME:
        return `${firstName.toLowerCase()}${lastName.toLowerCase()}@${companyDomain.toLowerCase()}`;
      case EMAIL_FORMAT.FIRST_NAME_INITIAL_LETTER_LAST_NAME:
        return `${firstName[0].toLowerCase()}${lastName.toLowerCase()}@${companyDomain.toLowerCase()}`;
      default:
        throw new NotFoundException('Email format not found');
    }
  }
}
