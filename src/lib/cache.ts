type CacheEntry<T> = {
	data: T;
	timestamp: number;
};

type CacheOptions = {
	expirationTime?: number;
};

const DEFAULT_EXPIRATION_TIME = 10 * 60 * 1000;

export class Cache<T> {
	private cache: CacheEntry<T> | null = null;
	private readonly expirationTime: number;

	constructor(options: CacheOptions = {}) {
		this.expirationTime = options.expirationTime ?? DEFAULT_EXPIRATION_TIME;
	}

	get(): T | null {
		const currentTime = Date.now();

		if (this.cache && currentTime - this.cache.timestamp < this.expirationTime) {
			return this.cache.data;
		}

		return null;
	}

	set(data: T): void {
		this.cache = {
			data,
			timestamp: Date.now()
		};
	}

	clear(): void {
		this.cache = null;
	}

	hasValidData(): boolean {
		const currentTime = Date.now();

		return !!this.cache && currentTime - this.cache.timestamp < this.expirationTime;
	}
}

export function createCache<T>(options: CacheOptions = {}): Cache<T> {
	return new Cache<T>(options);
}

export async function withCache<T>(
	fetchFn: () => Promise<T>,
	options: CacheOptions = {}
): Promise<T> {
	const cache = new Cache<T>(options);

	const cachedData = cache.get();

	if (cachedData !== null) {
		return cachedData;
	}

	const freshData = await fetchFn();

	cache.set(freshData);

	return freshData;
}

const globalCacheStorage = new Map<string, Cache<any>>();

export function getCache<T>(key: string, options: CacheOptions = {}): Cache<T> {
	if (!globalCacheStorage.has(key)) {
		globalCacheStorage.set(key, new Cache<T>(options));
	}

	return globalCacheStorage.get(key) as Cache<T>;
}
