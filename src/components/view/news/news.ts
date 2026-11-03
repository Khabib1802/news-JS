import type { ArticleCardData } from '../../../types';
import placeholder from '../../../assets/news-placeholder.svg';
import './news.css';

const MAX_NEWS_COUNT = 10;

class News {
    public draw(data: readonly ArticleCardData[]): void {
        const news = data.slice(0, MAX_NEWS_COUNT);

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) return;

        news.forEach((item) => {
            const newsClone: Node = newsItemTemp.content.cloneNode(true);

            if (newsClone instanceof DocumentFragment) {
                this.setImage(newsClone, item.urlToImage);
                this.setText(newsClone, '.news__meta-author', item.author || item.source.name);
                this.setText(newsClone, '.news__meta-date', this.formatDate(item.publishedAt));
                this.setText(newsClone, '.news__description-title', item.title);
                this.setText(newsClone, '.news__description-source', item.source.name);
                this.setText(newsClone, '.news__description-content', item.description ?? '');

                const readMore = newsClone.querySelector<HTMLAnchorElement>('.news__read-more');
                if (readMore) {
                    readMore.setAttribute('href', item.url);
                }

                fragment.append(newsClone);
            }
        });

        const newsEl = document.querySelector<HTMLElement>('.news');
        if (newsEl) {
            newsEl.innerHTML = '';
            newsEl.appendChild(fragment);
        }
    }

    private setText(root: ParentNode, selector: string, text: string): void {
        const element = root.querySelector<HTMLElement>(selector);
        if (element) {
            element.textContent = text;
        }
    }

    private setImage(root: ParentNode, url: string | null): void {
        const image = root.querySelector<HTMLImageElement>('.news__meta-photo');
        if (!image) return;

        image.addEventListener('error', () => image.setAttribute('src', placeholder), { once: true });
        image.setAttribute('src', url || placeholder);
    }

    private formatDate(isoDate: string): string {
        return isoDate.slice(0, 10).split('-').reverse().join('-');
    }
}

export default News;
