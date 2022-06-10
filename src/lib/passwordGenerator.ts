import { range } from '@aicacia/range';
import type { Rng } from '@aicacia/rand';
import { NativeRng } from '@aicacia/rand';

export const passwordGeneratorOptionsDefaults: IPasswordGeneratorOptions = {
	length: 16,
	includeSymbols: true,
	excludeSimilarCharacters: false,
	excludeAmbiguousCharacters: false
};

export interface IPasswordGeneratorOptions {
	length: number;
	includeSymbols: boolean; // @#$%
	excludeSimilarCharacters: boolean; //  i, l, 1, L, o, 0, O
	excludeAmbiguousCharacters: boolean; // { } [ ] ( ) / \ ' " ` ~ , ; : . < >
}

export function passwordGenerator(options: Partial<IPasswordGeneratorOptions> = {}) {
	const length = Math.max(6, options.length || passwordGeneratorOptionsDefaults.length),
		includeSymbols =
			options.includeSymbols != null
				? options.includeSymbols
				: passwordGeneratorOptionsDefaults.includeSymbols,
		excludeSimilarCharacters =
			options.excludeSimilarCharacters != null
				? options.excludeSimilarCharacters
				: passwordGeneratorOptionsDefaults.excludeSimilarCharacters,
		excludeAmbiguousCharacters =
			options.excludeAmbiguousCharacters != null
				? options.excludeAmbiguousCharacters
				: passwordGeneratorOptionsDefaults.excludeAmbiguousCharacters,
		rng = new NativeRng();

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
	let char = includeSymbols && rng.nextFloat() > 0.75 ? randomSymbol(rng) : randomChar(rng);

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
