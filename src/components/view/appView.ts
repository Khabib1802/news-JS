import type { ArticlesResponse, SourcesResponse } from '../../types';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    private readonly news: News;
    private readonly sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: ArticlesResponse): void {
        const values = data.articles;
        this.news.draw(values);
    }

    public drawSources(data: SourcesResponse): void {
        const values = data.sources;
        this.sources.draw(values);
    }
}

export default AppView;
