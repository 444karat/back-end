/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema
		.createTable('users', table => {
			table.increments('userId').primary();
			table.string('login').notNullable().unique();
			table.string('password').notNullable();
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
		.dropTable('users')
		.catch(error => {
			console.error(error);
		});
};
