import { IsNotEmpty, IsString } from 'class-validator';

export class EmailGuesserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  companyDomain: string;
}
