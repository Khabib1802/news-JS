import type { Article } from './article';
import type { Source } from './source';

type ApiStatus = 'ok' | 'error';

export interface SourcesResponse {
    status: ApiStatus;
    sources: Source[];
}

export interface ArticlesResponse {
    status: ApiStatus;
    totalResults: number;
    articles: Article[];
}

export interface ApiErrorResponse {
    status: 'error';
    code: string;
    message: string;
}

export enum ENDPOINT {
    EVERYTHING = 'everything',
    SOURCES = 'sources',
}

export enum ERROR_STATUS {
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
}
