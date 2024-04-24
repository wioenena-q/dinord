export interface IApiRateLimitResponse {
	message: string;
	retry_after: number;
	global: boolean;
	code?: number;
}
