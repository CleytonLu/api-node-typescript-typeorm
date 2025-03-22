import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1742349537382 implements MigrationInterface {
    name = 'Default1742349537382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`videos\` DROP FOREIGN KEY \`room_id\``);
        await queryRunner.query(`DROP INDEX \`room_id_idx\` ON \`videos\``);
        await queryRunner.query(`ALTER TABLE \`rooms\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`rooms\` ADD \`name\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`videos\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`videos\` ADD \`title\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`videos\` DROP COLUMN \`url\``);
        await queryRunner.query(`ALTER TABLE \`videos\` ADD \`url\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`videos\` CHANGE \`room_id\` \`room_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`videos\` ADD CONSTRAINT \`FK_64bb2d8544299bbde670698ac37\` FOREIGN KEY (\`room_id\`) REFERENCES \`rooms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`videos\` DROP FOREIGN KEY \`FK_64bb2d8544299bbde670698ac37\``);
        await queryRunner.query(`ALTER TABLE \`videos\` CHANGE \`room_id\` \`room_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`videos\` DROP COLUMN \`url\``);
        await queryRunner.query(`ALTER TABLE \`videos\` ADD \`url\` varchar(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`videos\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`videos\` ADD \`title\` varchar(45) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`rooms\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`rooms\` ADD \`name\` varchar(45) NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`room_id_idx\` ON \`videos\` (\`room_id\`)`);
        await queryRunner.query(`ALTER TABLE \`videos\` ADD CONSTRAINT \`room_id\` FOREIGN KEY (\`room_id\`) REFERENCES \`rooms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
