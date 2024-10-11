/**
 * A type representing a TUID (Timestamp-based Unique Identifier).
 * The format is `${number}-${number}-${number}-${string}-${string}`,
 * which is essentially a combination of timestamp, machineId, sequence number, and two random strings.
 */
export type TUID = `${number}-${number}-${number}-${string}-${string}`;

/**
 * A class responsible for generating and validating TUIDs (Timestamp-based Unique Identifiers).
 * It ensures uniqueness through a combination of timestamp, machine ID, and a sequence number.
 */
class TUIDGenerator {
    /**
     * The sequence number is used to differentiate TUIDs generated in the same millisecond.
     * It resets after reaching 4095 (12-bit limit).
     */
    private sequence: number = 0;

    /**
     * The last timestamp recorded during TUID generation.
     * This helps ensure that TUIDs generated in subsequent calls are unique and sorted.
     */
    private lastTimestamp: number = -1;

    /**
     * The unique ID of the machine generating the TUID. It must be between 0 and 1023 (10-bit value).
     */
    private readonly machineId: number;

    /**
     * Constructor for TUIDGenerator.
     *
     * @param machineId - A unique machine identifier (between 0 and 1023) to ensure uniqueness across machines.
     * @throws {Error} Throws an error if the machineId is not within the range 0-1023.
     */
    constructor(machineId: number) {
        if (machineId < 0 || machineId > 1023) {
            throw new Error('Machine ID must be between 0 and 1023.');
        }
        this.machineId = machineId;
    }

    /**
     * Validates whether a given string is a valid TUID v1.
     *
     * @param tuid - The TUID string to be validated.
     * @returns True if the string is a valid TUID v1, false otherwise.
     */
    public static isValidTUID(tuid: string): boolean {
        const v1Pattern = /^\d{13}-\d{1,4}-\d{1,4}-[a-z0-9]{4}-[a-z0-9]{4}$/;
        return v1Pattern.test(tuid);
    }

    /**
     * Determines the version of the given TUID.
     * Currently, only TUID v1 is supported.
     *
     * @param tuid - The TUID string whose version is to be determined.
     * @returns 'v1' if the TUID is valid and conforms to version 1, 'unknown' otherwise.
     */
    public static getTUIDVersion(tuid: string): 'v1' | 'unknown' {
        return TUIDGenerator.isValidTUID(tuid) ? 'v1' : 'unknown';
    }

    /**
     * Parses a valid TUID into its components: timestamp, machineId, sequence, and two random string segments.
     *
     * @param tuid - The TUID string to be parsed.
     * @returns An object containing the parsed components if the TUID is valid, or null if invalid.
     */
    public static parseTUID(tuid: TUID): {
        timestamp: number,
        machineId: number,
        sequence: number,
        randomString1: string,
        randomString2: string
    } | null {
        if (!TUIDGenerator.isValidTUID(tuid)) {
            return null;
        }

        const [timestampStr, machineIdStr, sequenceStr, randomString1, randomString2] = tuid.split('-');
        return {
            timestamp: parseInt(timestampStr, 10),
            machineId: parseInt(machineIdStr, 10),
            sequence: parseInt(sequenceStr, 10),
            randomString1,
            randomString2,
        };
    }

    /**
     * Generates a TUID v1, which is a combination of the current timestamp, machineId, sequence number,
     * and two randomly generated string segments.
     *
     * @returns A TUID v1 as a string, which conforms to the TUID type format.
     */
    public generateV1(): TUID {
        let timestamp = this.currentTimestamp();

        if (timestamp === this.lastTimestamp) {
            this.sequence = (this.sequence + 1) & 4095; // 12-bit sequence, wraps around after 4095
            if (this.sequence === 0) {
                // If sequence overflows, wait for the next millisecond to ensure uniqueness
                while (timestamp <= this.lastTimestamp) {
                    timestamp = this.currentTimestamp();
                }
            }
        } else {
            this.sequence = 0; // Reset the sequence for new timestamp
        }

        this.lastTimestamp = timestamp;

        // Generate two random string segments to match the TUID pattern
        const randomString1 = Math.random().toString(36).substring(2, 6);
        const randomString2 = Math.random().toString(36).substring(2, 6);

        return `${timestamp}-${this.machineId}-${this.sequence}-${randomString1}-${randomString2}` as TUID;
    }

    /**
     * Returns the current timestamp in milliseconds since the Unix epoch.
     *
     * @returns The current timestamp as a number.
     */
    private currentTimestamp(): number {
        return Date.now();
    }
}

export default TUIDGenerator;
