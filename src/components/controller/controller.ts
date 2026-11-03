import type { ArticlesResponse, SourcesResponse } from '../../types';
import { ENDPOINT } from '../../types/api';
import { isArticlesResponse, isSourcesResponse } from '../../utils/validators';
import AppLoader from './appLoader';
import type { ResponseCallback } from './loader';

class AppController extends AppLoader {
    public getSources(callback: ResponseCallback<SourcesResponse>): void {
        super.getResp(
            {
                endpoint: ENDPOINT.SOURCES,
            },
            isSourcesResponse,
            callback
        );
    }

    public getNews(e: MouseEvent, callback: ResponseCallback<ArticlesResponse>): void {
        let target = e.target;
        const newsContainer = e.currentTarget;

        if (!(newsContainer instanceof HTMLElement)) {
            return;
        }

        while (target instanceof Element && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    this.markActive(newsContainer, target);
                    super.getResp(
                        {
                            endpoint: ENDPOINT.EVERYTHING,
                            options: {
                                sources: sourceId,
                            },
                        },
                        isArticlesResponse,
                        callback
                    );
                }
                return;
            }
            target = target.parentNode;
        }
    }

    private markActive(container: HTMLElement, activeItem: Element): void {
        container.querySelectorAll('.source__item').forEach((item) => {
            const isActive = item === activeItem;
            item.classList.toggle('source__item--active', isActive);
            item.setAttribute('aria-pressed', String(isActive));
        });
    }
}

export default AppController;
