import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1608199040875 implements MigrationInterface {
  name = 'Initial1608199040875';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "isAdmin" boolean NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "meeting" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "hostId" integer NOT NULL, "users" character varying, "timeslot" TIMESTAMP, "description" character varying, "length" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_dccaf9e4c0e39067d82ccc7bb83" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "meeting_user" ("userId" integer NOT NULL, "meetingId" integer NOT NULL, CONSTRAINT "PK_29647cb26327517d03cc1d7a790" PRIMARY KEY ("userId", "meetingId"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user_meetings_meeting" ("userId" integer NOT NULL, "meetingId" integer NOT NULL, CONSTRAINT "PK_4d71a035f1bb6157e02505cc24f" PRIMARY KEY ("userId", "meetingId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f21b8f4c37735e3e805d2cfd1b" ON "user_meetings_meeting" ("userId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c7917229b55c06030de3a25e12" ON "user_meetings_meeting" ("meetingId") `
    );
    await queryRunner.query(
      `ALTER TABLE "meeting" ADD CONSTRAINT "FK_cad9f9392de84ea417ff7cce375" FOREIGN KEY ("hostId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_user" ADD CONSTRAINT "FK_16f730780f58416f8b03693aecb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_user" ADD CONSTRAINT "FK_10488a8ea0c580978d08799d5bc" FOREIGN KEY ("meetingId") REFERENCES "meeting"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user_meetings_meeting" ADD CONSTRAINT "FK_f21b8f4c37735e3e805d2cfd1bd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user_meetings_meeting" ADD CONSTRAINT "FK_c7917229b55c06030de3a25e12d" FOREIGN KEY ("meetingId") REFERENCES "meeting"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_meetings_meeting" DROP CONSTRAINT "FK_c7917229b55c06030de3a25e12d"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_meetings_meeting" DROP CONSTRAINT "FK_f21b8f4c37735e3e805d2cfd1bd"`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_user" DROP CONSTRAINT "FK_10488a8ea0c580978d08799d5bc"`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting_user" DROP CONSTRAINT "FK_16f730780f58416f8b03693aecb"`
    );
    await queryRunner.query(
      `ALTER TABLE "meeting" DROP CONSTRAINT "FK_cad9f9392de84ea417ff7cce375"`
    );
    await queryRunner.query(`DROP INDEX "IDX_c7917229b55c06030de3a25e12"`);
    await queryRunner.query(`DROP INDEX "IDX_f21b8f4c37735e3e805d2cfd1b"`);
    await queryRunner.query(`DROP TABLE "user_meetings_meeting"`);
    await queryRunner.query(`DROP TABLE "meeting_user"`);
    await queryRunner.query(`DROP TABLE "meeting"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
