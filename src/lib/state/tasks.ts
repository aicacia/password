import { derived, writable } from 'svelte/store';

const tasksWritable = writable(0);

export const loading = derived(tasksWritable, (state) => state > 0);
export const tasks = derived(tasksWritable, (state) => state);

export function addTask() {
	tasksWritable.update((state) => state + 1);
}

export function endTask() {
	tasksWritable.update((state) => state - 1);
}

export function wrap<R>(promise: Promise<R>): Promise<R> {
	addTask();
	return promise.finally(endTask);
}
