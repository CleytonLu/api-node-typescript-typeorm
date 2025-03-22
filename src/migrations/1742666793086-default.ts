import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1742666793086 implements MigrationInterface {
    name = 'Default1742666793086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE \`room_subject\` DROP COLUMN \`subjects_id\``);
        await queryRunner.query(`ALTER TABLE \`room_subject\` ADD \`room_id\` int NOT NULL PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`room_subject\` ADD \`subject_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`room_subject\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`room_subject\` ADD PRIMARY KEY (\`room_id\`, \`subject_id\`)`);
        await queryRunner.query(`ALTER TABLE \`subjects\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`subjects\` ADD \`name\` text NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`IDX_f227421d2ef64ab086261ac07f\` ON \`room_subject\` (\`room_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_a05f10c497f5f7db3022664a6d\` ON \`room_subject\` (\`subject_id\`)`);
        await queryRunner.query(`ALTER TABLE \`room_subject\` ADD CONSTRAINT \`FK_f227421d2ef64ab086261ac07fd\` FOREIGN KEY (\`room_id\`) REFERENCES \`subjects\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`room_subject\` ADD CONSTRAINT \`FK_a05f10c497f5f7db3022664a6d6\` FOREIGN KEY (\`subject_id\`) REFERENCES \`rooms\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`room_subject\` DROP FOREIGN KEY \`FK_a05f10c497f5f7db3022664a6d6\``);
        await queryRunner.query(`ALTER TABLE \`room_subject\` DROP FOREIGN KEY \`FK_f227421d2ef64ab086261ac07fd\``);
        await queryRunner.query(`DROP INDEX \`IDX_a05f10c497f5f7db3022664a6d\` ON \`room_subject\``);
        await queryRunner.query(`DROP INDEX \`IDX_f227421d2ef64ab086261ac07f\` ON \`room_subject\``);
        await queryRunner.query(`ALTER TABLE \`subjects\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`subjects\` ADD \`name\` varchar(45) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`room_subject\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`room_subject\` ADD PRIMARY KEY (\`room_id\`)`);
        await queryRunner.query(`ALTER TABLE \`room_subject\` DROP COLUMN \`subject_id\``);
        await queryRunner.query(`ALTER TABLE \`room_subject\` DROP COLUMN \`room_id\``);
        await queryRunner.query(`ALTER TABLE \`room_subject\` ADD \`subjects_id\` int NOT NULL`);
    }

}
