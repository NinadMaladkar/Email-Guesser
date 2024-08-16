import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ContactPerson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;
}
