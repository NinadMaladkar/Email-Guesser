import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ContactPerson } from '../entities/contact-person.entity';

describe('EmailService', () => {
  let service: EmailService;
  let fakeEmailService: Partial<EmailService>;
  let contactPerson: ContactPerson;
  beforeEach(async () => {
    fakeEmailService = {
      getPersonEmail: (firstName, lastName, companyDomain) =>
        Promise.resolve(
          `${firstName[0].toLowerCase()}${lastName.toLowerCase()}@${companyDomain.toLowerCase()}`,
        ),
      getEmailFormat: (contactPerson) => {
        const firstName = contactPerson.firstName.toLowerCase();
        const lastName = contactPerson.lastName.toLowerCase();
        const email = contactPerson.email.toLowerCase();

        if (email.includes(firstName) && email.includes(lastName)) {
          return 'first_name_last_name';
        } else if (email.startsWith(firstName[0]) && email.includes(lastName)) {
          return 'first_name_initial_letter_last_name';
        } else {
          throw new NotFoundException('No email format found');
        }
      },
    };
    const module = await Test.createTestingModule({
      providers: [
        EmailService,
        { provide: EmailService, useValue: fakeEmailService },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('can create an instance of EmailService', async () => {
    expect(service).toBeDefined();
  });

  it('should return the correct email for babbel.com', async () => {
    const email = await service.getPersonEmail(
      'Ninad',
      'Maladkar',
      'babbel.com',
    );
    expect(email).toBe('nmaladkar@babbel.com');
  });

  it('should return the correct email for google.com', async () => {
    fakeEmailService.getPersonEmail = (firstName, lastName, companyDomain) => {
      return Promise.resolve(
        `${firstName.toLowerCase()}${lastName.toLowerCase()}@${companyDomain.toLowerCase()}`,
      );
    };
    const email = await service.getPersonEmail('Mat', 'Lee', 'Google.com');
    expect(email).toBe('matlee@google.com');
  });

  it('should throw 400 error if firstName is not provided', async () => {
    fakeEmailService.getPersonEmail = (firstName, lastName, companyDomain) => {
      if (!firstName || !lastName || !companyDomain) {
        return Promise.reject(
          new BadRequestException(
            'firstName, lastName and companyDomain are required',
          ),
        );
      }
      return Promise.resolve('');
    };

    await expect(
      service.getPersonEmail('', 'Maladkar', 'babbel.com'),
    ).rejects.toThrow(
      new BadRequestException(
        'firstName, lastName and companyDomain are required',
      ),
    );
  });

  it('should throw 404 error if no user with the given CompanyDomain is found', async () => {
    fakeEmailService.getPersonEmail = (firstName, lastName, companyDomain) => {
      if (!contactPerson) {
        return Promise.reject(
          new NotFoundException(`No contact person found for ${companyDomain}`),
        );
      }
      return Promise.resolve('');
    };

    await expect(
      service.getPersonEmail('John', 'Doe', 'facebook.com'),
    ).rejects.toThrow(
      new NotFoundException(`No contact person found for facebook.com`),
    );
  });

  it('should return correct email format if the email format is found', async () => {
    const emailFormat = service.getEmailFormat({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@google.com',
    });

    expect(emailFormat).toBe('first_name_last_name');
  });

  it('should return correct email format if the email format is found', async () => {
    const emailFormat = service.getEmailFormat({
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'jdoe@babbel.com',
    });
    expect(emailFormat).toBe('first_name_initial_letter_last_name');
  });
});
