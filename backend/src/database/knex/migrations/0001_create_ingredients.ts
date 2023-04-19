import { Knex } from "knex";

import { ETableNames } from "../../ETableNames";

export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.ingredients, table => {
            table.uuid("uuid").primary().index().notNullable();
            table.string("description").index().notNullable();
            table.string("unit").notNullable();
            table.decimal("valuePerUnit").notNullable().unique();
            table.date("createdAt").notNullable();
            table.date("updatedAt").notNullable();
            table.boolean("deleted").notNullable();

            table.comment("Table used to store system ingredients");
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.ingredients}`);
        });
}

export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.ingredients)
        .then(() => {
            console.log(`# Dropped table ${ETableNames.ingredients}`);
        });
}