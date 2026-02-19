/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
	pgm.createTable('babies', {
		id: 'id',
		name: { type: 'varchar(100)', notNull: true },
		birthdate: { type: 'date', notNull: true },
		gender: { type: 'char(1)', check: "gender IN ('M', 'F', 'O')", notNull: true },
		createdAt: {
			type: 'timestamp',
			notNull: true,
			default: pgm.func('current_timestamp'),
		},
	});

	pgm.createTable('health_records', {
		id: 'id',
		baby_id: {
			type: 'integer',
			notNull: true,
			references: '"babies"(id)',
			onDelete: 'CASCADE',
		},
		date: { type: 'date', notNull: true },
		weight: { type: 'numeric', comment: 'weight in kg' },
		height: { type: 'numeric', comment: 'height in cm' },
		notes: { type: 'text' },
		createdAt: {
			type: 'timestamp',
			notNull: true,
			default: pgm.func('current_timestamp'),
		},
	});

	pgm.createTable('vaccinations', {
		id: 'id',
		baby_id: {
			type: 'integer',
			notNull: true,
			references: '"babies"(id)',
			onDelete: 'CASCADE',
		},
		name: { type: 'varchar(255)', notNull: true },
		due_date: { type: 'date' },
		completed_at: { type: 'date' },
		completed: { type: 'boolean', default: false  },
		createdAt: {
			type: 'timestamp',
			notNull: true,
			default: pgm.func('current_timestamp'),
		},
	});

	// Add indexes for better query performance
    pgm.createIndex('health_records', 'baby_id');
    pgm.createIndex('vaccinations', 'baby_id');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};