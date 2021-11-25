import { MigrationInterface, QueryRunner } from 'typeorm';

export class initTable1637818442599 implements MigrationInterface {
  name = 'initTable1637818442599';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "notification_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "transaction_id" uuid NOT NULL, "status" boolean NOT NULL, "error_message" character varying(255) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_6545aa93bf82b139b8cea3cfe4d" PRIMARY KEY ("id", "transaction_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "merchant_id" uuid NOT NULL, "partner_trx_id" uuid NOT NULL, "status" character varying(20), "amount" double precision, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_cf49f33eaae960bf532d72ad324" PRIMARY KEY ("id", "merchant_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "merchants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "callback_url" character varying(255) NOT NULL, "api_key" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_4fd312ef25f8e05ad47bfe7ed25" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification_logs" ADD CONSTRAINT "FK_fce246d1bf9cde17328bec7d480" FOREIGN KEY ("transaction_id", "transaction_id") REFERENCES "transactions"("id","merchant_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_e80829a78860eadca0d60c8e21f" FOREIGN KEY ("merchant_id") REFERENCES "merchants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_e80829a78860eadca0d60c8e21f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification_logs" DROP CONSTRAINT "FK_fce246d1bf9cde17328bec7d480"`,
    );
    await queryRunner.query(`DROP TABLE "merchants"`);
    await queryRunner.query(`DROP TABLE "transactions"`);
    await queryRunner.query(`DROP TABLE "notification_logs"`);
  }
}
