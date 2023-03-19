import { wait } from '../../Utils/Utils.ts';

export class RESTClient {
  public static readonly BASE_URL = 'https://discord.com/api/v10';

  public constructor(private readonly token: string) {}

  get(endpoint: string, options: RequestInit = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(
    endpoint: string,
    data: Record<string, unknown>,
    options: RequestInit = {},
  ) {
    options.body = JSON.stringify(data);
    return this.request(endpoint, { ...options, method: 'POST' });
  }

  patch(
    endpoint: string,
    data: Record<string, unknown>,
    options: RequestInit = {},
  ) {
    options.body = JSON.stringify(data);
    return this.request(endpoint, { ...options, method: 'PATCH' });
  }

  delete(endpoint: string, options: RequestInit = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }

  public async request(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<Response> {
    options.headers = {
      'Authorization': `Bot ${this.token}`,
      ...(options.headers ?? {}),
    };

    const url = RESTClient.BASE_URL + endpoint;
    const response = await fetch(url, options);

    if (!response.ok) {
      if (response.status === 429) {
        const resetAfter = response.headers.get('X-RateLimit-Reset-After');
        const resetAfterMs = parseFloat(resetAfter ?? '0');
        await wait(resetAfterMs);
        return await this.request(endpoint, options);
      } else {
        throw new Error(
          `Request failed with status code ${response.status}.`,
        );
      }
    } else return response;
  }
}
