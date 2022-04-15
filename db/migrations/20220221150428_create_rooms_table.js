/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema
		.createTable('rooms', table => {
			table.increments('roomId').primary();
			table.string('author').notNullable();
			table.string('description');

			table.foreign('author').references('login').inTable('users');
		})
		.catch(error => {
			console.error(error);
		});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema
		.dropTable('rooms')
		.catch(error => {
			console.error(error);
		});
};
