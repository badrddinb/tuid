export default {
    preset: 'ts-jest',
    testEnvironment: 'node', // or 'jsdom' if you're testing front-end code
    transform: {
        '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files
    },
    testMatch: ['**/*.test.ts', '**/*.spec.ts'], // Specify test file patterns
};
