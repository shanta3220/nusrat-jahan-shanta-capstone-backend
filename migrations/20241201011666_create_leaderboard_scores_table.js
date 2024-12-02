/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("leaderboard_scores", (table) => {
    table.increments("id").primary();
    table
      .integer("game_id")
      .unsigned()
      .references("id")
      .inTable("games")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.integer("user_id").unsigned().references("id").inTable("users");
    table.integer("score").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("leaderboard_scores");
}
