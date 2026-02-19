import { jest } from '@jest/globals';

// Mock the DB pool before importing the SUT
const mockPool = { query: jest.fn() };
jest.unstable_mockModule('../config/db.js', () => ({ default: mockPool }));

// Import after mocks
const { default: Record } = await import('../models/Record.js');
const { default: pool } = await import('../config/db.js');

describe('Record Model', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllRecords', () => {
      it('should return all records', async () => {
        const mockRecords = [
          { id: 1, baby_id: 1, date: '2024-01-15', weight: 4.5, height: 58, notes: "Healthy newborn" },
          { id: 2, baby_id: 2, date: '2023-06-22', weight: 6.7, height: 65 },
        ];
        pool.query.mockResolvedValue({ rows: mockRecords });

        const result = await Record.getAllRecords();

        expect(result).toEqual(mockRecords);
        expect(pool.query).toHaveBeenCalledWith('SELECT * FROM health_records');
      });
    
      it('should throw on DB error', async () => {
        pool.query.mockRejectedValue(new Error('DB error'));
        await expect(Record.getAllRecords()).rejects.toThrow('DB error');
      });
  });

  describe('getBabyRecords', () => {
    it('should return all records from a specific baby', async () => {
      const mockRecords = [
        { id: 1, baby_id: 1, date: '2024-01-15', weight: 4.5, height: 58, notes: "Healthy newborn" },
        { id: 2, baby_id: 1, date: '2023-06-22', weight: 6.7, height: 65 },
      ];
      pool.query.mockResolvedValue({ rows: mockRecords });

      const result = await Record.getBabyRecords(1);
      expect(result).toEqual(mockRecords);
      expect(pool.query).toHaveBeenCalledWith(
        'SELECT * FROM health_records WHERE baby_id = $1 ORDER BY date DESC', [1]
      )
    })

    it('should return empty array if baby not found', async () => {
      pool.query.mockResolvedValue({ rows: [] });
      const result = await Record.getBabyRecords(999);
      expect(result).toEqual([]);
    });
  });

  describe('createRecord', () => {
      it('should create a record with valid data', async () => {
          const mockRecord = { id: 1, baby_id: 1, date: '2024-03-01', weight: 3.8, height: 52, notes: 'Healthy' };
          pool.query.mockResolvedValue({ rows: [mockRecord] });

          const result = await Record.createRecord(1, '2024-03-01', 3.8, 52, 'Healthy');

          expect(result).toEqual(mockRecord);
      });
});

  describe('deleteRecord', () => {
    it('should delete a record by id', async () => {
      pool.query.mockResolvedValue({ rowCount: 1 });

      await Record.deleteRecord(1);

      expect(pool.query).toHaveBeenCalledWith('DELETE FROM health_records WHERE id = $1', [1]);
    });
  });

  describe('getBabyHeights', () => {
    it('should return heights for a baby', async () => {
      const mockHeights = [
        { id: 1, height: 50, date: '2024-01-15' },
        { id: 2, height: 52, date: '2024-02-15' }
      ];
      pool.query.mockResolvedValue({ rows: mockHeights });

      const result = await Record.getBabyHeights(1);

      expect(result).toEqual(mockHeights);
    });
  });

  describe('getBabyWeights', () => {
    it('should return weights for a baby', async () => {
      const mockWeights = [
        { id: 1, weight: 3.5, date: '2024-01-15' },
        { id: 2, weight: 3.9, date: '2024-02-15' }
      ];
      pool.query.mockResolvedValue({ rows: mockWeights });

      const result = await Record.getBabyWeights(1);

      expect(result).toEqual(mockWeights);
    });
  });

  describe('getBabyAvgHeightGain', () => {
    it('should return average monthly height gain', async () => {
      const mockGain = { avg_monthly_gain: 1.23 };
      pool.query.mockResolvedValue({ rows: [mockGain] });

      const result = await Record.getBabyAvgHeightGain(1);

      expect(result).toEqual(mockGain);
      expect(result.avg_monthly_gain).toBe(1.23);
    });

    it('should return 0 if no data', async () => {
      pool.query.mockResolvedValue({ rows: [{ avg_monthly_gain: 0 }] });

      const result = await Record.getBabyAvgHeightGain(1);

      expect(result.avg_monthly_gain).toBe(0);
    });
  });

  describe('getBabyAvgWeightGain', () => {
    it('should return average monthly weight gain', async () => {
      const mockGain = { avg_monthly_gain: 0.45 };
      pool.query.mockResolvedValue({ rows: [mockGain] });

      const result = await Record.getBabyAvgWeightGain(1);

      expect(result).toEqual(mockGain);
    });
  
    it('should return 0 if no data', async () => {
      pool.query.mockResolvedValue({ rows: [{ avg_monthly_gain: 0 }] });
  
      const result = await Record.getBabyAvgWeightGain(1);
  
      expect(result.avg_monthly_gain).toBe(0);
    });
  });
});



