import { Migration } from '@mikro-orm/migrations';

export class Migration20201206081724 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "meeting" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null);');
  }

}
