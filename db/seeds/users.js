/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('users').del();
	await knex('users').insert([
		{login: 'test', password: '5d7a514b5d2c12c7449be046'},
		{login: 'test', password: '5c8a1d5b0190b214360dc031'},
		{login: 'test', password: '5c8a1d5b0190b214360dc032'},
	]);
};
