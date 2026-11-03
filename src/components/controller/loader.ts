import { ERROR_STATUS } from '../../types/api';

type RequestOptions = {
    [key: string]: string;
};

export type ResponseValidator<T> = (data: unknown) => data is T;

type RequestParams = {
    endpoint: string;
    options?: RequestOptions;
};

export type ResponseCallback<T> = (data: T) => void;

type HttpMethod = 'POST' | 'GET';

class Loader {
    private baseLink: string;
    private options: RequestOptions;

    constructor(baseLink: string, options: RequestOptions) {
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

    private makeUrl(options: RequestOptions, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(
        method: HttpMethod,
        endpoint: string,
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
