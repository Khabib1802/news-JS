export interface ArticleSource {
    id: string | null;
    name: string;
}

export interface Article {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export type ArticleCardData = Pick<
    Article,
    'source' | 'author' | 'title' | 'description' | 'url' | 'urlToImage' | 'publishedAt'
>;
