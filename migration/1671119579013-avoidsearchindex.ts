import {MigrationInterface, QueryRunner} from "typeorm";

export class avoidsearchindex1671119579013 implements MigrationInterface {
    name = 'avoidsearchindex1671119579013'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "avoidSearchIndex" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avoidSearchIndex"`);
    }

}
