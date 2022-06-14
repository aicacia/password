<svelte:options immutable />

<script lang="ts">
	import { passwordGenerator } from '$lib/passwordGenerator';

	export function generate() {
		return passwordGenerator({
			length,
			includeSymbols,
			excludeSimilarCharacters,
			excludeAmbiguousCharacters
		});
	}

	let length = 16;
	let includeSymbols = true;
	let excludeSimilarCharacters = false;
	let excludeAmbiguousCharacters = false;
</script>

<label for="includeSymbols">Symbols?</label>
<input
	id="includeSymbols"
	type="checkbox"
	class="as-checkbox"
	placeholder="Length"
	bind:checked={includeSymbols}
/>
<label for="excludeSimilarCharacters">Exclude Similar?</label>
<input
	id="excludeSimilarCharacters"
	type="checkbox"
	class="as-checkbox"
	placeholder="Length"
	bind:checked={excludeSimilarCharacters}
/>
<label for="excludeAmbiguousCharacters">Exclude Ambiguous?</label>
<input
	id="excludeAmbiguousCharacters"
	type="checkbox"
	class="as-checkbox"
	placeholder="Length"
	bind:checked={excludeAmbiguousCharacters}
/>
<input
	id="length"
	class="as-input"
	type="number"
	min={6}
	placeholder="Length"
	bind:value={length}
/>
