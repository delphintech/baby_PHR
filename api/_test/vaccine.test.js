import { jest } from '@jest/globals';

const mockPool = { query: jest.fn() };
jest.unstable_mockModule('../config/db.js', () => ({ default: mockPool }));

const { default: Vaccine } = await import('../models/Vaccine.js');
const { default: pool } = await import('../config/db.js');

describe('Vaccine Model', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllVaccines', () => {
        it('should return all vaccines', async () => {
            const mockVaccines = [
                { id: 1, baby_id: 1, name: 'RSV', due_date: '2024-01-15', completed: false, completed_at: null },
                { id: 2, baby_id: 1, name: 'Hepatitis B', due_date: '2024-01-15', completed: true, completed_at: '2024-01-15' },
                { id: 3, baby_id: 2, name: 'MMR', due_date: '2024-06-22', completed: false, completed_at: null }
            ];
            pool.query.mockResolvedValue({ rows: mockVaccines });

            const result = await Vaccine.getAllVaccines();

            expect(result).toEqual(mockVaccines);
            expect(pool.query).toHaveBeenCalledWith('SELECT * FROM vaccinations');
        });

        it('should return empty array if no vaccines exist', async () => {
            pool.query.mockResolvedValue({ rows: [] });

            const result = await Vaccine.getAllVaccines();

            expect(result).toEqual([]);
        });

        it('should throw on DB error', async () => {
            pool.query.mockRejectedValue(new Error('DB connection failed'));
            await expect(Vaccine.getAllVaccines()).rejects.toThrow('DB connection failed');
        });
    });

    describe('getBabyVaccines', () => {
        it('should return vaccines for a specific baby ordered by due_date', async () => {
            const babyId = 1;
            const mockVaccines = [
                { id: 1, baby_id: 1, name: 'RSV', due_date: '2024-01-15', completed: false, completed_at: null },
                { id: 2, baby_id: 1, name: 'Hepatitis B', due_date: '2024-03-15', completed: true, completed_at: '2024-03-15' },
                { id: 3, baby_id: 1, name: 'Rotavirus', due_date: '2024-03-15', completed: false, completed_at: null }
            ];
            pool.query.mockResolvedValue({ rows: mockVaccines });

            const result = await Vaccine.getBabyVaccines(babyId);

            expect(result).toEqual(mockVaccines);
            expect(pool.query).toHaveBeenCalledWith(
                'SELECT * FROM vaccinations WHERE baby_id = $1 ORDER BY due_date ASC',
                [babyId]
            );
        });

        it('should return empty array if baby has no vaccines', async () => {
            pool.query.mockResolvedValue({ rows: [] });

            const result = await Vaccine.getBabyVaccines(999);

            expect(result).toEqual([]);
        });

        it('should throw on DB error', async () => {
            pool.query.mockRejectedValue(new Error('Query failed'));
            await expect(Vaccine.getBabyVaccines(1)).rejects.toThrow('Query failed');
        });
    });

    describe('updateVaccine', () => {
        it('should update vaccine completion status', async () => {
            const mockUpdated = { id: 1, baby_id: 1, name: 'RSV', due_date: '2024-01-15', completed: true, completed_at: '2024-01-15' };
            pool.query.mockResolvedValue({ rows: [mockUpdated] });

            const result = await Vaccine.updateVaccine(1, true, '2024-01-15');

            expect(result).toEqual(mockUpdated);
            expect(pool.query).toHaveBeenCalledWith(
                'UPDATE vaccinations SET completed = $1, completed_at = $2 WHERE id = $3',
                [true, '2024-01-15', 1]
            );
        });

        it('should mark vaccine as incomplete', async () => {
            const mockUpdated = { id: 1, baby_id: 1, name: 'RSV', due_date: '2024-01-15', completed: false, completed_at: null };
            pool.query.mockResolvedValue({ rows: [mockUpdated] });

            const result = await Vaccine.updateVaccine(1, false, null);

            expect(result.completed).toBe(false);
            expect(result.completed_at).toBe(null);
        });

        it('should throw on DB error', async () => {
            pool.query.mockRejectedValue(new Error('Update failed'));
            await expect(Vaccine.updateVaccine(1, true, '2024-01-15')).rejects.toThrow('Update failed');
        });

        it('should handle non-existent vaccine', async () => {
            pool.query.mockResolvedValue({ rows: [] });

            const result = await Vaccine.updateVaccine(999, true, '2024-01-15');

            expect(result).toBeUndefined();
        });
    });

    describe('createVaccine', () => {
        it('should create a vaccine with valid data', async () => {
            const mockVaccine = { id: 1, baby_id: 1, name: 'RSV', due_date: '2024-01-15', completed: false, completed_at: null };
            pool.query.mockResolvedValue({ rows: [mockVaccine] });

            const result = await Vaccine.createVaccine(1, 'RSV', '2024-01-15', false, null);

            expect(result).toEqual(mockVaccine);
            expect(pool.query).toHaveBeenCalledWith(
                expect.stringContaining('INSERT INTO vaccinations'),
                [1, 'RSV', '2024-01-15', false, null]
            );
        });

        it('should use provided client if passed', async () => {
            const mockClient = { query: jest.fn() };
            const mockVaccine = { id: 1, baby_id: 1, name: 'Hepatitis B', due_date: '2024-03-15', completed: false, completed_at: null };
            mockClient.query.mockResolvedValue({ rows: [mockVaccine] });

            const result = await Vaccine.createVaccine(1, 'Hepatitis B', '2024-03-15', false, null, mockClient);

            expect(result).toEqual(mockVaccine);
            expect(mockClient.query).toHaveBeenCalled();
            expect(pool.query).not.toHaveBeenCalled();
        });

        it('should create vaccine with completion data', async () => {
            const mockVaccine = { id: 1, baby_id: 1, name: 'MMR', due_date: '2024-12-15', completed: true, completed_at: '2024-12-15' };
            pool.query.mockResolvedValue({ rows: [mockVaccine] });

            const result = await Vaccine.createVaccine(1, 'MMR', '2024-12-15', true, '2024-12-15');

            expect(result.completed).toBe(true);
            expect(result.completed_at).toBe('2024-12-15');
        });

        it('should throw on DB error', async () => {
            pool.query.mockRejectedValue(new Error('Insert failed'));
            await expect(Vaccine.createVaccine(1, 'RSV', '2024-01-15', false, null)).rejects.toThrow('Insert failed');
        });

        it('should throw if baby_id is invalid', async () => {
            pool.query.mockRejectedValue(new Error('Foreign key constraint violation'));
            await expect(Vaccine.createVaccine(999, 'RSV', '2024-01-15', false, null)).rejects.toThrow();
        });
    });
});