import type { ApiQuery } from '../../types';
import { ENDPOINT, ERROR_STATUS } from '../../types/api';

type LoaderOptions = Readonly<Partial<Pick<ApiQuery, 'apiKey'>>>;

type RequestOptions = Partial<ApiQuery>;

export type ResponseValidator<T> = (data: unknown) => data is T;

type RequestParams = {
    endpoint: ENDPOINT;
    options?: RequestOptions;
};

export type ResponseCallback<T> = (data: T) => void;

type HttpMethod = 'POST' | 'GET';

class Loader {
    private readonly baseLink: string;
    private readonly options: LoaderOptions;

    constructor(baseLink: string, options: LoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T>(
        { endpoint, options = {} }: RequestParams,
        validator: ResponseValidator<T>,
        callback: ResponseCallback<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, validator, options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === ERROR_STATUS.UNAUTHORIZED || res.status === ERROR_STATUS.NOT_FOUND)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: RequestOptions, endpoint: ENDPOINT): string {
        const params = new URLSearchParams();
        const query = { ...this.options, ...options };

        Object.entries(query).forEach(([key, value]) => {
            if (value !== undefined && value !== '') {
                params.set(key, value);
            }
        });

        const queryString = params.toString();

        return `${this.baseLink}${endpoint}${queryString ? `?${queryString}` : ''}`;
    }

    private load<T>(
        method: HttpMethod,
        endpoint: ENDPOINT,
        callback: ResponseCallback<T>,
        validator: ResponseValidator<T>,
        options: RequestOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json() as Promise<unknown>)
            .then((data) => {
                if (validator(data)) {
                    callback(data);
                } else {
                    throw new Error('Invalid API response');
                }
            })
            .catch((err) => console.error(err));
    }
}

export default Loader;
