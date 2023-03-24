import { component$, Signal, useSignal, useStore, useStylesScoped$, useVisibleTask$ } from '@builder.io/qwik';
import { Icon } from '~/_lib-components/icon/icon';
import styles from './aside.css?inline';

let intersectionObserver: IntersectionObserver | undefined = undefined;

export const Aside = component$(() => {
    useStylesScoped$(styles);
    const store = useStore<AsideStore>({
        open: false,
        intersectionRatio: 0,
        boundingRectRight: '',
    });
    const asideRef = useSignal<HTMLElement>();
    useVisibleTask$(() => {
        const element = asideRef.value as HTMLElement;
        if (element && element.parentElement) {
            element.nextElementSibling?.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' });
            intersectionObserverInit(element, store);
        }
        return () => {
            intersectionObserver?.disconnect();
        }
    });


    return (
        <div class='side-nav-wrapper'
        data-open={store.open}
           onClick$={() => { toggleMenu(store, asideRef) }}
        style={`--intersection-ratio: ${store.intersectionRatio}; --bounding-rect-right:${store.boundingRectRight}; `}>
            <button
                type="button"
                title="Navigation Menu"
                aria-label="Navigation Menu"
                onClick$={() => { toggleMenu(store, asideRef) }}>
                <Icon aria-hidden="true">
                    <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor">
                        <path d="M3 5h18M3 12h18M3 19h18" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                </Icon>
            </button>
            <div class="side-nav no-scrollbar">
                <aside ref={asideRef} >
                    aaa
                </aside>
                <div>
                </div>
            </div>
        </div>
    );
});


const intersectionObserverInit = (element: HTMLElement, store: AsideStore) => {
    intersectionObserver = new IntersectionObserver(
        ($event) => { _intersectionCallback($event, store) },
        {
            root: element.parentElement,
            threshold: Array(1001)
                .fill(0)
                .map((x, i) => Math.round((i * 0.001 + Number.EPSILON) * 1000) / 1000),
        }
    );
    intersectionObserver.observe(element);
}

const _intersectionCallback = (entries: IntersectionObserverEntry[], store: AsideStore) => {
    entries.forEach((entry) => {
        store.open = entry.intersectionRatio === 1;
        store.intersectionRatio = Math.round((entry.intersectionRatio + Number.EPSILON) * 100) / 100;
        store.boundingRectRight = entry.boundingClientRect.right + 'px';

    });

};

const toggleMenu = (store: AsideStore, asideRef: Signal<HTMLElement | undefined>) => {
    if(store.open && asideRef.value) {
        asideRef.value.nextElementSibling?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    } else {
        asideRef.value?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

}


export interface AsideStore {
    open: boolean;
    intersectionRatio: number;
    boundingRectRight: string;
}