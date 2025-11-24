import { jest } from '@jest/globals';

// Mock the DB pool before importing the SUT
const mockPool = { query: jest.fn() };
jest.unstable_mockModule('../config/db.js', () => ({ default: mockPool }));

// Import after mocks
const { default: Baby } = await import('../models/Baby.js');
const { default: pool } = await import('../config/db.js');

describe('Baby Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllBaby', () => {
    it('should return all babies', async () => {
      const mockBabies = [
        { id: 1, name: 'Emma', birthdate: '2024-01-15', gender: 'F' },
        { id: 2, name: 'Liam', birthdate: '2023-06-22', gender: 'M' },
      ];
      pool.query.mockResolvedValue({ rows: mockBabies });

      const result = await Baby.getAllBaby();

      expect(result).toEqual(mockBabies);
      expect(pool.query).toHaveBeenCalledWith('SELECT * FROM babies');
    });

    it('should throw error on database failure', async () => {
      pool.query.mockRejectedValue(new Error('Database connection failed'));
      await expect(Baby.getAllBaby()).rejects.toThrow('Database connection failed');
    });
  });

  describe('getBabybyId', () => {
    it('should return a single baby by id', async () => {
      const mockBaby = { id: 1, name: 'Emma', birthdate: '2024-01-15', gender: 'F' };
      pool.query.mockResolvedValue({ rows: [mockBaby] });

      const result = await Baby.getBabybyId(1);

      expect(result).toEqual(mockBaby);
      expect(pool.query).toHaveBeenCalledWith('SELECT * FROM babies WHERE id = $1', [1]);
    });

    it('should return undefined if baby not found', async () => {
      pool.query.mockResolvedValue({ rows: [] });
      const result = await Baby.getBabybyId(999);
      expect(result).toBeUndefined();
    });

    it('should throw error on database failure', async () => {
      pool.query.mockRejectedValue(new Error('Database error'));
      await expect(Baby.getBabybyId(1)).rejects.toThrow('Database error');
    });
  });

  describe('createBaby', () => {
    it('should create a new baby with valid data', async () => {
      const newBaby = { id: 3, name: 'Sophia', birthdate: '2024-03-10', gender: 'F' };
      pool.query.mockResolvedValue({ rows: [newBaby] });

      const result = await Baby.createBaby('Sophia', '2024-03-10', 'F');

      expect(result).toEqual(newBaby);
    });

    it('should throw error for invalid gender', async () => {
      await expect(Baby.createBaby('Test', '2024-01-01', 'X')).rejects.toThrow(
        /Gender must be 'M', 'F'.*'O'/
      );
    });

    it('should throw error if missing fields', async () => {
      await expect(Baby.createBaby(null, '2024-01-01', 'M')).rejects.toThrow(
        'name, birthdate and gender must not be null'
      );
    });

    it('should throw error on database failure', async () => {
      pool.query.mockRejectedValue(new Error('Database error'));
      await expect(Baby.createBaby('Test', '2024-01-01', 'M')).rejects.toThrow('Database error');
    });
  });

  // describe('updateBaby', () => {
  //   it('should update a baby', async () => {
  //     const updatedBaby = { id: 1, name: 'Emma Updated', birthdate: '2024-01-20', gender: 'F' };
  //     pool.query.mockResolvedValue({ rows: [updatedBaby] });

  //     const result = await Baby.updateBaby(1, 'Emma Updated', '2024-01-20', 'F');

  //     expect(result).toEqual(updatedBaby);
  //   });

  //   it('should throw error for invalid gender on update', async () => {
  //     await expect(Baby.updateBaby(1, 'Emma', '2024-01-15', 'Z')).rejects.toThrow(
  //       /Gender must be 'M', 'F'.*'O'/
  //     );
  //   });
  // });

  describe('deleteBaby', () => {
    it('should delete a baby', async () => {
      pool.query.mockResolvedValue({});
      const result = await Baby.deleteBaby(1);
      expect(result).toBe(true);
      expect(pool.query).toHaveBeenCalledWith('DELETE FROM babies WHERE id = $1', [1]);
    });

    it('should throw error on database failure', async () => {
      pool.query.mockRejectedValue(new Error('Database error'));
      await expect(Baby.deleteBaby(1)).rejects.toThrow('Database error');
    });
  });
});