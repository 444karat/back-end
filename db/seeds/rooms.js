/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('rooms').del();
	await knex('rooms').insert([
		{author: 'test', description: '1'},
		{author: 'test', description: ''},
		{author: 'test', description: ''},
	]);
};
