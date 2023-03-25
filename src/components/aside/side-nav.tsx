import type { Signal } from '@builder.io/qwik';
import { component$, useSignal, useStore, useStylesScoped$, useVisibleTask$ } from '@builder.io/qwik';
import styles from './side-nav.css?inline';

let intersectionObserver: IntersectionObserver | undefined = undefined;

export const SideNav = component$(() => {
    useStylesScoped$(styles);
    const store = useStore<AsideStore>({
        visible: false,
        open: false,
        closed: true,
        intersectionRatio: 0,
        boundingRectRight: '',
    });

    const asideRef = useSignal<HTMLElement>();
    useVisibleTask$(() => {
        const element = asideRef.value as HTMLElement;
        if (element && element.parentElement) {
            element.nextElementSibling?.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'center' });
            intersectionObserverInit(element, store);
            store.visible = true;
        }
        return () => {
            intersectionObserver?.disconnect();
        }
    });


    return (
        <>


            <button
                type="button"
                title="Navigation Menu"
                aria-label="Navigation Menu"
                aria-expanded={store.open ? true : false}
                onClick$={() => { toggleMenu(store, asideRef) }}
                class={store.open ? 'menu-toggle open' : 'menu-toggle'}
                id="menu-toggle"
                style={`--intersection-ratio: ${store.intersectionRatio};`}
            >
                <span class="screen-reader-text">Menu</span>
                <svg class="icon icon-menu-toggle" aria-hidden="true" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100">

                    <rect x="10" y="20" width="80" height="10"></rect>
                    <rect x="10" y="45" width="80" height="10"></rect>
                    <rect x="10" y="70" width="80" height="10"></rect>

                </svg>
            </button>


            <div class={store.open ? 'side-nav-wrapper open' : 'side-nav-wrapper'}
                onClick$={() => { toggleMenu(store, asideRef) }}
                style={`--intersection-ratio: ${store.intersectionRatio}; --bounding-rect-right:${store.boundingRectRight}; opacity:${store.visible ? '1' : '0'};  z-index:${store.closed? -100 : 4 };`}>
                <div class="side-nav no-scrollbar">
                    <aside ref={asideRef} >
                        aaa
                    </aside>
                    <div>
                    </div>
                </div>
            </div>

        </>

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
        store.closed = entry.intersectionRatio === 0;
        store.intersectionRatio = Math.round((entry.intersectionRatio + Number.EPSILON) * 100) / 100;
        store.boundingRectRight = entry.boundingClientRect.right + 'px';

    });

};

const toggleMenu = (store: AsideStore, asideRef: Signal<HTMLElement | undefined>) => {
    if (store.open && asideRef.value) {
        asideRef.value.nextElementSibling?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    } else {
        asideRef.value?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }

}


export interface AsideStore {
    visible: boolean;
    open: boolean;
    closed:boolean;
    intersectionRatio: number;
    boundingRectRight: string;
}