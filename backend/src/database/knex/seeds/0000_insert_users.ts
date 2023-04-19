import { Knex } from "knex";
import { ETableNames } from "../../ETableNames";
import { v4 as uuidv4 } from "uuid";

export const seed = async (knex: Knex) => {
    const [{ count }] = await knex(ETableNames.users).count<[{ count: number }]>("* as count");

    //If table has data, don't run seed
    if (!Number.isInteger(count) || Number(count) > 0) return;

    await knex(ETableNames.users).insert(data);
};

const data = [{
    "uuid": uuidv4(),
    "name": "Weider",
    "password": "SlLYQVuTBF",
    "email": "wburnyeat0@senate.gov",
    "signupDate": new Date().toISOString(),
    "lastLogin": new Date().toISOString()
}, {
    "uuid": uuidv4(),
    "name": "Felicity",
    "password": "J50VcgoP3",
    "email": "fcabrara1@php.net",
    "signupDate": new Date().toISOString(),
    "lastLogin": new Date().toISOString()
}, {
    "uuid": uuidv4(),
    "name": "Derrek",
    "password": "GFBkragsJF",
    "email": "dblum2@moonfruit.com",
    "signupDate": new Date().toISOString(),
    "lastLogin": new Date().toISOString()
}, {
    "uuid": uuidv4(),
    "name": "Carter",
    "password": "hsOSpisp6p",
    "email": "cwickey3@amazonaws.com",
    "signupDate": new Date().toISOString(),
    "lastLogin": new Date().toISOString()
}, {
    "uuid": uuidv4(),
    "name": "Granthem",
    "password": "3xWA3F1jHp56",
    "email": "gkettlesing4@ft.com",
    "signupDate": new Date().toISOString(),
    "lastLogin": new Date().toISOString()
}];