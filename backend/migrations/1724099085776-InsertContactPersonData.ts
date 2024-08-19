import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertContactPersonData1724099085776
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            insert into contact_person ("firstName", "lastName", email) values ('Jay', 'Arun', 'jayarun@linkedin.com');
            insert into contact_person ("firstName", "lastName", email) values ('David', 'Stein', 'davidstein@google.com');
            insert into contact_person ("firstName", "lastName", email) values ('Mat', 'Lee', 'matlee@google.com');
            insert into contact_person ("firstName", "lastName", email) values ('Marta', 'Dahl', 'mdahl@babbel.com');
            insert into contact_person ("firstName", "lastName", email) values ('Vanessa', 'Boom', 'vboom@babbel.com');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            delete from contact_person where email in (
                'jayarun@linkedin.com',
                'davidstein@google.com',
                'matlee@google.com',
                'mdahl@babbel.com',
                'vboom@babbel.com'
            );
        `);
  }
}
