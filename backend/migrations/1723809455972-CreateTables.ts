import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1723809455972 implements MigrationInterface {
  name = 'CreateTables1723809455972';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "contact_person" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_12d9c34f76290c4e2ad2aa5e33f" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "contact_person"`);
  }
}
