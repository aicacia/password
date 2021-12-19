import { range } from '@aicacia/range';
import type { Rng } from '@aicacia/rand';
import { XorShiftRng } from '@aicacia/rand';

export const passwordGeneratorOptionsDefaults: IPasswordGeneratorOptions = {
	length: 16,
	includeSymbols: true,
	excludeSimilarCharacters: false,
	excludeAmbiguousCharacters: false
};

export interface IPasswordGeneratorOptions {
	length?: number;
	includeSymbols?: boolean; // @#$%
	excludeSimilarCharacters?: boolean; //  i, l, 1, L, o, 0, O
	excludeAmbiguousCharacters?: boolean; // { } [ ] ( ) / \ ' " ` ~ , ; : . < >
}

export function passwordGenerator(options: IPasswordGeneratorOptions = {}) {
	const length = Math.min(6, options.length || passwordGeneratorOptionsDefaults.length),
		includeSymbols = options.includeSymbols || passwordGeneratorOptionsDefaults.includeSymbols,
		excludeSimilarCharacters =
			options.excludeSimilarCharacters || passwordGeneratorOptionsDefaults.excludeSimilarCharacters,
		excludeAmbiguousCharacters =
			options.excludeAmbiguousCharacters ||
			passwordGeneratorOptionsDefaults.excludeAmbiguousCharacters,
		rng = XorShiftRng.fromSeed(Math.random() * Date.now());

	return range(0, length)
		.iter()
		.map(() => random(rng, includeSymbols, excludeSimilarCharacters, excludeAmbiguousCharacters))
		.join('');
}

const SIMILAR_CHARS = 'il1Lo0O'.split('');
const AMBIGUOUS_CHARS = '{}[]()/\\\'"`~,;:.<>'.split('');

function random(
	rng: Rng,
	includeSymbols: boolean,
	excludeSimilarCharacters: boolean,
	excludeAmbiguousCharacters: boolean
): string {
	let char = includeSymbols && rng.nextFloat() > 0.5 ? randomSymbol(rng) : randomChar(rng);

	if (excludeSimilarCharacters && SIMILAR_CHARS.includes(char)) {
		char = random(rng, includeSymbols, excludeSimilarCharacters, excludeAmbiguousCharacters);
	}
	if (excludeAmbiguousCharacters && AMBIGUOUS_CHARS.includes(char)) {
		char = random(rng, includeSymbols, excludeSimilarCharacters, excludeAmbiguousCharacters);
	}

	return char;
}

const SYMBOLS = '`~!@#$%^&*()-_+={}[]|:;<>,.\\/?'
	.split('')
	.sort(() => (Math.random() > 0.5 ? -1 : 1));
function randomSymbol(rng: Rng): string {
	return rng.fromArray(SYMBOLS).unwrap();
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	.split('')
	.sort(() => (Math.random() > 0.5 ? -1 : 1));
function randomChar(rng: Rng): string {
	return rng.fromArray(CHARS).unwrap();
}
