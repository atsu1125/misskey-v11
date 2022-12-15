import {MigrationInterface, QueryRunner} from "typeorm";

export class disableprofiledirectory1671106114572 implements MigrationInterface {
    name = 'disableprofiledirectory1671106114572'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meta" ADD "disableProfileDirectory" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meta" DROP COLUMN "disableProfileDirectory"`);
    }

}
