import type { Source } from 'node:stream/iter';
import type { Article, ArticleSource, ArticlesResponse, SourcesResponse } from '../types';

export function isSource(data: unknown): data is Source {
    return (
        data !== null &&
        typeof data === 'object' &&
        'id' in data &&
        typeof data.id === 'string' &&
        'name' in data &&
        typeof data.name === 'string' &&
        'description' in data &&
        typeof data.description === 'string' &&
        'url' in data &&
        typeof data.url === 'string' &&
        'category' in data &&
        typeof data.category === 'string' &&
        'language' in data &&
        typeof data.language === 'string' &&
        'country' in data &&
        typeof data.country === 'string'
    );
}

export function isSourcesResponse(data: unknown): data is SourcesResponse {
    return (
        data !== null &&
        typeof data === 'object' &&
        'status' in data &&
        (data.status === 'ok' || data.status === 'error') &&
        'sources' in data &&
        Array.isArray(data.sources) &&
        data.sources.every(isSource)
    );
}

function isArticleSource(data: unknown): data is ArticleSource {
    return (
        data !== null &&
        typeof data === 'object' &&
        'id' in data &&
        (typeof data.id === 'string' || data.id === null) &&
        'name' in data &&
        typeof data.name === 'string'
    );
}

export function isArticle(data: unknown): data is Article {
    return (
        data !== null &&
        typeof data === 'object' &&
        'source' in data &&
        isArticleSource(data.source) &&
        'author' in data &&
        (typeof data.author === 'string' || data.author === null) &&
        'title' in data &&
        typeof data.title === 'string' &&
        'description' in data &&
        (typeof data.description === 'string' || data.description === null) &&
        'url' in data &&
        typeof data.url === 'string' &&
        'urlToImage' in data &&
        (typeof data.urlToImage === 'string' || data.urlToImage === null) &&
        'publishedAt' in data &&
        typeof data.publishedAt === 'string' &&
        'content' in data &&
        (typeof data.content === 'string' || data.content === null)
    );
}

export function isArticlesResponse(data: unknown): data is ArticlesResponse {
    return (
        data !== null &&
        typeof data === 'object' &&
        'status' in data &&
        (data.status === 'ok' || data.status === 'error') &&
        'totalResults' in data &&
        typeof data.totalResults === 'number' &&
        'articles' in data &&
        Array.isArray(data.articles) &&
        data.articles.every(isArticle)
    );
}
