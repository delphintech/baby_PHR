import pool from './db.js';
import fs from 'fs';
import { faker } from '@faker-js/faker';
import { parse } from 'csv-parse/sync';

const seedDatabase = async () => {
	try {
		console.log('🌱 Seeding database with Faker...\n');

		// Clear existing data
		await pool.query('DELETE FROM vaccinations');
		await pool.query('DELETE FROM health_records');
		await pool.query('DELETE FROM babies');

		// Ten Babies
		const babies = [
			{ name: "Olivia Bennett", gender: "F", birthdate: "2023-03-15" },
			{ name: "Liam Carter", gender: "M", birthdate: "2022-05-05" },
			{ name: "Ava Thompson", gender: "F", birthdate: "2024-03-20" },
			{ name: "Noah Ramirez", gender: "M", birthdate: "2022-02-10" },
			{ name: "Sophia Martinez", gender: "F", birthdate: "2023-11-15" },
			{ name: "Ethan Kelly", gender: "M", birthdate: "2022-12-20" },
			{ name: "Mia Anderson", gender: "F", birthdate: "2021-10-10" },
			{ name: "Lucas Wright", gender: "M", birthdate: "2024-07-10" },
			{ name: "Isabella Hughes", gender: "F", birthdate: "2023-06-10" },
			{ name: "Benjamin Scott", gender: "M", birthdate: "2022-09-10" }
		]

		// Standard baby vaccines
		const vaccines = [
			{	name: 'RSV', dueMonth: 0 },
			{	name: 'Hepatitis B', dueMonth: 0 },
			{	name: '2nd Hepatitis B', dueMonth: 2 },
			{	name: 'Rotavirus', dueMonth: 2 },
			{	name: 'Pneumococcal', dueMonth: 2 },
			{	name: 'Polio', dueMonth: 2 },
			{	name: '2nd Rotavirus', dueMonth: 4 },
			{	name: '2nd Pneumococcal', dueMonth: 4 },
			{	name: '2nd Polio', dueMonth: 4 },
			{	name: '3rd Hepatitis B', dueMonth: 6 },
			{	name: '3rd Rotavirus', dueMonth: 6 },
			{	name: '3rd Pneumococcal', dueMonth: 6 },
			{	name: '3rd Polio', dueMonth: 6 },
			{	name: 'MMR', dueMonth: 12 },
			{	name: 'Varicella', dueMonth: 15 }
		]

		// ---------- BABIES ----------
		console.log(`Creating ${babies.length} babies...`);
		const babyIds = [];

		for (const baby of babies) {
			const result = await pool.query(
				`INSERT INTO babies (name, birthdate, gender) VALUES ($1, $2, $3) RETURNING id`,
				[baby.name, baby.birthdate, baby.gender]
			);

			babyIds.push(result.rows[0].id);
		}
		console.log(`✓ Created ${babies.length} babies\n`);

		// ---------- HEALTH RECORDS ----------
		console.log(`Creating health records...`);

		const csvFile = './_config/baby_health_records.csv';
		const csvContent = fs.readFileSync(csvFile, 'utf-8');
			const records = parse(csvContent, {
				columns: true,
				skip_empty_lines: true,
				trim: true,
			});

		let healthRecordCount = 0;

		for (const row of records) {
			const name = row['full name'];
			// Find baby by name
			const babyRes = await pool.query('SELECT id FROM babies WHERE name = $1', [name]);
			if (babyRes.rows.length === 0) {
				console.warn(`⚠️ Baby not found: ${name}, skipping record.`);
				continue;
			}
			const baby_id = babyRes.rows[0].id;

			// Insert health record
			await pool.query(
				`INSERT INTO health_records (baby_id, date, height, weight, notes) VALUES ($1, $2, $3, $4, $5)`,
				[
				baby_id,
				row.date,
				parseFloat(row.height),
				parseFloat(row.weight),
				row.notes
				]
			);
			healthRecordCount++;
		}
		console.log(`✓ Inserted ${healthRecordCount} health records from CSV\n`);

		// ---------- VACCINATION ----------
		console.log(`Creating vaccination records...`);
		let vaccinationCount = 0;

		for (const babyId of babyIds) {
			const babyResult = await pool.query('SELECT birthdate FROM babies WHERE id = $1', [babyId]);
			const birthdate = new Date(babyResult.rows[0].birthdate);
			const today = new Date();

			for (const vaccine of vaccines) {
				// Calculate due date (X months after birth)
				const dueDate = new Date(birthdate);
				dueDate.setMonth(dueDate.getMonth() + vaccine.dueMonth);

				// Determine completion status based on time elapsed
				let isCompleted = false;
				let completedAt = null;

				if (today >= dueDate) { // Due date has passed
					const twoWeeksAfterDue = new Date(dueDate);
					twoWeeksAfterDue.setDate(twoWeeksAfterDue.getDate() + 14);

					const twoMonthsAfterDue = new Date(dueDate);
					twoMonthsAfterDue.setMonth(twoMonthsAfterDue.getMonth() + 2);

					if (today >= twoWeeksAfterDue) {
						// More than 2 weeks after due date: 70% completion rate
						if (faker.datatype.boolean({ probability: 0.7 })) {
							isCompleted = true;
							// Completed between 2 weeks and 2 months after due date
							const daysAfterDue = faker.number.int({ min: 14, max: 60 });
							completedAt = new Date(dueDate);
							completedAt.setDate(completedAt.getDate() + daysAfterDue);
						}
					} else if (today >= dueDate) {
						// Less than 2 weeks after due date: 80-95% completion rate
						const completionRate = faker.number.float({ min: 0.8, max: 0.95 });
						if (faker.datatype.boolean({ probability: completionRate })) {
							isCompleted = true;
							// Completed within 2 weeks after due date
							const daysAfterDue = faker.number.int({ min: 0, max: 14 });
							completedAt = new Date(dueDate);
							completedAt.setDate(completedAt.getDate() + daysAfterDue);
						}
					}
				}

                await pool.query(
                    `INSERT INTO vaccinations (baby_id, name, due_date, completed_at, completed) 
                    VALUES ($1, $2, $3, $4, $5)`,
                    [
                        babyId,
                        vaccine.name,
                        dueDate.toISOString().split('T')[0],
                        completedAt ? completedAt.toISOString().split('T')[0] : null,
                        isCompleted,
                    ]
                );
				vaccinationCount++;
			}
		}
		console.log(`✓ Created ${vaccinationCount} vaccination records\n`);

		console.log('✅ Database seeding complete!\n');
		console.log('Summary:');
		console.log(`  - Babies: ${babies.length}`);
		console.log(`  - Health Records: ${healthRecordCount}`);
		console.log(`  - Vaccinations: ${vaccinationCount}\n`);

		process.exit(0);
	} catch (error) {
		console.error('❌ Seeding failed:', error.message);
		process.exit(1);
	}
};

seedDatabase();