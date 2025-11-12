import pool from '../config/db.js';
import { faker } from '@faker-js/faker';

const seedDatabase = async () => {
	try {
		console.log('🌱 Seeding database with Faker...\n');

		// Clear existing data
		await pool.query('DELETE FROM vaccinations');
		await pool.query('DELETE FROM health_records');
		await pool.query('DELETE FROM babies');

		const NUM_BABIES = 20;
		const RECORDS_PER_BABY = 10;

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
		console.log(`Creating ${NUM_BABIES} babies...`);
		const babyIds = [];

		for (let i = 0; i < NUM_BABIES; i++) {
			const birthdate = faker.date.past({ years: 2, refDate: new Date('2024-12-31') });
			const gender = faker.helpers.arrayElement(['M', 'F']);
			const firstName = gender === 'M' ? faker.person.firstName('male') : faker.person.firstName('female');
			const lastName = faker.person.lastName();

			const result = await pool.query(
				`INSERT INTO babies (name, birthdate, gender) VALUES ($1, $2, $3) RETURNING id`,
				[`${firstName} ${lastName}`, birthdate.toISOString().split('T')[0], gender]
			);

			babyIds.push(result.rows[0].id);
		}
		console.log(`✓ Created ${NUM_BABIES} babies\n`);

		// ---------- HEALTH RECORDS ----------
		console.log(`Creating health records...`);
		let healthRecordCount = 0;

		for (const babyId of babyIds) {
			const babyResult = await pool.query('SELECT birthdate FROM babies WHERE id = $1', [babyId]);
			const birthdate = new Date(babyResult.rows[0].birthdate);

			for (let i = 0; i < RECORDS_PER_BABY; i++) {
				const recordDate = new Date(birthdate);
				recordDate.setMonth(recordDate.getMonth() + i); // Monthly records

				const weight = faker.number.float({ min: 3.0, max: 12.0, precision: 0.1 }); // kg
				const height = faker.number.float({ min: 48, max: 75, precision: 0.1 }); // cm
				const notes = faker.helpers.arrayElement([
				'Healthy checkup',
				'Good weight gain',
				'Normal development',
				'Minor cold',
				'Regular exam',
				'Growing well',
				'Feeding well',
				]);

				await pool.query(
				`INSERT INTO health_records (baby_id, date, weight, height, notes) 
				VALUES ($1, $2, $3, $4, $5)`,
				[babyId, recordDate.toISOString().split('T')[0], weight, height, notes]
				);

				healthRecordCount++;
			}
		}
		console.log(`✓ Created ${healthRecordCount} health records\n`);

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
                    `INSERT INTO vaccinations (baby_id, vaccine_name, due_date, completed_at, completed) 
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
		console.log(`  - Babies: ${NUM_BABIES}`);
		console.log(`  - Health Records: ${healthRecordCount}`);
		console.log(`  - Vaccinations: ${vaccinationCount}\n`);

		process.exit(0);
	} catch (error) {
		console.error('❌ Seeding failed:', error.message);
		process.exit(1);
	}
};

seedDatabase();