# TUID

TUID (Timestamp-based Unique ID) is a simple, efficient, and scalable package for generating **sortable, unique, and
unlimited timestamp-based unique identifiers (TUIDs)**. It offers functions for generating, validating, and parsing
TUIDs, all implemented with minimal dependencies and full TypeScript support.

## Features

- **Sortable**: TUIDs are generated in a way that ensures they are lexicographically sortable based on the timestamp.
- **Unlimited**: You can generate as many unique IDs as you need without worry about collisions.
- **Timestamp-based**: The IDs include a timestamp for easy chronological sorting.
- **Validation**: Check whether a string is a valid TUID and identify its version.
- **Parsing**: Decompose a TUID into its meaningful components, such as timestamp, machine ID, sequence number, and
  additional random strings.
- **TypeScript Support**: Fully typed to take advantage of TypeScript features.

## Installation

To install TUID, simply run:

```bash
npm install @badrddinb/tuid
```

or, using Yarn:

```bash
yarn add @badrddinb/tuid
```

## Usage

TUID is designed to be straightforward. Here's how to generate, validate, and parse TUIDs in your project:

### Generate a TUID

```typescript
import TUIDGenerator from 'tuid';

// Create a new generator for TUID v1 (current version)
const generator = new TUIDGenerator(1);

// Generate a TUID
const tuid = generator.generateV1();
console.log(tuid); // Outputs a unique, sortable TUID like "1697034958283-512-3-abc1-def2"
```

### Validate a TUID

You can validate if a string is a valid TUID and optionally check for the version.

```typescript
import TUIDGenerator from 'tuid';

// A valid TUID string
const tuid = '1697034958283-512-3-abc1-def2';

const isValid = TUIDGenerator.isValidTUID(tuid);
console.log(isValid); // true or false
```

### Parse a TUID

A TUID can be parsed into its individual components:

```typescript
import TUIDGenerator from 'tuid';

// A valid TUID string
const tuid = '1697034958283-512-3-abc1-def2';

const parsed = TUIDGenerator.parseTUID(tuid);

console.log(parsed);
/*
Outputs:
{
  "timestamp": 1697034958283,
  "machineId": 512,
  "sequence": 3,
  "randomString1": "abc1",
  "randomString2": "def2"
}
*/
```

### Get TUID Version

Determine the version of a given TUID (currently, only version 1 is supported):

```typescript
import TUIDGenerator from 'tuid';

const tuid = '1697034958283-512-3-abc1-def2';
const version = TUIDGenerator.getTUIDVersion(tuid);
console.log(version); // 'v1'
```

## API Reference

### `TUIDGenerator`

#### `constructor(machineId: number)`

- `machineId`: The ID of the machine generating the TUID. This must be a value between 0 and 1023.

#### `generateV1(): string`

Generates a new TUID v1, which is sortable, unique, and timestamp-based.

#### `static isValidTUID(tuid: string): boolean`

Checks if a given string is a valid TUID v1.

#### `static getTUIDVersion(tuid: string): 'v1' | 'unknown'`

Returns the version of the TUID if it's valid, otherwise returns `'unknown'`.

#### `static parseTUID(tuid: string): { timestamp: number, machineId: number, sequence: number, randomString1: string, randomString2: string } | null`

Parses a TUID into its components: timestamp, machine ID, sequence number, and two random strings.

## TypeScript

TUID is fully written in TypeScript and includes type declarations for seamless integration into TypeScript projects.
Here’s an example:

```typescript
import TUIDGenerator from 'tuid';

const generator: TUIDGenerator = new TUIDGenerator(1);
const tuid: string = generator.generateV1();
```

## TUID Type

If you wish to define a custom type for TUIDs:

```typescript
export type TUID = `${number}-${number}-${number}-${string}-${string}`;
```

This allows you to use the `TUID` type in your project:

```typescript
const id: TUID = generator.generateV1();
```

## Contributing

Feel free to contribute by opening issues, suggesting features, or submitting pull requests. For any contributions:

1. Fork the repository
2. Create a new branch (\`git checkout -b feature-branch\`)
3. Commit your changes (\`git commit -m 'Add new feature'\`)
4. Push to the branch (\`git push origin feature-branch\`)
5. Open a pull request

## License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC
4.0). [Learn more about the license here](https://creativecommons.org/licenses/by-nc/4.0/).

This means:

- You can use, modify, and distribute this code as long as it's for non-commercial purposes.
- Proper attribution is required.
- Commercial use of this package is not permitted.

## Acknowledgements

Inspired by common UUID and ULID libraries, with added support for sorting and parsing.
