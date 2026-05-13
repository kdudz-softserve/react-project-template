import { apiErrorEnvelopeSchema, type ApiErrorEnvelope } from "@template/types";

export class ApiClientError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: ApiErrorEnvelope,
  ) {
    super(body.error.message);
  }
}

export type HttpClientOptions = {
  baseUrl: string;
  fetcher?: typeof fetch;
};

export class HttpClient {
  private readonly fetcher: typeof fetch;

  constructor(private readonly options: HttpClientOptions) {
    this.fetcher = options.fetcher ?? fetch;
  }

  async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const response = await this.fetcher(`${this.options.baseUrl}${path}`, {
      headers: {
        "content-type": "application/json",
        ...init.headers,
      },
      ...init,
    });

    const body: unknown = await response.json();

    if (!response.ok) {
      const errorBody = apiErrorEnvelopeSchema.parse(body);
      throw new ApiClientError(response.status, errorBody);
    }

    return body as T;
  }
}
