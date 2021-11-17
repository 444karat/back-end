var pg = require('pg');

var conString = process.env.postgresUrl;
var client = new pg.Client(conString);

module.exports = {
    query:  (text, params) => {
        client
            .query(text, params)
            .catch(err => console.error('query error', err.stack))
            .then(() =>
                client
                    .end()
                    .then(() => console.log("disconnect")));
    },
    up:async (knex) => {
        return await knex.schema
            .createTable('employees', table => {
                table.string('name', 100).notNullable();
                table.integer('position').unsigned().notNullable();
                table.decimal('pay').unsigned().notNullable();
                table.bigInteger('data').notNullable();
            })
            .catch(error => {
                console.error(error);
            });
    },
    getClient: () => {
        client
            .connect()
            .then(() => console.log('connected'))
            .catch(err => console.error('connection error', err.stack))
    },
    down:async (knex) => {
        return  await knex.schema
            .dropTable('employees')
            .catch(error => {
                console.error(error);
            });
    },
}


