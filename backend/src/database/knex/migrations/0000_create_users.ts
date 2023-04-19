import { Knex } from "knex";

import { ETableNames } from "../../ETableNames";

export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.users, table => {
            table.uuid("uuid").primary().index();
            table.string("name").index().notNullable();
            table.string("password").notNullable();
            table.string("email").notNullable().unique();
            table.date("signupDate").notNullable();
            table.date("lastLogin").notNullable();

            table.comment("Table used to store system users");
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.users}`);
        });
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.users)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.users}`);
        });
}