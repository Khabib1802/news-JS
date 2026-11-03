import type { Source } from '../../../types';
import './sources.css';

class Sources {
    public draw(data: readonly Readonly<Source>[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        if (!sourceItemTemp) {
            return;
        }

        data.forEach((item) => {
            const sourceClone: Node = sourceItemTemp.content.cloneNode(true);

            if (sourceClone instanceof DocumentFragment) {
                const sourceName = sourceClone.querySelector<HTMLElement>('.source__item-name');
                if (sourceName) {
                    sourceName.textContent = item.name;
                }
                const sourceItem = sourceClone.querySelector<HTMLElement>('.source__item');
                if (sourceItem) {
                    sourceItem.setAttribute('data-source-id', item.id);
                }

                fragment.append(sourceClone);
            }
        });

        const sources = document.querySelector<HTMLDivElement>('.sources');
        if (sources) {
            sources.append(fragment);
        }
    }
}

export default Sources;
