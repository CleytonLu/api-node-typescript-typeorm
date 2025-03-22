import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1742664647051 implements MigrationInterface {
    name = 'Default1742664647051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`rooms\` ADD \`description\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`rooms\` DROP COLUMN \`description\``);
    }

}
