import { Knex } from 'knex';

export async function up (knex: Knex): Promise<void> {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.boolean('admin').defaultTo(false);
        table.timestamp('delete_at');
    });
}

export async function down (knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}
