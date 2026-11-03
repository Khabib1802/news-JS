import type { ArticleCardData } from '../../../types';
import './news.css';

class News {
    public draw(data: readonly ArticleCardData[]): void {
        const news = data.slice(0, 10);

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) return;

        news.forEach((item, idx) => {
            const newsClone: Node = newsItemTemp.content.cloneNode(true);

            if (newsClone instanceof DocumentFragment) {
                const newsItem = newsClone.querySelector<HTMLElement>('.news__item');
                if (newsItem) {
                    if (idx % 2) newsItem.classList.add('alt');
                }

                const newsMetaPhoto = newsClone.querySelector<HTMLElement>('.news__meta-photo');
                if (newsMetaPhoto) {
                    newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                }
                const newsAuthor = newsClone.querySelector<HTMLElement>('.news__meta-author');
                if (newsAuthor) {
                    newsAuthor.textContent = item.author || item.source.name;
                }
                const newsDate = newsClone.querySelector<HTMLElement>('.news__meta-date');
                if (newsDate) {
                    newsDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                }

                const descTitle = newsClone.querySelector<HTMLElement>('.news__description-title');
                if (descTitle) {
                    descTitle.textContent = item.title;
                }
                const descSource = newsClone.querySelector<HTMLElement>('.news__description-source');
                if (descSource) {
                    descSource.textContent = item.source.name;
                }
                const descContent = newsClone.querySelector<HTMLElement>('.news__description-content');
                if (descContent) {
                    descContent.textContent = item.description;
                }
                const readMore = newsClone.querySelector<HTMLElement>('.news__read-more a');
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
}

export default News;
