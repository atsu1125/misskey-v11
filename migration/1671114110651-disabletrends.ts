import {MigrationInterface, QueryRunner} from "typeorm";

export class disabletrends1671114110651 implements MigrationInterface {
    name = 'disabletrends1671114110651'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "meta" ADD "disableTrends" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "disableTrends"`);
    }

}
