import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EmailFormat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyDomain: string;

  @Column()
  format: string;
}
