import TUIDGenerator from '../src/index';

describe('TUIDGenerator', () => {
    it('should generate a valid TUID v1', () => {
        const generator = new TUIDGenerator(1);
        const tuid = generator.generateV1();
        // Updated regex to match the complete TUID format
        expect(tuid).toMatch(/^\d{13}-\d{1,4}-\d{1,4}-[a-z0-9]{4}-[a-z0-9]{4}$/);
    });

    it('should validate TUID v1', () => {
        const validTUID = '1609459200000-1-0-abcd-efgh'; // Example valid TUID
        const invalidTUID = 'invalid-tuid';
        expect(TUIDGenerator.isValidTUID(validTUID)).toBe(true);
        expect(TUIDGenerator.isValidTUID(invalidTUID)).toBe(false);
    });

    it('should return version of TUID', () => {
        const validTUID = '1609459200000-1-0-abcd-efgh'; // Example valid TUID
        expect(TUIDGenerator.getTUIDVersion(validTUID)).toBe('v1');
        const invalidTUID = 'invalid-tuid';
        expect(TUIDGenerator.getTUIDVersion(invalidTUID)).toBe('unknown');
    });

    it('should parse TUID v1', () => {
        const tuid = '1609459200000-1-0-abcd-efgh'; // Example valid TUID
        const parsed = TUIDGenerator.parseTUID(tuid);
        expect(parsed).toEqual({
            timestamp: 1609459200000,
            machineId: 1,
            sequence: 0,
            randomString1: 'abcd',
            randomString2: 'efgh'
        });
    });

    it('should return null for invalid TUID parse', () => {
        const parsed = TUIDGenerator.parseTUID('0-0-0-invalid-tuid');
        expect(parsed).toBeNull();
    });
});